require("module-alias/register");
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ConfigMongoDB = require("./config/mongodb");

dotenv.config();

const START_SERVER = () => {
  const app = express();
  const port = process.env.PORT || 3001;

  // Sử dụng middleware cors
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  routes(app);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`3. Back-end Server is running at http://localhost:${port}`);
  });
};

(async () => {
  try {
    console.log("1. Connect to Database");
    await ConfigMongoDB.CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
