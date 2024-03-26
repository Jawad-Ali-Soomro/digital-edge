const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const user_schema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Please Enter Email!"],
    unique: [true, "Email Exists Already!"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password!"],
  },
  bio: {
    type: String,
    default : ""
  },
  liked_posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default : "0"
    },
  ],
  created_posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default : "0"
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default : "0"
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default : "0"
    },
  ],
});

user_schema.pre("save", function (next) {
  if (this.isModified("password")) {
    return bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    next();
  }
});

const User = mongoose.model("User", user_schema);
module.exports = User;
