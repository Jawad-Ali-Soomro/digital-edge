const { catch_async_err } = require("../middlewares");
const Post = require("../models/post-model");
const User = require("../models/user-model");

exports.create_post = catch_async_err(async (req, res) => {
  const create_post = await Post.create(req.body);
  const update_user = await User.findById(req.body.author);
  if (create_post) {
    update_user.created_posts.push(create_post._id);
    update_user.save();
    return res.json({
      message: "Post Created Succefully!",
      post: create_post,
    });
  } else {
    return res.json({
      message: "Error WHile Creating Post",
    });
  }
});

exports.delete_post = catch_async_err(async (req, res) => {
  const find_user = await User.findById(req.body.user_id);
  const find_post = await Post.findById(req.body.post_id);
  if (!find_user || !find_post) {
    return res.json({
      message: "User or Post not found",
    });
  }
  if (String(find_user._id) !== String(find_post.author._id)) {
    return res.json({
      message: "You are unauthorized to delete this post",
    });
  }
  find_user.created_posts = find_user.created_posts.filter(
    (postId) => String(postId) !== String(find_post._id)
  );

  await Post.findByIdAndDelete(find_post._id);
  await find_user.save();
  return res.json({
    message: "Post Deleted Successfully!",
  });
});

exports.toggle_like = catch_async_err(async (req, res) => {
  const find_user = await User.findById(req.body.user_id);
  const find_post = await Post.findById(req.body.post_id);

  if (!find_user || !find_post) {
    return res.status(404).json({
      message: "User or Post not found",
    });
  }
  const existingLike = find_post.likes.find(
    (like) => String(like.user) === String(find_user._id)
  );
  if (!existingLike) {
    find_post.likes.push({ user: find_user._id });
    find_user.liked_posts.push(find_post._id);
    await find_post.save();
    await find_user.save();
    return res.json({
      message: "Post Liked Successfully!",
    });
  } else {
    find_post.likes = find_post.likes.filter(
      (like) => String(like.user) !== String(find_user._id)
    );
    const likedPostIndex = find_user.liked_posts.indexOf(find_post._id);
    if (likedPostIndex !== -1) {
      find_user.liked_posts.splice(likedPostIndex, 1);
    }
    await find_post.save();
    await find_user.save();
    return res.json({
      message: "Post Unliked Successfully!",
    });
  }
});

exports.comment_post = catch_async_err(async (req, res) => {
  const find_user = await User.findById(req.body.user_id);
  const find_post = await Post.findById(req.body.post_id);
  if (!find_user || !find_post) {
    return res.status(404).json({
      message: "User or Post not found",
    });
  }
  const newComment = {
    user: find_user._id,
    content: req.body.content,
  };

  find_post.comments.push(newComment);

  await find_post.save();

  return res.json({
    message: "Comment added successfully!",
  });
});

exports.delete_comment = catch_async_err(async (req, res) => {
  const find_user = await User.findById(req.body.user_id);
  const find_post = await Post.findById(req.body.post_id);
  if (!find_user || !find_post) {
    return res.status(404).json({
      message: "User or Post not found",
    });
  }
  const commentIndex = find_post.comments.findIndex(comment => String(comment._id) === req.body.comment_id);

  if (commentIndex === -1) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  const comment = find_post.comments[commentIndex];

  if (String(comment.user) !== String(find_user._id)) {
    return res.status(403).json({
      message: "You are not authorized to delete this comment",
    });
  }
  find_post.comments.splice(commentIndex, 1);

  await find_post.save();

  return res.json({
    message: "Comment deleted successfully!",
  });
});
