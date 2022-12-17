const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const paymentSchema = new mongoose.Schema(
  {
    customerId: mongoose.Types.ObjectId,
    number: String,
    number: {
      type: String,
      unique: true,
    },
    name: String,
    expiry: String,
    state: String,
    cvc: String,
    issuer: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;
