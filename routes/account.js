const express = require("express");
const { authenticateJWT } = require("../middlewares/authenticator");
const accountController = require("../controllers/account");

const router = express.Router();

router.get("/", authenticateJWT, accountController.get);

module.exports = router