const express = require('express')
const { create_account, login_user, update_user, follow_user } = require('../controllers/user-controller')
const user_route = express.Router()

user_route.post('/create/account' , create_account)
user_route.post('/login/account' , login_user),
user_route.post('/update/user/:id' , update_user)
user_route.post('/follow/user/' , follow_user)

module.exports = user_route