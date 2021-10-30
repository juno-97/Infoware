const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");
const { product } = require("../middleware/validation/product");

router.post("/", product, createProduct);
router.get("/", getProducts);

module.exports = router;
