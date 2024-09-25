const Reply = require('../models/reviewModel');
const factoryHandler = require('./factoryHandler');

exports.getAllReply = factoryHandler.getAllDocuments(Reply);
exports.getReply = factoryHandler.getDocument(Reply);
exports.deleteReply = factoryHandler.deleteDocument(Reply);
exports.createReply = factoryHandler.createDocument(Reply);