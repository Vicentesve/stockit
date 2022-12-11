const { default: mongoose } = require("mongoose");
const Warehouse = require("../models/Warehouse");

/**
 * * @description Get a product by its Id
 * * @routes      GET      /getProductById/:id
 * * @access      Public
 */
module.exports.getProductById = async (req, res) => {
  try {
    const products = await Warehouse.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          "products._id": mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $addFields: {
          productId: "$products._id",
          name: "$products.name",
          price: "$products.price",
          description: "$products.description",
          category: "$products.category",
          image: "$products.image",
          warehouseId: "$_id",
        },
      },
      {
        $project: {
          warehouseId: 1,
          adminId: 1,
          productId: 1,
          name: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
        },
      },
    ]);

    res.status(200).json(products[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the products of specific search
 * * @routes      GET      /getProductsBySearch/:categoryId/:search
 * * @access      Public
 */
module.exports.getProductsBySearch = async (req, res) => {
  try {
    const { categoryId, search } = req.params;
    console.log(categoryId, search);

    let filterMatch;
    if (categoryId === "all-categories") {
      filterMatch = {
        $match: {
          name: { $regex: search, $options: "i" },
        },
      };
    } else {
      filterMatch = {
        $match: {
          category: mongoose.Types.ObjectId(categoryId),
          name: { $regex: search, $options: "i" },
        },
      };
    }
    const products = await Warehouse.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $addFields: {
          productId: "$products._id",
          name: "$products.name",
          price: "$products.price",
          description: "$products.description",
          category: "$products.category",
          image: "$products.image",
        },
      },
      {
        $project: {
          warehouseId: 1,
          adminId: 1,
          productId: 1,
          name: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
        },
      },
      filterMatch,
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the products of specific warehouse
 * * @routes      GET      /getProductsByWarehouse/:id
 * * @access      Public
 */
module.exports.getProductsByWarehouse = async (req, res) => {
  try {
    const warehouseProducts = await Warehouse.find({
      _id: mongoose.Types.ObjectId(req.params.id),
    });

    res.status(200).json(warehouseProducts[0]?.products.reverse());
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the products of all warehouses
 * * @routes      GET      /getWarehousesPreview/
 * * @access      Public
 */
module.exports.getWarehousesPreview = async (req, res) => {
  try {
    const warehouses = await Warehouse.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "adminId",
          foreignField: "_id",
          pipeline: [
            { $project: { name: 1, lastname: 1, email: 1, profilePic: 1 } },
          ],
          as: "admin",
        },
      },
      {
        $sample: { size: 4 },
      },
    ]).project({
      name: 1,
      products: {
        $slice: ["$products.image", 4],
      },
    });

    res.status(200).json(warehouses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the products of specific category
 * * @routes      GET      /getProductsByCategory/:id
 * * @access      Public
 */
module.exports.getProductsByCategory = async (req, res) => {
  try {
    const warehouses = await Warehouse.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          "products.category": mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);

    res.status(200).json(warehouses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get the warehouse of the user
 * * @routes      GET      /getMyWarehouse/:id
 * * @access      Private
 */

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
 * * @description Get the warehouse id of the user
 * * @routes      GET      /getMyWarehouseId/:id
 * * @access      Private
 */
module.exports.getMyWarehouseId = async (req, res) => {
  try {
    const warehouseId = await Warehouse.aggregate([
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
    ]).project({ _id: 1 });

    res.status(200).json(warehouseId[0]?._id);
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
