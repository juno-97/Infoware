const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("./asyncMiddleware");

module.exports = asyncMiddleware(function (req, res, next) {
  const token = req.headers["x-auth-token"];
  // if token is missing
  if (!token) throw createError.Unauthorized("auth token missing");

  // decode token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
