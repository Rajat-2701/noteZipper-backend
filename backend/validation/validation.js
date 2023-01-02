const Joi = require("joi");
const registerValidation = Joi.array().items(
  Joi.object({
    name: Joi.string().min(2).max(10).required(),
    email: Joi.string().email().min(5).max(50),
    password: Joi.string().min(4).required(),
  })
);

module.exports = { registerValidation };
