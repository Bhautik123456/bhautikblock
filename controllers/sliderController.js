const Slider = require('../models/Slider');

module.exports.sliderPage = async (req,res) =>{
    return res.render('add_slider');
}

module.exports.insertSliderRecord = async (req,res)=>{
    var image = '';
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });

    if(req.file){
        image = Slider.avatarPath+"/"+req.file.filename;
    }
    req.body.image = image;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    Slider.create(req.body);
    req.flash('success', "Slider Record inserted successfully");
    return res.redirect('/slider/add_slider');
}


module.exports.viewSlider = async (req,res)=>{

    if(req.query.status == 'deactive'){
        let StatusChange = await Slider.findByIdAndUpdate(req.query.id,{isActive: false});
    }

    if(req.query.status == 'active'){
        let StatusChange = await Slider.findByIdAndUpdate(req.query.id,{isActive: true});
    }

    var search = '';
    if(req.query.search){
        search = req.query.search;
    }

    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    var per_page = 5;

    let sliderData = await Slider.find({
        $or : [
            { title : { $regex : '.*'+search+'.*', $options : 'i'}},
            { content : { $regex : '.*'+search+'.*',  $options : 'i'}}
        ]
    })
    .limit(per_page*1)
    .skip((page-1)*per_page)
    .exec();

    let CountSliderData = await Slider.find({
        $or : [
            { title : { $regex : '.*'+search+'.*', $options : 'i'}},
            { content : { $regex : '.*'+search+'.*',  $options : 'i'}}
        ]
    }).countDocuments();
    let perPageRecord = Math.ceil(CountSliderData/per_page)

    return res.render('view_slider',{
        sliderData : sliderData,
        pagesData : perPageRecord,
        currentPage : page,
        searchData : search
    })
}


module.exports.multiDelete = async (req,res) =>{
    // console.log(req.body);
    var multi = req.body.multiDelete;
    for(var i=0; i<multi.length; i++){
        await Slider.findByIdAndDelete(multi[i]);
    }
    return res.redirect('/slider/view_slider');
}