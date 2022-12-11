const express = require("express");
const router = express.Router();
const {
  setAddress,
  getMyAddresses,
} = require("../controllers/addressController");
const { requireAuth } = require("../middleware/authMiddleware");

router.put("/setAddress", setAddress);
router.get("/getMyAddresses/:id", getMyAddresses);

module.exports = router;
