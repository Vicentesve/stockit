const { default: mongoose } = require("mongoose");
const Order = require("../models/Orders");
const Warehouse = require("../models/Warehouse");

/**
 * * @description Get the increase or decrease of clients by date
 * * @routes      PUT      /getClientsStatistic
 * * @access      Private
 */
module.exports.getClientsStatistic = async (req, res) => {
  try {
    const { firstDate, finalDate, type } = req.params;

    const startOfDay = new Date(firstDate);
    const endOfDay = new Date(finalDate);

    const firstDateCompare = new Date(startOfDay);
    const finalDateCompare = new Date(endOfDay);

    let newDateFirst;
    let newDateFinal;

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

    let filterGroup, sort;
    switch (type) {
      case "1":
        newDateFirst = new Date(
          firstDateCompare.setFullYear(firstDateCompare.getFullYear() - 1)
        );
        newDateFinal = new Date(
          finalDateCompare.setFullYear(finalDateCompare.getFullYear() - 1)
        );

        filterGroup = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              customerId: "$customerId",
            },
            count: { $sum: 1 },
          },
        };
        sort = {
          $sort: {
            "_id.month": 1,
          },
        };

        break;
      case "2":
        newDateFirst = new Date(
          firstDateCompare.setMonth(firstDateCompare.getMonth() - 1)
        );
        newDateFinal = new Date(
          finalDateCompare.setMonth(finalDateCompare.getMonth() - 1)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              customerId: "$customerId",
            },
            count: { $sum: 1 },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };
        break;
      case "3":
        newDateFirst = new Date(
          firstDateCompare.setDate(firstDateCompare.getDate() - 8)
        );
        newDateFinal = new Date(
          finalDateCompare.setDate(finalDateCompare.getDate() - 8)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              customerId: "$customerId",
            },
            count: { $sum: 1 },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };
        break;
      case "4":
        newDateFirst = new Date(
          firstDateCompare.setDate(firstDateCompare.getDate() - 8)
        );
        newDateFinal = new Date(
          finalDateCompare.setDate(finalDateCompare.getDate() - 8)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              fullDate: { $toDate: "$createdAt" },
              customerId: "$customerId",
            },
            count: { $sum: 1 },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };

        break;

      default:
        break;
    }

    const staticticToCompare = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: newDateFirst,
            $lte: newDateFinal,
          },
        },
      },
      {
        $match: {
          "products.fromWarehouseId": warehouseId[0]?._id.toString(),
        },
      },
      filterGroup,
      sort,
    ]);

    const statictic = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $match: {
          "products.fromWarehouseId": warehouseId[0]?._id.toString(),
        },
      },
      filterGroup,
      sort,
    ]);

    res.status(200).json([statictic, staticticToCompare]);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get the increase or decrease of products by date
 * * @routes      PUT      /getProductsStatistic
 * * @access      Private
 */
module.exports.getProductsStatistic = async (req, res) => {
  try {
    const { firstDate, finalDate, type } = req.params;

    const startOfDay = new Date(firstDate);
    const endOfDay = new Date(finalDate);

    const firstDateCompare = new Date(startOfDay);
    const finalDateCompare = new Date(endOfDay);

    let newDateFirst;
    let newDateFinal;

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

    let filterGroup, sort;

    switch (type) {
      case "1":
        newDateFirst = new Date(
          firstDateCompare.setFullYear(firstDateCompare.getFullYear() - 1)
        );
        newDateFinal = new Date(
          finalDateCompare.setFullYear(finalDateCompare.getFullYear() - 1)
        );

        filterGroup = {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: "$products.quantity" },
          },
        };
        sort = {
          $sort: {
            "_id.month": 1,
          },
        };

        break;
      case "2":
        newDateFirst = new Date(
          firstDateCompare.setMonth(firstDateCompare.getMonth() - 1)
        );
        newDateFinal = new Date(
          finalDateCompare.setMonth(finalDateCompare.getMonth() - 1)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: "$products.quantity" },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };
        break;
      case "3":
        newDateFirst = new Date(
          firstDateCompare.setDate(firstDateCompare.getDate() - 8)
        );
        newDateFinal = new Date(
          finalDateCompare.setDate(finalDateCompare.getDate() - 8)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: "$products.quantity" },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };
        break;
      case "4":
        newDateFirst = new Date(
          firstDateCompare.setDate(firstDateCompare.getDate() - 8)
        );
        newDateFinal = new Date(
          finalDateCompare.setDate(finalDateCompare.getDate() - 8)
        );

        filterGroup = {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              fullDate: { $toDate: "$createdAt" },
            },
            count: { $sum: "$products.quantity" },
          },
        };
        sort = {
          $sort: {
            "_id.day": 1,
          },
        };

        break;

      default:
        break;
    }
    const staticticToCompare = await Order.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          createdAt: {
            $gte: newDateFirst,
            $lte: newDateFinal,
          },
        },
      },
      {
        $match: {
          "products.fromWarehouseId": warehouseId[0]?._id.toString(),
        },
      },
      filterGroup,
      sort,
    ]);
    const statictic = await Order.aggregate([
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $match: {
          "products.fromWarehouseId": warehouseId[0]?._id.toString(),
        },
      },
      filterGroup,
      sort,
    ]);

    res.status(200).json([statictic, staticticToCompare]);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
