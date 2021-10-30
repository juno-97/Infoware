const asyncMiddleware = require("./asyncMiddleware");
const bcrypt = require("bcrypt");

module.exports = asyncMiddleware(async function (req, res, next) {
  const password = req.body.password;
  req.body.password = await bcrypt.hash(password, 10);
  next();
});
