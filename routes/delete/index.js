const router = require("express").Router({ mergeParams : true });
const validator = require("../../middlewares/validation");
const { deleteFileSchma } = require("./@validationSchema");
const deleteExpired = require("./deleteExpired");
const deleteFile = require("./deleteFile");

/* 
    post request for delete a file from firebase stoarge and 
    firestore using searchKey(doc id of firestore collection)
*/
router.post("/file", validator(deleteFileSchma), deleteFile);

/* 
    post request for delete a file from firebase stoarge and 
    firestore using searchKey(doc id of firestore collection)
    which has expiry field value as today's data
*/
router.post("/expired", deleteExpired)

module.exports = router;