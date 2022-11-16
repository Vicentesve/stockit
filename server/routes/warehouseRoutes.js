const express = require("express");
const router = express.Router();
const {
  getMyWarehouse,
  editProduct,
  addProduct,
  deleteProduct,
  getWarehousesPreview,
  getProductsByCategory,
  getProductsByWarehouse,
} = require("./../controllers/warehouseController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getWarehousesPreview", getWarehousesPreview);
router.get("/getProductsByCategory/:id", getProductsByCategory);
router.get("/getProductsByWarehouse/:id", getProductsByWarehouse);
router.get("/getMyWarehouse/:id", getMyWarehouse);
router.post("/warehouse/addProduct/:id", addProduct);
router.put("/warehouse/editProduct/:id", editProduct);
router.put("/warehouse/deleteProduct/:id", deleteProduct);

module.exports = router;
