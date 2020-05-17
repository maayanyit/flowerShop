const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.port || 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb database established successfully");
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const orderRouter = require("./routes/order");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/order", orderRouter);

app.listen(port, () => console.log(`LISTENING ON UHH PORT ${port}`));
