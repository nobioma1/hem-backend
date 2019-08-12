const Joi = require('@hapi/joi');

module.exports = {
  workspaceBody: Joi.object().keys({
    title: Joi.string().required(),
    name: Joi.string()
      .regex(/^[a-z0-9]{3,30}$/)
      .required(),
  }),
};
