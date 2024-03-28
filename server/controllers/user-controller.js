const { catch_async_err } = require("../middlewares");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

exports.create_account = catch_async_err(async (req, res) => {
  const find_user = await User.findOne({ email: req.body.email });
  if (find_user) {
    return res.json({
      message: "User Exists Already!",
    });
  }
  const account_created = User.create(req.body);
  account_created
    ? res.json({ message: "Account Created!" })
    : res.json({ message: "Error While Creating Account!" });
});

exports.login_user = catch_async_err(async (req, res) => {
  const found_user = await User.findOne({ email: req.body.email });
  if (!found_user) {
    return res.json({
      message: "Account Not Found!",
    });
  } else {
    const decrypted = await bcrypt.compare(
      req.body.password,
      found_user.password
    );
    if (!decrypted) {
      return res.json({
        message: "Password Is Incorrect!",
      });
    }
    res.json({
      message: "Logged In Successfully!",
      user_info: found_user,
    });
  }
});

exports.update_user = catch_async_err(async (req, res) => {
  const update_user = await User.findByIdAndUpdate(req.params.id, {
    bio: req.body.bio,
    username: req.body.username,
  });
  await update_user.save();
  return res.json({
    message: "Profile Updated Successfully!",
    user_info: update_user,
  });
});

exports.toggle_follow_user = catch_async_err(async (req, res) => {
  const user_to_follow = await User.findById(req.body.user_id);
  const user_following = await User.findById(req.body.logged_user_id);
  const isFollowing = user_following.following.includes(user_to_follow._id);

  if (isFollowing) {
    const followingIndex = user_following.following.indexOf(user_to_follow._id);
    user_following.following.splice(followingIndex, 1);
    const followerIndex = user_to_follow.followers.indexOf(user_following._id);
    user_to_follow.followers.splice(followerIndex, 1);
    await user_to_follow.save();
    await user_following.save();
    return res.json({
      message: "Unfollowed Successfully!",
      isFollowing: false,
    });
  } else {
    user_following.following.push(user_to_follow._id);
    user_to_follow.followers.push(user_following._id);

    await user_to_follow.save();
    await user_following.save();

    return res.json({
      message: "Followed Successfully!",
      isFollowing: true,
    });
  }
});

exports.get_profile = catch_async_err(async (req, res) => {
  const get_user = await User.findById(req.body.user_id)
    .populate("created_posts")
    .populate("following");
  if (!get_user) {
    return res.json({
      message: "User Not Found",
    });
  }
  return res.json({
    message: "Account Found",
    user_info: get_user,
  });
});

exports.get_all_users = catch_async_err(async (req, res) => {
  const users = await User.find({});
  return res.json({
    users,
  });
});
