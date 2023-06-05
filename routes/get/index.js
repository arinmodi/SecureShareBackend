const router = require("express").Router({ mergeParams : true });
const validator = require("../../middlewares/validation");
const { getFileSchema } = require("./@validationSchema");
const getFile = require("./getFile");


router.get("/file", validator(getFileSchema, "query"), getFile);

module.exports = router;