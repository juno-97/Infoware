const express = require("express");
const {
  createOrder,
  getOrders,
  getAllOrders,
} = require("../controllers/orderController");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const router = express.Router();
const { order } = require("../middleware/validation/order");
const Order = require("../models/Order");
const Product = require("../models/Product");
const pagination = require("../utils/pagination");
const admin = require("../middleware/admin");

router.post("/:productId", order, createOrder);
router.get("/", getOrders);
router.get("/allOrders", [admin], getAllOrders);

module.exports = router;
