const { ref, getDownloadURL } = require('firebase/storage');
const { storage, uploadBytes } = require('../../config/firebase');
const { db } = require("../../config/firebase")

module.exports = async (req, res, next) => {

    if (req.body.expiry === undefined || req.body.expiry.length === 0) {
        return res.status(400).send({
            message : "Expiry is required"
        });
    }

    if (req.body.iv === undefined || req.body.iv.length === 0) {
        return res.status(400).send({
            message : "iv is required"
        });
    }

    if (req.body.orgName === undefined || req.body.orgName.length == 0) {
        return res.status(400).send({
            message : "orgName is required"
        });
    }

    let url = "";
    let path = "";

    const file = req.file;
    const timeStamp = Date.now();
    const nt = file.originalname.split(".");
    const name = nt[0];
    const type = nt[1];

    const filename = name + "_" + timeStamp + "." + type;
    const imageRef = ref(storage, "files/" + filename);
    const metaData = {
        contentType : file.mimetype
    }

    try{
        const snapshot = await uploadBytes(imageRef, file.buffer, metaData);
        url = await getDownloadURL(snapshot.ref);
        path = snapshot.ref.fullPath
    }catch(e){
        return res.status(400).send({
            error : e
        })
    };

    const docRef = db.collection('files');
    const newDoc = docRef.doc();

    const data = {
        url : decodeURI(url),
        expiry : req.body.expiry,
        path : path,
        name : filename,
        iv : req.body.iv
    };

    await newDoc.set(data).then((result) => {
        return res.status(200).send({
            searchKey : newDoc.id,
            expiry : req.body.expiry
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).send({
            message : "DB Error"
        });
    });
}