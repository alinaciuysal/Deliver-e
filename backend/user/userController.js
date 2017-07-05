var Config = require('../config/config.js');
var User = require('./userSchema');
var Shop = require('../shop/shopSchema');
var Order = require('../order/orderSchema');
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

    if(!req.body.name){
        res.status(400).send('name required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "customer";
    user.name = req.body.name;
    if(req.body.surname) user.surname = req.body.surname;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = Date(req.body.birthday);


    user.save(function(err) {
        if (err) {
            res.status(500).send("User with provided information already exists.");
            return;
        }
        var basket = new Order({
            totalPrice: 0,
            status: "Basket",
            orderer: user
        });
        basket.save(function(err) {
            if (err) {
                res.status.send(err);
                return;
            }

            res.status(201).json({token: createToken(user)});
        });

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

    if(!req.body.name){
        res.status(400).send('name required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "deliverer";
    user.maxWeight = req.body.maxWeight;
    user.preferredLocations = req.body.preferredLocations;
    user.name = req.body.name;
    if(req.body.surname) user.surname = req.body.surname;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = Date(req.body.birthday);



    user.save(function(err) {
        if (err) {
            res.status(500).send("User with provided information already exists.");
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.shopSignup = function(req, res){

    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }
    if(!req.body.shop){
        res.status(400).send('shop details are required');
        return;
    }

    if(!req.body.name){
        res.status(400).send('name required');
        return;
    }

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "shop";

    var shop = new Shop(req.body.shop);

    shop.save(function(err, shop) {
        if (err) {
            res.status(400).send("Problem occurred while saving the shop.");
            return;
        }
        user.shop = shop;
        user.save(function(err){
            if (err) {
                shop.remove();
                res.status(500).send("User with provided information already exists.");
                return;
            }
            res.status(201).json({token: createToken(user)});
        });
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

module.exports.getUser = function(req, res) {
    user = req.user;
    delete user._doc.password;
    res.status(200).json(user);
    return;
};

module.exports.getUserById = function(req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        delete user._doc.password;
        res.status(200).json(user);
        return;
    });
};

module.exports.editUser = function(req, res) {
    req.user.update(req.body, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).json(user);
        return;
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            email: user.email,
            name: user.getUserName()
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};