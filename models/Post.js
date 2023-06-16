const mongoose = require('mongoose');

const path = require('path');

const AVATAR_PATH = "/uploads/Posts";

const multer = require('multer');


const PostsSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    category_name : {
        type : String,
        required : true
    },
    description : {
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

PostsSchema.statics.uploadedAvatar = multer({storage : storage}).single('image');
PostsSchema.statics.avatarPath = AVATAR_PATH;


const Post = mongoose.model('Post',PostsSchema);
module.exports = Post;