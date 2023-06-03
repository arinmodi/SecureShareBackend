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
    const docRef = db.collection('files');
    const newDoc = docRef.doc();

    const deletionKey = generateRandomString(10);

    const data = {
        url : req.body.url,
        expiry : req.body.expiry,
        deletionKey : deletionKey
    };

    await newDoc.set(data).then((result) => {
        return res.status(200).send({
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