const express = require("express");
const router = express.Router();
const {
  setAddress,
  getMyAddresses,
  editAddress,
} = require("../controllers/addressController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getMyAddresses/:id", getMyAddresses);
router.post("/setAddress", setAddress);
router.put("/editAddress/:id", editAddress);

module.exports = router;
