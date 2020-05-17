const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    productsList: { type: Array, required: true },
    cost: { type: Number, required: true },
    status: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("ordername", orderSchema);

module.exports = Order;
