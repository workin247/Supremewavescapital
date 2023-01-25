const User = require("../models/user");
const express = require("express");
const { signupController, signinController, email,  } = require("../controllers/auth");
const {
  validatorResult,
  signupValidator,
  signinValidator,
} = require("../middlewares/validator");
const Token = require("../models/token");

const router = express.Router();

router.post("/signup", signupValidator, validatorResult, signupController);
router.post("/signin", signinValidator, validatorResult, signinController);
router.get("/:id/verify/:token", email);
module.exports = router;
