const Joi = require("joi");

// validation schema for get request,
// it must have searchkey
const deleteFileSchma = Joi.object().keys({
    searchKey : Joi.string().min(20).max(20).required()
});

module.exports = { deleteFileSchma }