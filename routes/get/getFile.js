const { db } = require("../../config/firebase")

module.exports = async (req, res, next) => {
    const docRef = db.collection('files').doc(req.query.searchKey);
    try {
        const doc = await docRef.get();
        if (doc.exists) {
            return res.status(200).send(doc.data());
        } else {
            return res.status(400).send({
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
