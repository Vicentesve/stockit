const Categorie = require("../models/Categories");

/**
 * * @description Get the pruduct´s categories
 * * @routes      GET      /getCategories
 * * @access      Private
 */
module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
