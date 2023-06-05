const { db } = require("../../config/firebase")
const { ref, deleteObject } = require('firebase/storage');
const { storage } = require('../../config/firebase');

module.exports = async (req, res, next) => {
    const docRef = db.collection('files').doc(req.body.searchKey);
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            await docRef.delete();
            const url = doc.data().path;
            const dref = ref(storage, url);
            await deleteObject(dref)
            return res.status(200).send({
                msg : "Success"
            });
        } else {
            return res.status(200).send({
                msg : "Not Exists"
            });
        }
    }catch(e) {
        console.log(e);
        return res.status(400).send({
            msg : "Server Error"
        });
    }
}
