const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    profilePicture: String,
  },
  content: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Reply',
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
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
