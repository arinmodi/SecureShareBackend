const { ref, getDownloadURL } = require('firebase/storage');
const { storage, uploadBytes } = require('../../config/firebase');
const { db } = require("../../config/firebase")
const crypto = require('crypto');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = async (req, res, next) => {

    if (req.body.expiry === undefined || req.body.expiry.length === 0) {
        return res.status(400).send({
            message : "Expiry is required"
        });
    }

    let url = "";

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
    }catch(e){
        return res.status(400).send({
            error : e
        })
    };

    const docRef = db.collection('files');
    const newDoc = docRef.doc();

    const deletionKey = generateRandomString(10);

    const data = {
        url : url,
        expiry : req.body.expiry,
        deletionKey : deletionKey
    };

    await newDoc.set(data).then((result) => {
        return res.status(200).send({
            url : url,
            searchKey : newDoc.id,
            deletionKey : deletionKey
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).send({
            message : "DB Error"
        });
    });
}