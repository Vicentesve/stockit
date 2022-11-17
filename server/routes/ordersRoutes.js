const express = require("express");
const router = express.Router();
const { setOrder } = require("../controllers/ordersControllers");
const { requireAuth } = require("../middleware/authMiddleware");

router.put("/setOrder", setOrder);

module.exports = router;
