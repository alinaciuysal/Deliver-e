var Config = require('./config/config.js');
/**
 * db connect
 */
var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});
/**
 * create application
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
/**
 * app setup
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//passport
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
app.use(passport.initialize());
jwtConfig(passport);
/**
 * routing
 */
var userRoutes = require("./user/userRoutes");
var shopRoutes = require("./shop/shopRoutes");
app.use('/api/user', userRoutes(passport));
app.use('/api/shop', shopRoutes(passport));
module.exports = app;
