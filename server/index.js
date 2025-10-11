const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/authRoute");

const helmet = require("helmet");
const ratelimit = require("express-rate-limit");

PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.use(helmet());
app.use(
  ratelimit({
    windowMS: 10 * 60 * 1000,
    max: 50,
  })
);

app.use("/", auth);

mongoose
  .connect(process.env.Test)
  .then(() => {
    console.log("DB connected succesfully");
    app.listen(PORT, () => {
      console.log("Server running in port", PORT);
    });
  })
  .catch(() => {
    console.log("Error connecting to DB");
  });
