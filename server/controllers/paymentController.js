const { default: mongoose } = require("mongoose");
const Payment = require("../models/Payment");

const handleErrors = (err) => {
  let errors = {
    number: "",
  };

  //Duplicate error code
  if (err.code === 11000) {
    if (err.message.includes("number")) {
      errors.number = "The number card entered already exists";
    }

    return errors;
  }
};
/**
 * * @description Get all your payments
 * * @routes      PUT      /getMyPayments/:id
 * * @access      Private
 */
module.exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      customerId: mongoose.Types.ObjectId(req.params.id),
    });

    let temp = JSON.stringify(payments);
    let objPayment = JSON.parse(temp);
    const newArr = objPayment.map((obj) => {
      const replaceNumber = "************" + obj.number.slice(12);
      return { ...obj, number: replaceNumber };
    });

    res.status(200).json(newArr);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

/**
 * * @description Set a new methof payment
 * * @routes      POST      /setPayment
 * * @access      Private
 */
module.exports.setPayment = async (req, res) => {
  try {
    console.log(req.body);
    const payment = await Payment.create(req.body);

    res.status(200).json(payment);
  } catch (error) {
    const message = handleErrors(error);
    res.status(400).send({ message });
  }
};

/**
 * * @description Set a new methof payment
 * * @routes      POST      /editPayment/:id
 * * @access      Private
 */
module.exports.editPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDefault } = req.body;
    if (isDefault) {
      //Find the default address
      const defaultPayment = await Payment.findOneAndUpdate(
        { isDefault: true },
        { isDefault: false }
      );
    }

    const newPayment = await Payment.findByIdAndUpdate(id, req.body);
    newPayment.number = "************" + newPayment.number.slice(12);
    res.status(200).json(newPayment);
  } catch (error) {
    const message = handleErrors(error);
    console.log(message);
    res.status(400).send({ message });
  }
};
