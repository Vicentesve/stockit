var fs = require("fs");
const data = require("./warehouse1.json");
var ObjectID = require("mongodb").ObjectId;

const generateData = async () => {
  try {
    data[0]?.products?.map((product) => {
      var objectId = new ObjectID();
      /*  */

      product._id = {
        $oid: objectId,
      };
    });

    var jsonString = JSON.stringify(data);
    /* fs.writeFileSync("thing.json", jsonString); */
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateData;
