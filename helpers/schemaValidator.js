const Joi = require('@hapi/joi');

module.exports = reqSchema => (req, res, next) => {
  Joi.validate(req.body, reqSchema, { abortEarly: false }, (err) => {
    if (err) {
      return res.status(422).json({
        error: err.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    }
    next();
  });
};
