const express = require("express");
const router = express.Router();
const {
  getMyWarehouse,
  editProduct,
  addProduct,
  deleteProduct,
} = require("./../controllers/warehouseController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getMyWarehouse/:id", getMyWarehouse);
router.post("/warehouse/addProduct/:id", addProduct);
router.put("/warehouse/editProduct/:id", editProduct);
router.put("/warehouse/deleteProduct/:id", deleteProduct);

module.exports = router;
