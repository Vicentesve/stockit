const { default: mongoose } = require("mongoose");
const Address = require("../models/Addresses");

/**
 * * @description Set a new Address
 * * @routes      PUT      /setAddress
 * * @access      Private
 */
module.exports.setAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);

    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Get all your addresses
 * * @routes      PUT      /getMyAddresses/:id
 * * @access      Private
 */
module.exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      customerId: mongoose.Types.ObjectId(req.params.id),
    });

    res.status(200).json(addresses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
