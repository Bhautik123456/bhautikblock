const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



module.exports.Login = async (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    else{
        return res.render('Login');
    }
}

module.exports.dashboard = async (req,res)=>{
    // res.cookie('username',"jivan");
    // res.cookie('last',"kanani");
    //set cookie data in browser
        return res.render('Dashboard');    
}

module.exports.viewAdmin = async (req,res)=>{
        let adminData = await Admin.find({});
        return res.render('view_admin',{
            'Allrecords' : adminData,
        });
}

module.exports.addAdmin = async (req,res)=>{
        return res.render('add_admin');
}

module.exports.insertAdminRecord = async (req,res)=>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
      
    var imagePath = '';
    if(req.file){
        imagePath = Admin.avatarPath+"/"+req.file.filename;
    }
    req.body.image = imagePath;
    req.body.name = req.body.fname+" "+req.body.lname;
    let pass = await bcrypt.hash(req.body.password,10);
    req.body.password = pass;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    let AdminData = await Admin.create(req.body);
    if(AdminData){
        req.flash('success',"admin Record inserted successfully");
        return res.redirect('back');
    }
    else{
        console.log("something wrong");

        return res.redirect('back');
    }
}
module.exports.checkLogin = async (req,res) =>{
   req.flash("success","Login Successfully");
    return res.redirect('/dashboard');
}


module.exports.modifyPassword = async (req,res)=>{
     let current = req.body.current;
     if(await bcrypt.compare(current,req.user.password)){
        if(req.body.current != req.body.npass){
            if(req.body.npass == req.body.cpass){
                let pass = await bcrypt.hash(req.body.npass,10);
              
                let AdPass = await Admin.findByIdAndUpdate(req.user.id,{ password : pass});
                if(AdPass){
                    return res.redirect('/logout');
                }
                else{
                    // console.log("Something wrong");
                    req.flash('error',"Something wrong");
                    return res.redirect('back');
                }
            }
            else{
                // console.log("new and confirm password not match");
                req.flash('error',"new and confirm password not match");
                return res.redirect('back');
            }
            
        }
        else{
            // console.log("new and current password are same!");
            req.flash('error',"new and current password are same!");
            return res.redirect('back');
        }
    }
    else{
        // console.log("Current password not match");
        req.flash('error',"Current password not match");
        return res.redirect('back');
     }
}


//forget password process

module.exports.checkEmail = async (req,res)=>{
    let adminData = await Admin.findOne({email: req.body.email});
    if(adminData){
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c28fb7658b2081",
              pass: "e5caf9f7456cf9"
            }
          });

          let otp = Math.round(Math.random()*100000);
          res.cookie('otp',otp);
          res.cookie('email',req.body.email);

          let info = await transporter.sendMail({
            from: 'rwn2develoeprfaculty@gmail.com', // sender address
            to: "piyush0101nakarani@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Your OTP:${otp}</b>`, // html body
          });
          req.flash("success", "OTP send Your Email! Check Your email");
          return res.redirect('/OtpPage')

    }
    else{
        req.flash('error',"Invalid Email");
        return res.redirect('/forgetEmail');
    }
}



module.exports.checkOTP = async (req,res)=>{
   
    if(req.body.otp == req.cookies.otp){
        return res.redirect('/changeForgetPassword');  
    }
    else{
        req.flash("error","OTP not Match");
        return res.redirect('back');
    }
}



module.exports.ResetPassword = async (req,res) =>{
    console.log(req.body);
    let email = req.cookies.email;
    if(req.body.npass === req.body.cpass){
        let CryptPassword = await bcrypt.hash(req.body.npass,10); 
        let AdminData = await Admin.findOne({email : email});
        if(AdminData){
            await Admin.findByIdAndUpdate(AdminData.id,{
                password : CryptPassword
            })

            req.flash("success", "Password Reset Successfully");
            res.clearCookie('otp');
            res.clearCookie('email');
            res.clearCookie('rnw');
            return res.redirect('/');

        }
        else{
            req.flash("error", "Password not changed");
            return res.redirect('back');
        }
    }
    else{
        req.flash("error", "password and confirm password not match");
        return res.redirect('back');
    }
}
//end