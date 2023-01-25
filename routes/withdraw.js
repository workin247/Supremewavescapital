const express = require("express");
const withdrawController = require("../controllers/withdraw");
const { authenticateJWT } = require("../middlewares/authenticator");

const router = express.Router();

router.post("/", authenticateJWT, withdrawController.create);
router.get("/", authenticateJWT, withdrawController.get);

module.exports = router;
