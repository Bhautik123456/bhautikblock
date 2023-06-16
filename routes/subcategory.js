const express = require('express');

const routes = express.Router();

const Subcategory = require('../models/Subcategory');


const subController = require('../controllers/subController');

routes.get('/add_subcategory', subController.add_subcategory);

routes.post("/insertSubData",Subcategory.uploadedAvatar,subController.insertSubData);
module.exports = routes;