const mongoose = require("mongoose");

const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}));

module.exports = Product; // Exporta o modelo
