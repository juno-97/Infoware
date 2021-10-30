const express = require("express");
const bcrypt = require("../middleware/bcrypt");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {
  registerValidation: userValidation,
} = require("../middleware/validation/user");

router.post("/register", [userValidation, bcrypt], registerUser);

router.post("/login", [userValidation], loginUser);
module.exports = router;
