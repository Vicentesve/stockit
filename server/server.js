const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
const generateData = require("./generateData");

const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const statisticRoutes = require("./routes/statisticRoutes");
const addressRoutes = require("./routes/addressRoutes");

//Config dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
}

//Connect to the database
connectDB();
generateData();

//Init app
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

//Routes
app.use(authRoutes);
app.use(warehouseRoutes);
app.use(categorieRoutes);
app.use(orderRoutes);
app.use(statisticRoutes);
app.use(addressRoutes);

// Static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

//Start app
app.listen(port, () =>
  console.log(`Server listening on port ${port}`.cyan.bold)
);
