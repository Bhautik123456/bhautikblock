const Category = require('../models/Category');

module.exports.add_category = async (req,res)=>{
    return res.render('add_category');
}

module.exports.insertCategoryRecord = async (req,res)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    let catData = await Category.create(req.body);
    return res.redirect('back');

}