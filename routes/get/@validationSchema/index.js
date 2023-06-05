const Joi = require("joi");

// validation schema for get request,
// it must have searchkey
const getFileSchema = Joi.object().keys({
    searchKey : Joi.string().required()
});

module.exports = { getFileSchema }