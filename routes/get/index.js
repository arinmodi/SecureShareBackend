const router = require("express").Router({ mergeParams : true });
const validator = require("../../middlewares/validation");
const { getFileSchema } = require("./@validationSchema");
const getFile = require("./getFile");

// get request to get file from firestore using searchKey(doc id of firestore collection)
router.get("/file", validator(getFileSchema, "query"), getFile);

module.exports = router;