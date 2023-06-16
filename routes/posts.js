const express = require('express');

const routes = express.Router();

const Post = require('../models/Post');

const postController = require('../controllers/postController');

routes.get('/add_post', postController.add_post);

routes.post("/insertPostRecord",Post.uploadedAvatar, postController.insertPostRecord);


routes.get("/view_comment", postController.viewComments);

module.exports = routes;