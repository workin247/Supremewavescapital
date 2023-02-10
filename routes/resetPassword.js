const express = require("express");
const resetPassword = require("../controllers/resetPassword");

const router = express.Router();

router.post("/forgot", resetPassword.read);
router.get("/reset-password/:id/:token", resetPassword.get);
router.post("/reset-password/:id/:token", resetPassword.create);

module.exports = router;
