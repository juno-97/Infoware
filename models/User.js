const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, min: 3, max: 30, required: true },
  password: { type: String, min: 3, max: 30, required: true },
  role: { type: String, default: "user" },
});

schema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model("user", schema);
