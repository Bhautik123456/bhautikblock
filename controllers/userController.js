
const Slider = require('../models/Slider');
const Offer = require('../models/Offer');
const Posts = require("../models/Post");
const Comment = require("../models/Comment");
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

module.exports.indexPage = async (req,res) =>{
    let sliderData = await Slider.find({isActive : true});
    let PostData = await Posts.find({isActive : true});
    let offerData = await Offer.find({});

    return res.render('userPanel/index',{
        'sliderRecord' : sliderData,
        'offerRecord' : offerData,
        'postRecord' : PostData
    })
}


module.exports.singleBlog = async (req,res) =>{
    // console.log(req.params.id);
    let singlePost = await Posts.findById(req.params.id);
    let commentData = await Comment.find({postId:req.params.id,isActive : true});
    let TotalComment = await Comment.find({postId:req.params.id,isActive : true}).countDocuments();

    //next previous logic
    let AllPostRecords = await Posts.find({isActive:true});
    var allIds = [];
    AllPostRecords.map((v,i)=>{
        allIds.push(v.id);
    })

    for(var i=0; i<allIds.length; i++){
        if(req.params.id == allIds[i]){
            next = i;
        }
    }
    for(var i=0; i<allIds.length; i++){
        if(req.params.id == allIds[i]){
            prev = i;
        }
    }

    let latestBlogs = await Posts.find({isActive:true}).sort({_id:-1}).limit(3);
    
  
    

    return res.render('userPanel/Blogsingle',{
        'singleData' : singlePost,
        'totalComment' : TotalComment,
        'commentData' : commentData,
        'AllPost' : allIds,
        'next' : next,
        'prev' : prev,
        'latestBlogs' : latestBlogs
    })
}

module.exports.insertComment = async(req,res) =>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });


    var image = '';
    if(req.file){
        image  = Comment.avatarPath+"/"+req.file.filename;
    }
    req.body.image= image;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    
    await Comment.create(req.body);
    return res.redirect("back");

}


module.exports.imageGallery = async (req,res)=>{
    let catData = await Category.find({isActive:true});
    let subcatData = await Subcategory.find({isActive:true});
    return res.render('userPanel/imageGallery',{
        catData : catData,
        subData : subcatData
    });
}