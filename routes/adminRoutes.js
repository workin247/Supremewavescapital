const express = require("express");
const { authenticateJWT } = require("../middlewares/authenticator");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", authenticateJWT, adminController.getUser);

// Admin deposit Routes
router.get("/deposits", authenticateJWT, adminController.getDeposits);
router.get("/deposit/:userId", authenticateJWT, adminController.getDeposit);
router.put("/deposit/edit/:userId", authenticateJWT, adminController.update);
router.delete("/deposit/:userId", authenticateJWT, adminController.deleteDeposit);

// Admin User Routes
router.get("/withdrawls", authenticateJWT, adminController.getWithdrawals);
router.get("/withdraw/:userId", authenticateJWT, adminController.getWithdraw);
router.put("/withdraw/edit/:userId", authenticateJWT, adminController.updateWithdraw);
router.delete("/withdraw/:userId", authenticateJWT, adminController.deleteWithdraw);

// Admin User Routes
router.get("/:userId", adminController.getuser);
router.put("/user/edit/:userId", authenticateJWT, adminController.put);
router.delete("/user/:userId", authenticateJWT, adminController.delete);

module.exports = router