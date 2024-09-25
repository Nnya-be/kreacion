const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    profilePic: String,
  },
  content: {
    type: String,
    required: true,
  },
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

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
