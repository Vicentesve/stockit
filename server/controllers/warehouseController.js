const { default: mongoose } = require("mongoose");
const Warehouse = require("../models/Warehouse");

/**
 * * @description Get the warehouse of the user
 * * @routes      GET      /getMyWarehouse/:id
 * * @access      Private
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
module.exports.getMyWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "adminId",
          foreignField: "_id",
          as: "admin",
        },
      },
      {
        $match: { adminId: mongoose.Types.ObjectId(req.params.id) },
      },
    ]);

    const responseSize = Buffer.byteLength(JSON.stringify(warehouse), "utf-8");
    console.log("FINAL Response", responseSize, formatBytes(responseSize));

    /* warehouse[0]?.products?.map((product) => {
      product.price = parseFloat(product.price);
    }); */

    warehouse[0]?.products?.reverse();

    res.status(200).json({
      _id: warehouse[0]?._id,
      name: warehouse[0]?.name,
      products: warehouse[0]?.products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Add a product from user´s warehouse
 * * @routes      POST      /warehouse/addProduct
 * * @access      Private
 */
module.exports.addProduct = async (req, res) => {
  try {
    await Warehouse.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params),
      { $push: { products: req.body } },
      { safe: true, upsert: true }
    );

    const warehouse = await Warehouse.findById(
      mongoose.Types.ObjectId(req.params)
    );
    const size = warehouse.products.length;
    const product = warehouse.products[size - 1];

    res.status(200).json({
      _id: product._id,
      image: product.image,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Edit a product from user´s warehouse
 * * @routes      PUT      /warehouse/editProduct/:id
 * * @access      Private
 */
module.exports.editProduct = async (req, res) => {
  try {
    await Warehouse.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.params),
        "products._id": mongoose.Types.ObjectId(req.body._id),
      },
      {
        $set: {
          "products.$.image": req.body.image,
          "products.$.name": req.body.name,
          "products.$.description": req.body.description,
          "products.$.category": req.body.category,
          "products.$.price": req.body.price,
        },
      }
    );

    res.status(200).json({
      _id: req.body._id,
      image: req.body.image,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: { $numberDecimal: req.body.price },
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};
/**
 * * @description Delete a product from user´s warehouse
 * * @routes      DELETE      /warehouse/deleteProduct/:id
 * * @access      Private
 */
module.exports.deleteProduct = async (req, res) => {
  try {
    await Warehouse.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params),
      },
      {
        $pull: {
          products: { _id: mongoose.Types.ObjectId(req.body._id) },
        },
      },
      { safe: true, multi: true }
    );

    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).send({ error });
  }
};
