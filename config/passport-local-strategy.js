const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
passport.use('admin',new passportLocal({
    usernameField : "email"
}, async function(email,password, done){  
     let AdminData = await Admin.findOne({email : email});
   
     if(AdminData){
        let passMatch = await bcrypt.compare(password, AdminData.password);
        if(passMatch){
            return done(null,AdminData);
        }
        else{
            return done(null,false);
        }
     }
     else{
        return done(null, false);
     }
}))

passport.serializeUser(function(user,done){
    console.log("serialize");
    console.log(user)
    return done(null,user.id);
})
passport.deserializeUser(async  function(id,done){
    let Ad = await Admin.findById(id);
    if(Ad){
        return done(null,Ad);
    }
    else{
        return done(null,false);
    }
})


passport.checkAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/');
    }
}

passport.setAuthenticatedUser = (req,res,next) =>{
    
    if(req.isAuthenticated()){
        res.locals.admins = req.user;
    }
    next();
}


module.exports = passport;

