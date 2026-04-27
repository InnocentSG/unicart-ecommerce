const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.getRelatedProducts = async (req, res) => {
  const related = await Product.find({ category: req.params.category }).limit(5);
  res.json(related);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
