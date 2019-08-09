const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(5)
    .required(),
  profileURL: Joi.string().allow(''),
});
