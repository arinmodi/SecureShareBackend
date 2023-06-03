const router = require("express").Router({ mergeParams : true });

// upload image
const upload = require("./upload")

router.use("/upload", upload)

module.exports = router