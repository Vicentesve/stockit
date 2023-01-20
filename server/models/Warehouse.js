const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: {
    type: mongoose.Types.Decimal128,
    get: getCosts,
  },
  category: mongoose.ObjectId,
  image: String,
  id: false,
});

const warehouseSchema = new mongoose.Schema(
  {
    adminId: mongoose.ObjectId,
    name: String,
    products: [productsSchema],
    id: false,
  },
  { timestamps: true }
);

function getCosts(value) {
  console.log("value:", value);
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

const Warehouse = mongoose.model("warehouses", warehouseSchema);
module.exports = Warehouse;
