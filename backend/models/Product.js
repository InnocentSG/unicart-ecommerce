const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  discount: Number,
  stock: Number,
  images: [String],
  variants: { name: String, values: [String] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
