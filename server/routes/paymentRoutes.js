const express = require("express");
const router = express.Router();
const {
  setPayment,
  getMyPayments,
  editPayment,
} = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getMyPayments/:id", getMyPayments);
router.post("/setPayment", setPayment);
router.put("/editPayment/:id", editPayment);

module.exports = router;
