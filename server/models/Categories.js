const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    name: String,
    image: String,
  },
  { timestamps: true }
);

const Categorie = mongoose.model("categories", categorieSchema);
module.exports = Categorie;
