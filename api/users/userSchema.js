const Joi = require('@hapi/joi');

module.exports = {
  register: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(5)
      .required(),
    confirmPassword: Joi.string()
      .required(),
    profileURL: Joi.string().allow(''),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  }),
  token: Joi.object().keys({
    secretToken: Joi.string().required(),
  }),
};
