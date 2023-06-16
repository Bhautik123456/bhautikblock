const express = require('express');

const routes = express.Router();

const userController = require('../controllers/userController');

const Comment = require('../models/Comment');

routes.get('/', userController.indexPage);

routes.get("/singleBlog/:id", userController.singleBlog);

routes.post("/insertComment",Comment.uploadedAvatar, userController.insertComment);

routes.get('/imageGallery', userController.imageGallery);

module.exports = routes;