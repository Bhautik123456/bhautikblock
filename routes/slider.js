const express = require('express');

const routes = express.Router();

const Slider = require('../models/Slider');

const sliderController = require('../controllers/sliderController');

routes.get('/add_slider', sliderController.sliderPage);

routes.post("/insertSliderRecord",Slider.uploadedAvatar,sliderController.insertSliderRecord);


routes.get("/view_slider", sliderController.viewSlider);

routes.post("/multiDelete", sliderController.multiDelete);



module.exports = routes;