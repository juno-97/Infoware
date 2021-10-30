const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    product: { type: String, min: 1, max: 30 },
    description: { type: String, min: 1, max: 300 },
    price: { type: Number, min: 0, max: 999999 },
    image: { type: String, min: 0, max: 999999 },
    countInStock: { type: Number, min: 0, max: 99999 },
    maxLimit: { type: Number, min: 1, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", schema);
