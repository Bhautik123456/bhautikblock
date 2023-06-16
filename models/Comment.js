const mongoose = require('mongoose');

const path = require('path');

const AVATAR_PATH = "/uploads/comments";

const multer = require('multer');


const CommentSchema = mongoose.Schema({
    
    name :{
        type : String,
        required : true
    },
    
    email : {
        type : String,
        required : true
    },
   
    image : {
        type : String,
        required : true
    },
    comment:{
        type : String,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
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

CommentSchema.statics.uploadedAvatar = multer({storage : storage}).single('image');
CommentSchema.statics.avatarPath = AVATAR_PATH;

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;