const Reply = require('../models/replyModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factoryHandler = require('./factoryHandler');
// const Post = require('../models/postModel');
// const Review = require('../models/reviewModel');

exports.getAllReply = factoryHandler.getAllDocuments(Reply);
exports.getReply = factoryHandler.getDocument(Reply);
exports.deleteReply = factoryHandler.deleteDocument(Reply);
exports.createReply = factoryHandler.createDocument(Reply);
exports.updateReply = factoryHandler.updateDocument(Reply);

// catchAsync(async (req, res, next) => {
//   if (!req.params || !req.body) {
//     return next(new AppError('Provide the fields for the reply!', 400));
//   }
//   const { postId, reviewId } = req.params;
//   if (!postId || !reviewId) {
//     return next(new AppError('Missing Id for documents', 400));
//   }

//   const postDoc = await Post.findById(postId);
//   const reviewDoc = await Review.findById(reviewId);

//   if (!postDoc || !reviewDoc) {
//     return next(new AppError('No Document found for the Id provided!', 404));
//   }

//   if (!postDoc.reviews.includes(reviewDoc.id)) {
//     return next(new AppError('Wrong Id provided!', 400));
//   }
//   const replyDoc = await Reply.create(req.body);

//   reviewDoc.replies.push(replyDoc.id);
//   await reviewDoc.save({ validateBeforeSave: false });

//   res.status(201).json({
//     status: 'success',
//     data: {
//       replyDoc,
//     },
//   });
// });
