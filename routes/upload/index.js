const router = require("express").Router({ mergeParams : true });
const multer = require('multer');
const upload = require("./uploadFile");

router.post("/file", multer().single("file"), upload);

module.exports = router;