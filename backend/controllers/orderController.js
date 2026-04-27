const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.json(orders);
};

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};
