const asyncMiddleware = require("../middleware/asyncMiddleware");
const Product = require("../models/Product");
const pagination = require("../utils/pagination");

module.exports = {
  createProduct: asyncMiddleware(async function (req, res, next) {
    let product = await new Product(req.body).save();
    res.status(201).send(product);
  }),

  getProducts: asyncMiddleware(async function (req, res, next) {
    const page = req.query.page || 0;
    const limit = parseInt(req.query.limit) || 10;

    const totalProductCount = await Product.countDocuments();
    const results = pagination(page, limit, totalProductCount);

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(results.skip)
      .limit(limit);

    results.products = products;

    res.send(results);
  }),
};
