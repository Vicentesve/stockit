const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema(
  {
    customerId: mongoose.Types.ObjectId,
    country: String,
    name: String,
    streetNumber: String,
    state: String,
    city: String,
    suburb: String,
    postalCode: String,
    phoneNumber: String,
    extraInfo: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("addresses", addressSchema);
module.exports = Order;
