const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    adminId: mongoose.ObjectId,
    name: String,
    products: {
      type: [
        {
          name: String,
          description: String,
          price: mongoose.Types.Decimal128,
          category: mongoose.ObjectId,
          image: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("warehouses", warehouseSchema);
module.exports = Warehouse;
