const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const CONNECT_DB = async () => {
  await mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
      console.log("2. Connect to Database successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { CONNECT_DB };
