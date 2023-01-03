const Joi = require("joi");
const validateRequest = require("../middlewares/authorize");

exports.registerSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    // acceptTerms: Joi.boolean().valid(true).required(),
  });
  validateRequest(req, res, next, schema);
};
