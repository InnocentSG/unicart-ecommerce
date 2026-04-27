const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user').populate('product');
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
};
