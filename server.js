const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const users = require("./routes/user");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(express.urlencoded({ extended: false, limit: "5mb" }));

app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/user", users);

const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("views/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "views", "build", "index.html"))
  );
}

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
