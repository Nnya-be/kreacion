const factoryHandler = require('./factoryHandler');
const Post = require('../models/postModel');

exports.getAllPosts = factoryHandler.getAllDocuments(Post);
exports.getPost = factoryHandler.getDocument(Post);
exports.updatePost = factoryHandler.updateDocument(Post);
exports.createPost = factoryHandler.createDocument(Post);
exports.deletePost = factoryHandler.deleteDocument(Post)
