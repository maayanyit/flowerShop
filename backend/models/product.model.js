const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productImage: { type: String, required: true },
    productname: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    sizes: { type: Array, required: true }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
