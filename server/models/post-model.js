const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      default : {},
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      liked_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  category: {
    type: String,
    required: true,
    default : "Random"
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
      commented_at: {
        type: Date,
        default: Date.now,
      },
      default : {}
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", post_schema);

module.exports = Post;
