const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const bcrypt = require("bcrypt");

const registerUser = asyncMiddleware(async function (req, res) {
  // check if email already exits in database
  let user = await User.exists({ email: req.body.email });
  if (user) throw createError.BadRequest("Email already exits in the database");

  // create new user and save it to database
  user = await new User(req.body).save();
  res.status(201).send({ email: user.email });
});

const loginUser = asyncMiddleware(async function (req, res, next) {
  // check if user exists in database
  let user = await User.findOne({ email: req.body.email });

  if (!user) throw createError.NotFound("User do not exist");

  // if exists ? compare password
  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) throw createError.Unauthorized("wrong Email/Password");

  // gen auth token
  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send({ email: user.email });
});

module.exports = { registerUser, loginUser };
