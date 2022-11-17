const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const orderSchema = new mongoose.Schema(
  {
    customerId: mongoose.Types.ObjectId,
    products: Array,
    fromWarehouseId: Array,
    total: mongoose.Types.Decimal128,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
