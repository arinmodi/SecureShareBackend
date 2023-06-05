const router = require("express").Router({ mergeParams : true });
const multer = require('multer');
const upload = require("./uploadFile");

// post request uploading file with other related data
router.post("/file", multer().single("file"), upload);

module.exports = router;