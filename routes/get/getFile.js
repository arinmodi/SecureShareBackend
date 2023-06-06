const admin = require("firebase-admin")

/*
    Controller Get File Related Data from firestore
*/
module.exports = async (req, res, next) => {

    const db = admin.firestore()
    
    // searchKey : Doc id in firestore collection

    const docRef = db.collection('files').doc(req.query.searchKey);
    try {
        const doc = await docRef.get();
        // check exists or not
        if (doc.exists) {
            // get the data and return
            return res.status(200).send(doc.data());
        } else {
            // file not even exists
            // this should never happen
            return res.status(400).send({
                msg : "Not Exists"
            });
        }
    }catch(e) {
        // server error
        console.log(e);
        return res.status(400).send({
            msg : "Server Error"
        });
    }
}
