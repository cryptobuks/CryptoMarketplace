// Declare Plugins
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    http = require('http'),
    User = require('./models/user');

    var routes = require('./routes/index');

// Initiate Plugins
mongoose.connect("mongodb://admin:1qaQANsv7VE9FqXVhu0m912BAcUVX1@ds249418.mlab.com:49418/crypto-market-place");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Passport Config
app.use(require("express-session")({
    secret: 'idk',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables - ALWAYS AFTER PASSPORT CONFIG!!!
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
})

// All routes - ALWAYS AFTER GLOBAL VARIABLES
app.use(routes);

// Start Server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log(`Crypto Marketplace Server App listening on port ${process.env.IP}:${process.env.PORT}`)
})