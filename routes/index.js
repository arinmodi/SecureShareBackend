const router = require("express").Router({ mergeParams : true });

// upload file
const upload = require("./upload")

// delete file
const _delete = require("./delete");

const _get = require("./get")

router.use("/upload", upload)
router.use("/delete", _delete)
router.use("/get", _get)

module.exports = router