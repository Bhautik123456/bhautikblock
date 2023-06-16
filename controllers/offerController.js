const Offer = require('../models/Offer');

module.exports.addOffer = async (req,res)=>{
    return res.render('add_offer');
}

module.exports.insertOfferRecord = async (req,res) =>{
    let offerData = await Offer.create(req.body);
    return res.redirect('/offer/add_offer');
}