const Joi = require("joi");
const asyncMiddleware = require("../asyncMiddleware");
const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(30).required(),
  role: Joi.string().valid("user", "admin"),
});

const registerValidation = asyncMiddleware(async (req, res, next) => {
  await register.validateAsync(req.body);
  next();
});

module.exports = { registerValidation };
