const createError = require("http-errors");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const mongoose = require("mongoose");
const { nanoid, customAlphabet } = require("nanoid");
const Order = require("../models/Order");
const Product = require("../models/Product");
const pagination = require("../utils/pagination");

module.exports = {
  createOrder: asyncMiddleware(async function (req, res, next) {
    const productId = req.params.productId;
    const productCount = req.body.count || 1;

    // check if product exists
    const product = await Product.findById(productId);
    if (!product) throw createError.NotFound("product not found");

    // check if product count in limits
    if (productCount > product.maxLimit || productCount > product.countInStock)
      throw createError.BadRequest("Limit exceeded");

    // create a order and save it to database
    const order = await new Order({
      orderId: nanoid(10),
      product: productId,
      totalPrice: productCount * product.price,
      count: productCount,
      orderedBy: req.user._id,
    }).save();
    res.send(order);
  }),

  getOrders: asyncMiddleware(async (req, res, next) => {
    const page = req.query.page || 0;
    const limit = parseInt(req.query.limit) || 10;

    const totalProductCount = await Order.countDocuments({
      orderedBy: req.user._id,
    });
    const results = pagination(page, limit, totalProductCount);

    const orders = await Order.find({
      orderedBy: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(results.skip)
      .limit(limit);

    results.products = orders;

    res.send(results);
  }),

  getAllOrders: asyncMiddleware(async (req, res, next) => {
    const page = req.query.page || 0;
    const limit = parseInt(req.query.limit) || 10;

    const totalProductCount = await Order.countDocuments({
      orderedBy: req.user._id,
    });
    const results = pagination(page, limit, totalProductCount);

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(results.skip)
      .limit(limit);

    results.products = orders;

    res.send(results);
  }),
};
