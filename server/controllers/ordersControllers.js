const { default: mongoose } = require("mongoose");
const Order = require("../models/Orders");

/**
 * * @description Set a order of purchase
 * * @routes      PUT      /setOrder
 * * @access      Private
 */
module.exports.setOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
