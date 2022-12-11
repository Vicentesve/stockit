const express = require("express");
const router = express.Router();
const {
  getClientsStatistic,
  getProductsStatistic,
} = require("../controllers/statisticController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get(
  "/getClientsStatistic/:id/:type/:firstDate/:finalDate",
  getClientsStatistic
);
router.get(
  "/getProductsStatistic/:id/:type/:firstDate/:finalDate",
  getProductsStatistic
);

module.exports = router;
