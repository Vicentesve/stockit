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
  getMyWarehouseId,
  getProductsBySearch,
  getProductById,
  getMyOrders,
  putOrderStatus,
} = require("./../controllers/warehouseController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/getProductById/:id", getProductById);
router.get("/getWarehousesPreview", getWarehousesPreview);
router.get("/getProductsByCategory/:id", getProductsByCategory);
router.get("/getProductsByWarehouse/:id", getProductsByWarehouse);
router.get("/getMyWarehouseId/:id", getMyWarehouseId);
router.get("/getMyWarehouse/:id", getMyWarehouse);
router.get("/getProductsBySearch/:categoryId/:search", getProductsBySearch);
router.post("/warehouse/addProduct/:id", addProduct);
router.put("/warehouse/editProduct/:id", editProduct);
router.put("/warehouse/deleteProduct/:id", deleteProduct);
router.get("/warehouse/getMyOrders/:id", getMyOrders);
router.put("/warehouse/putOrderStatus/:id", putOrderStatus);

module.exports = router;
