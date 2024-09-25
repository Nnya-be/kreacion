const factoryHandlers = require('./factoryHandler');
const User = require('../models/userModel');

exports.getAllUsers = factoryHandlers.getAllDocuments(User);
exports.createUser = factoryHandlers.createDocument(User);
exports.getUser = factoryHandlers.getDocument(User);
