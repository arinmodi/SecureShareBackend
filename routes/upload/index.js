const router = require("express").Router({ mergeParams : true });
const multer = require('multer');
const uploadImage = require("./uploadImage");
const validator = require("../../middlewares/validation");
const { uploadFileDataSchmea } = require("./@validationSchema");
const addData = require("./addData");

router.post("/file", multer().single("file"), uploadImage);
router.post("/data", validator(uploadFileDataSchmea), addData);

module.exports = router;