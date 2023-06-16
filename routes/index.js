const express = require('express');

const routes = express.Router();

const Admin = require('../models/Admin');

const passport = require('passport');

const adminController = require('../controllers/adminController');

routes.get('/', adminController.Login);

routes.post('/checkLogin',passport.authenticate('admin',{failureRedirect:"/"}) ,adminController.checkLogin);

//forget email

routes.get("/forgetEmail", async (req,res)=>{
    return res.render('forget');
})

routes.post("/checkEmail", adminController.checkEmail);

routes.get("/OtpPage", async (req,res)=>{
    if(req.cookies.email){
        return res.render('OtpPage');
    }
    else{
        return res.redirect('back');
    }
})

routes.post("/checkOTP", adminController.checkOTP);

routes.get("/changeForgetPassword", async (req,res)=>{
    return res.render('changeforgetpassword');
})

routes.post("/ResetPassword", adminController.ResetPassword);
//end forget email

routes.get('/dashboard',passport.checkAuthenticatedUser ,adminController.dashboard);

routes.get('/view_admin', passport.checkAuthenticatedUser,adminController.viewAdmin);

routes.get('/add_admin',passport.checkAuthenticatedUser, adminController.addAdmin);

routes.post("/insertAdminRecord",passport.checkAuthenticatedUser,Admin.uploadedAvatar, adminController.insertAdminRecord);

routes.get('/changePassword', passport.checkAuthenticatedUser, async (req,res)=>{
        return res.render('changePassword');
})


routes.get('/logout', passport.checkAuthenticatedUser, async (req,res)=>{
    req.logout(function(err){
        if(err){
            console.log("something wrong");
            return false;
        }
        return res.redirect('/');
    })  
})

routes.post("/modifyPassword", passport.checkAuthenticatedUser, adminController.modifyPassword);

routes.use('/user', require('./user_routes'));

routes.use('/slider',  passport.checkAuthenticatedUser, require('./slider'));

routes.use('/offer', passport.checkAuthenticatedUser, require('./offer'));
routes.use("/posts", passport.checkAuthenticatedUser, require('./posts'));
routes.use("/category", passport.checkAuthenticatedUser, require('./category'));
routes.use("/subcategory", passport.checkAuthenticatedUser, require('./subcategory'));

module.exports = routes;