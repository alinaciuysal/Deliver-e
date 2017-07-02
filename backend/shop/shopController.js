var User = require('../user/userSchema');
var Shop = require('./shopSchema');
var Product = require('./productSchema');

exports.postShop = function(req, res) {
    var shop = new Shop(req.body);
    if (req.user.type == "shop") {
        res.status(400).send("User is already a shop owner.");
        return;
    }

    shop.save(function(err, shop) {
        if (err) {
            res.status(400).send("Cannot save shop");
            return;
        }
        User.update(req.user, {$set: { type: 'shop', shop: shop }}, function(err){
            if (err) {
                shop.remove();
                res.status(400).send(err);
                return;
            }
            res.status(201).json(shop);
        });
    });
};

exports.postProduct = function(req, res) {
    var product = new Product(req.body);

        product.save(function(err, product) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            Shop.findByIdAndUpdate(
                req.user.shop, 
                {$push: {catalogue: product}},
                function(err){
                    if (err) {
                        res.status(400).send(err);
                        return;
                    }
                    res.status(201).json(product);
                }
            );
            
        });
};

exports.getShops = function(req, res) {
    Shop.find(function(err, shops) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(shops);
    });
};

exports.getShop = function(req, res) {

    Shop.findById(req.params.shop_id, function(err, shop) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(shop);
    });
};

exports.getProduct = function(req, res) {

    Product.findById(req.params.product_id, function(err, product) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(product);
    });
};

exports.putShop = function(req, res) {
    Shop.findByIdAndUpdate(
        req.params.shop_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, shop) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(shop);
    });
};

exports.putProduct = function(req, res) {
    Product.findByIdAndUpdate(
        req.params.product_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, product) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(product);
    });
};

exports.deleteShop = function(req, res) {
    Shop.findByIdAndRemove(req.user.shop, function(err, shop){
        if (err) {
            res.status(400).send(err);
        }
        req.user.update(
            { $unset: { shop: 1 },
             $set: { type: "customer" }},
            function (err, user){
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                res.sendStatus(200);
            });
    });

};

exports.deleteProduct = function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        product.remove();
        res.sendStatus(200);
    });
};