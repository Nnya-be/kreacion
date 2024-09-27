const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  tags: [String],
  author: {
    name: {
      type: String,
      required: true,
    },
    profilePicture: String,
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Review',
    },
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;
