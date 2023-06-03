const Joi = require("joi");

const uploadFileDataSchmea = Joi.object().keys({
    expiry : Joi.string().required()
});

module.exports = { uploadFileDataSchmea }