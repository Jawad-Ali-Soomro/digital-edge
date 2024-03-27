const express = require('express')
const { create_post, delete_post, toggle_like, comment_post, delete_comment } = require('../controllers/post-controller')
const post_route = express.Router()

post_route.post('/create/post' , create_post)
post_route.delete('/delete/post' , delete_post)
post_route.post('/like/post' , toggle_like)
post_route.post('/comment/post' , comment_post)
post_route.post('/delete/comment' , delete_comment)

module.exports = post_route