const createError = require("http-errors");

module.exports = function (req, res, next) {
  if (req.user.role == "admin") return next();
  next(createError.Forbidden("You do not have access here"));
};
