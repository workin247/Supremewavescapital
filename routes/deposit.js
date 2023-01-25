const express = require("express");
const depositController = require("../controllers/deposit");
const { authenticateJWT } = require("../middlewares/authenticator");

const router = express.Router();

router.post("/", authenticateJWT, depositController.create);
router.get("/", authenticateJWT, depositController.get);

module.exports = router;
