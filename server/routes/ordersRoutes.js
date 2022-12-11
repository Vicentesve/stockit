const express = require("express");
const router = express.Router();
const {
  setOrder,
  getOrders,
  getMyOrders,
} = require("../controllers/ordersControllers");
const { requireAuth } = require("../middleware/authMiddleware");

router.put("/setOrder", setOrder);
router.get("/getOrders/:id/:year/:month", getOrders);
router.get("/getMyOrders/:id/:startDate/:finalDate", getMyOrders);

module.exports = router;
