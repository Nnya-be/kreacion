const Review = require('../models/reviewModel');
const factoryHandler = require('./factoryHandler');

exports.createReview = factoryHandler.createDocument(Review);
exports.getAllReviews = factoryHandler.getAllDocuments(Review);
exports.getReview = factoryHandler.getDocument(Review);
exports.deleteReview = factoryHandler.deleteDocument(Review);
