const { ref, getDownloadURL } = require('firebase/storage');
const { storage, uploadBytes } = require('../../config/firebase');

module.exports = async (req, res, next) => {
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

    return res.status(200).send({
        url : url
    });
}