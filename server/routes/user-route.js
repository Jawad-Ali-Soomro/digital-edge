const express = require("express");
const {
  create_account,
  login_user,
  update_user,
  follow_user,
  unfollow_user,
  get_profile,
  get_all_users,
  toggle_follow_user,
} = require("../controllers/user-controller");
const user_route = express.Router();

user_route.post("/create/account", create_account);
user_route.post("/login/account", login_user),
  user_route.post("/update/user/:id", update_user);
user_route.post("/follow/user/", toggle_follow_user);
user_route.get("/user/profile", get_profile);
user_route.get("/get/users", get_all_users);

module.exports = user_route;
