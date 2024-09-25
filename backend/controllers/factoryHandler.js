const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFuncHandler');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getDocument = (Model, populate) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.id);
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
    if (Model == User) {
      console.log(req.body);
    }
    // console.log(req.body);

    const doc = await Model.create(req.body);

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
