const Joi = require("joi");

const uploadFileDataSchmea = Joi.object().keys({
    url : Joi.string().required(),
    expiry : Joi.string().required()
});

module.exports = { uploadFileDataSchmea }