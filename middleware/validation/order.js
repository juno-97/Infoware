const Joi = require("joi");
const mongoose = require("mongoose");

const schema = Joi.string()
  .required()
  .custom((value, helper) => {
    const isValidMongooseId = mongoose.isValidObjectId(value);
    if (!isValidMongooseId) return helper.message("Not a valid product Id");
    return true;
  });

module.exports = {
  order: async function (req, res, next) {
    const result = await schema.validate(req.params.productId);
    if (result.error) return next(result.error);
    next();
  },
};
