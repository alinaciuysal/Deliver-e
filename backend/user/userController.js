var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

module.exports.login = function(req, res){

    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.customerSignup = function(req, res){
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "customer"
    if(req.body.name) user.name = req.body.name;
    if(req.body.surname) user.surname = req.body.surname;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = Date(req.body.birthday);


    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.delivererSignup = function(req, res){
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "deliverer"
    user.maxWeight = req.body.maxWeight;
    user.preferredLocations = req.body.preferredLocations;
    if(req.body.name) user.name = req.body.name;
    if(req.body.surname) user.surname = req.body.surname;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = Date(req.body.birthday);



    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            email: user.email
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};