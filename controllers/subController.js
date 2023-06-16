const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

module.exports.add_subcategory = async (req,res)=>{
    let catData = await Category.find({isActive: true});
    return res.render('add_subcategory',{
        'catData' : catData
    });
}


module.exports.insertSubData = async (req,res)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    var image = '';
    if(req.file){
        image = Subcategory.avatarPath+"/"+req.file.filename;
    }
    req.body.image = image;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    await Subcategory.create(req.body);
    return res.redirect('back');
}