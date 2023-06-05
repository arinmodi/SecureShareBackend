const router = require("express").Router({ mergeParams : true });
const validator = require("../../middlewares/validation");
const { deleteFileSchma } = require("./@validationSchema");
const deleteFile = require("./deleteFile");


router.post("/file", validator(deleteFileSchma), deleteFile);

module.exports = router;