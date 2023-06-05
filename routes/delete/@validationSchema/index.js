const Joi = require("joi");

const deleteFileSchma = Joi.object().keys({
    searchKey : Joi.string().min(20).max(20).required()
});

module.exports = { deleteFileSchma }