const Joi = require("joi");

const getFileSchema = Joi.object().keys({
    searchKey : Joi.string().required()
});

module.exports = { getFileSchema }