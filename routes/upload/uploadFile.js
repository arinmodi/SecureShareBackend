const { ref, getDownloadURL } = require('firebase/storage');
const { storage, uploadBytes } = require('../../config/firebase');
const admin = require("firebase-admin")

/*
    Contoller for file upload,

    Step 1 : Save File to Storage and Get The Doewnload URL
    Step 2 : Save the data to firestore
*/
module.exports = async (req, res, next) => {

    const db = admin.firestore()

    // check if there is expiry or not in the body
    if (req.body.expiry === undefined || req.body.expiry.length === 0) {
        return res.status(400).send({
            message : "Expiry is required"
        });
    }

    // check if there is iv or not in thr body
    if (req.body.iv === undefined || req.body.iv.length === 0) {
        return res.status(400).send({
            message : "iv is required"
        });
    }

    let url = "";
    let path = "";

    const file = req.file;
    const timeStamp = Date.now();
    const nt = file.originalname.split(".");

    // filename and type identifing
    var name = nt[0];
    for (let i=1; i < nt.length-1; i++) {
        name += ("." + nt[i])
    }
    const type = nt[nt.length-1];

    const filename = name + "_" + timeStamp + "." + type;

    // Step 1 : Upload file to firebase storage

    // firebase bucket ref
    const imageRef = ref(storage, "files/" + filename);
    const metaData = {
        contentType : file.mimetype
    }

    try{
        // upload to firebase
        const snapshot = await uploadBytes(imageRef, file.buffer, metaData);

        // get downloadurl from snapshot
        url = await getDownloadURL(snapshot.ref);

        // get the filePath
        path = snapshot.ref.fullPath
    }catch(e){
        return res.status(400).send({
            error : e
        })
    };

    // Step 2 : Save data to firestore

    // firestore collection ref
    const docRef = db.collection('files');

    // add new doc
    const newDoc = docRef.doc();

    const data = {
        url : decodeURI(url),
        expiry : req.body.expiry,
        path : path,
        name : filename,
        iv : req.body.iv
    };

    await newDoc.set(data).then((result) => {
        // doc added
        return res.status(200).send({
            searchKey : newDoc.id,
            expiry : req.body.expiry
        })
    }).catch(err => {
        // error adding doc
        console.log(err);
        return res.status(400).send({
            message : "DB Error"
        });
    });
}