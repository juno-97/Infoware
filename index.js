const express = require("express");
const helmet = require("helmet");
const asyncMiddleware = require("./middleware/asyncMiddleware");
const app = express();
const createError = require("http-errors");
const bcrypt = require("./middleware/bcrypt");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

// connect to db
require("./startup/db");

// middleware
app.use(express.json());
app.use(helmet());

// routes
app.use("/api", users);
app.use("/api/products", [auth, admin], products);
app.use("/api/orders", [auth], orders);

// const err = new Error("unauthorized");
// err.status = 401;
// console.log(createError.BadRequest());

// error handler
app.use((err, req, res, next) => {
  if (err.isJoi) err.status = 400;
  const statusCode = err.status || 500;
  if (err)
    res.status(statusCode).send({ status: statusCode, err: err.message });
});

// http listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
