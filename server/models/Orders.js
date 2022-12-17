const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const orderSchema = new mongoose.Schema(
  {
    customerId: mongoose.Types.ObjectId,
    products: Array,
    total: mongoose.Types.Decimal128,
    status: {
      type: Number,
      default: 0,
    },
    deliveredOn: Date,
    payment: {
      number: String,
      name: String,
      facturarion: String,
      expiry: String,
    },
    address: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
