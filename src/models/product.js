const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    inventoryCount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

let Product = mongoose.model("product", productSchema);

module.exports = Product;
