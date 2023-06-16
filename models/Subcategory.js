const mongoose = require('mongoose');

const path = require('path');

const AVATAR_PATH = "/uploads/subcategory";

const multer = require('multer');

const SubcategorySchema = mongoose.Schema({
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
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

SubcategorySchema.statics.uploadedAvatar = multer({storage : storage}).single('image');
SubcategorySchema.statics.avatarPath = AVATAR_PATH;


const Subcategory = mongoose.model('Subcategory',SubcategorySchema);
module.exports = Subcategory;