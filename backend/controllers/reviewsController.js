const Review = require('../models/reviewModel');
const factoryHandler = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');

exports.createReview = factoryHandler.createDocument(Review);
exports.getAllReviews = factoryHandler.getAllDocuments(Review);
exports.getReview = factoryHandler.getDocument(Review);
exports.deleteReview = factoryHandler.deleteDocument(Review);
exports.reviewPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return next(new AppError('Please provide a post id!', 400));
  }

  const postDoc = await Post.findById(postId);
  if (!postDoc) {
    return next(new AppError('No Document found with the Id', 404));
  }
  const reviewDoc = await Review.create(req.body);

  postDoc.reviews.push(reviewDoc.id);
  await postDoc.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      reviewDoc,
    },
  });
});
