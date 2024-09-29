const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFuncHandler');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');
const Review = require('../models/reviewModel');
const Reply = require('../models/replyModel');

exports.getDocument = (Model, populate) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populate) {
      query = query.populate(populate);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No Document found with specified ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;

    if (!req.body) {
      return next(new AppError('Please provide contents!'), 400);
    }

    if (Model === Reply) {
      if (!req.params || !req.body) {
        return next(new AppError('Provide the fields for the reply!', 400));
      }
      const { postId, reviewId } = req.params;
      if (!postId || !reviewId) {
        return next(new AppError('Missing Id for documents', 400));
      }

      const postDoc = await Post.findById(postId);
      const reviewDoc = await Review.findById(reviewId);

      if (!postDoc || !reviewDoc) {
        return next(
          new AppError('No Document found for the Id provided!', 404),
        );
      }

      if (!postDoc.reviews.includes(reviewDoc.id)) {
        return next(new AppError('Wrong Id provided!', 400));
      }
      doc = await Reply.create(req.body);

      reviewDoc.replies.push(doc.id);
      await reviewDoc.save({ validateBeforeSave: false });
    } else if (Model === Review) {
      const { postId } = req.params;
      // console.log(postId);
      if (!postId) {
        return next(new AppError('Please provide a post id!', 400));
      }

      const postDoc = await Post.findById(postId);
      if (!postDoc) {
        return next(new AppError('No Document found with the Id', 404));
      }
      doc = await Model.create(req.body);
      postDoc.reviews.push(doc.id);
      await postDoc.save({ validateBeforeSave: false });
    } else {
      doc = await Model.create(req.body);
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Document found with the ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateDocument = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document with that Id found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAllDocuments = (Model) =>
  catchAsync(async (req, res, next) => {
    /** Allows for nested tour gets. */
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      staus: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
