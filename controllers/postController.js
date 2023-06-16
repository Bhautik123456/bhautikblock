const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.add_post = async (req,res)=>{
    return res.render('add_post');
}

module.exports.insertPostRecord = async (req,res) =>{
  
    var image = '';
    if(req.file){
        image = Post.avatarPath+"/"+req.file.filename;
    }
    req.body.image = image;
    req.body.name = req.user.name;
   
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    let anyDate = await new Date();
    req.body.date=anyDate.toShortFormat();
    
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    await Post.create(req.body);
   
    return res.redirect("/posts/add_post"); 

}

   Date.prototype.toShortFormat = function() {

        const monthNames = ["Jan", "Feb", "Mar", "Apr",
                            "May", "Jun", "Jul", "Aug",
                            "Sep", "Oct", "Nov", "Dec"];
        
        const day = this.getDate();
        
        const monthIndex = this.getMonth();
        const monthName = monthNames[monthIndex];
        
        const year = this.getFullYear();
        
        return `${day}-${monthName}-${year}`;  
    }


    module.exports.viewComments = async (req,res) =>{
        if(req.query.status == 'deactive'){
            let StatusChange = await Comment.findByIdAndUpdate(req.query.id,{isActive: false});
        }
    
        if(req.query.status == 'active'){
            let StatusChange = await Comment.findByIdAndUpdate(req.query.id,{isActive: true});
        }

        let commentData = await Comment.find({}).populate('postId').exec();
        // console.log(commentData);

        return res.render('view_comment',{
            cData : commentData
        });
    }