const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    orderId: { type: String },
    product: { type: mongoose.Types.ObjectId, ref: "product" },
    totalPrice: { type: Number, min: 0, max: 999999 },
    count: { type: Number, min: 1, max: 10 },
    orderedBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", schema);
