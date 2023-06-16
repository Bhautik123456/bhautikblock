const express = require('express');

const routes = express.Router();


const offerController = require('../controllers/offerController');

routes.get('/add_offer', offerController.addOffer);

routes.post("/insertOfferRecord", offerController.insertOfferRecord);

module.exports = routes;