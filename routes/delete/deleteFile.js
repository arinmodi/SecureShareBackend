const admin = require("firebase-admin")
const { ref, deleteObject } = require('firebase/storage');
const { storage } = require('../../config/firebase');

/*
    Controller For Delete File : Delete File data from firestore and then
    using download url delete it from storage

    Step 1 : Firestore deletion
    Step 2 : Save the download url
    Step 3 : Storage Deletion
*/
module.exports = async (req, res, next) => {

    const db = admin.firestore()

    // searchKey : id of the doc in collection to be deleted
    const docRef = db.collection('files').doc(req.body.searchKey);

    try {
        const doc = await docRef.get();
        // check doc exists
        if (doc.exists) {
            // delete the doc
            await docRef.delete();

            // save path of the storage file to be deleted
            const url = doc.data().path;

            // stoarge ref
            const dref = ref(storage, url);

            // delete from stoarge
            await deleteObject(dref)

            // success
            return res.status(200).send({
                msg : "Success"
            });
        } else {
            // doc not exists
            return res.status(200).send({
                msg : "Not Exists"
            });
        }
    }catch(e) {
        // something unexpected
        console.log(e);
        return res.status(400).send({
            msg : "Server Error"
        });
    }
}
