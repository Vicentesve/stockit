const express = require("express");
const router = express.Router();
const { login, signup, updateMe } = require("./../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
router.put("/updateMe/:id", updateMe);

module.exports = router;
