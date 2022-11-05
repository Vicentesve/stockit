const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/categoriesController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getCategories", getCategories);

module.exports = router;
