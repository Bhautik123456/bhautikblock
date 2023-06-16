const express = require('express');

const routes = express.Router();


const categoryController = require('../controllers/categoryController');

routes.get('/add_category', categoryController.add_category);

routes.post("/insertCategoryRecord", categoryController.insertCategoryRecord);

module.exports = routes;