const { default: mongoose } = require("mongoose");
const Address = require("../models/Addresses");

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

/**
 * * @description Set a new Address
 * * @routes      POST      /setAddress
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
 * * @description Set a new Address
 * * @routes      PUT      /editAddress/:id
 * * @access      Private
 */
module.exports.editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDefault } = req.body;
    if (isDefault) {
      //Find the default address
      const defaultAddress = await Address.findOneAndUpdate(
        { isDefault: true },
        { isDefault: false }
      );
    }

    const newAddress = await Address.findByIdAndUpdate(id, req.body);
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
