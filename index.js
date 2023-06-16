const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

const mongoose = require('mongoose');
const url = "mongodb+srv://bhautiksakariya09:Bhautik09@cluster0.znt6hqw.mongodb.net/adminNode9";

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const cookieParser = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

const flash = require('express-flash');
const middleware = require('./config/middleware');

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static('assets'));
app.use(express.static('user_assets'));
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());


app.use(session({
    name : "rnw",
    secret : "nodecode",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(middleware.setFlash);


app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log("something wrong");
        return false;
    }
    console.log("server is running on port:",port);
})
