const mongoose = require('mongoose');

const path = require('path');

const AVATAR_PATH = "/uploads/sliders";

const multer = require('multer');

const SliderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
   
    content : {
        type : String,
        required : true
    }, 
    image : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    createdAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    }
});


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now())
    }
})

SliderSchema.statics.uploadedAvatar = multer({storage : storage}).single('image');
SliderSchema.statics.avatarPath = AVATAR_PATH;


const Slider = mongoose.model('Slider',SliderSchema);
module.exports = Slider;