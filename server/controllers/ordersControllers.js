const { default: mongoose } = require("mongoose");
const Order = require("../models/Orders");
const Warehouse = require("../models/Warehouse");

/**
 * * @description Set a order of purchase
 * * @routes      PUT      /setOrder
 * * @access      Private
 */
module.exports.setOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the orders of specific user
 * * @routes      GET      /getMyOrders/:id/:startDate/:finalDate
 * * @access      Private
 */
module.exports.getMyOrders = async (req, res) => {
  try {
    const { startDate, finalDate } = req.params;

    const date1 = new Date(startDate);
    const date2 = new Date(finalDate);

    const orders = await Order.aggregate([
      {
        $match: {
          customerId: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          _id: 1,
          customerId: 1,
          products: 1,
          total: 1,
          createdAt: 1,
        },
      },
      {
        $match: {
          createdAt: {
            $gte: date1,
            $lte: date2,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all the orders of specific warehouse
 * * @routes      GET      /getOrders/:id/:year/:month
 * * @access      Private
 */
module.exports.getOrders = async (req, res) => {
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

    const orders = await Order.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          "products.fromWarehouseId": warehouseId[0]?._id.toString(),
        },
      },
      {
        $project: {
          _id: 1,
          customerId: 1,
          products: 1,
          total: 1,
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $match: {
          year: parseInt(req.params.year),
          month: parseInt(req.params.month),
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
