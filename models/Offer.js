const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    
    icon :{
        type : String,
        required : true
    },
    
    title : {
        type : String,
        required : true
    },
   
    content : {
        type : String,
        required : true
    }
});


const Offer = mongoose.model('Offer',OfferSchema);
module.exports = Offer;