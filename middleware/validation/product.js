const Joi = require("joi");
const asyncMiddleware = require("../asyncMiddleware");

const schema = Joi.object({
  product: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(3).max(300),
  price: Joi.number().required().min(0).max(999999),
  image: Joi.string().required().min(1).max(999999),
  countInStock: Joi.number().required().min(0).max(999999),
});

module.exports = {
  product: asyncMiddleware(async function (req, res, next) {
    const result = await schema.validateAsync(req.body);
    next();
  }),
};
