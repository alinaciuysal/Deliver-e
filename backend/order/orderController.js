var User = require('../user/userSchema');
var Order = require('./orderSchema');
var Product = require('../shop/productSchema');

exports.getBasket = function(req, res) {
	Order.findOne({ orderer: req.user, status:'Basket'}, function(err, basket) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		if (basket == null){
			var basket = new Order({
		        status: "Basket",
		        orderer: req.user
		    });
		    basket.save(function(err, basket) {
		    	if (err) {
		    		res.sendStatus(500);
		    		return;
		    	}

				res.status(200).json(basket);
				return;
		    });
		}
		res.status(200).json(basket);
	});
};

exports.addBasket = function(req, res) {
	Order.findOne({ orderer: req.user, status:'Basket'}, function(err, basket) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		Product.findById(req.body.product, function(err, product) {
				basket.addItem(product, req.body.amount, function(err, basket) {
					if (err) {
						res.status(500).send(err);
					}
					res.status(200).json(basket);
			});
		});
	});
};

exports.deleteBasket = function(req, res) {
	Order.findOne({ orderer: req.user, status:'Basket'}, function(err, basket) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		Product.findById(req.body.product, function(err, product) {
				basket.removeItem(product, req.body.amount, function(err, basket) {
					if (err) {
						res.status(500).send(err);
						return;
					}
					res.status(200).json(basket);
			});
		});
	});
};

exports.makeOrder = function(req, res) {
	Order.findOneAndUpdate({ orderer: req.user, status:'Basket'}, { $set: { status: 'Ordered' } }, { "new": true }, function(err, order) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		var basket = new Order({
		        status: "Basket",
		        orderer: req.user
		    });
		    basket.save(function(err, basket) {
		    	if (err) {
		    		res.sendStatus(500);
		    		return;
		    	}

				res.status(200).json(order);
				return;
		    });
	});
};

exports.getOrderHistory = function(req, res) {
	Order.find({ orderer: req.user, status: { '$ne': 'Basket' } }, function(err, orders) {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).json(orders);
	});
};

exports.acceptOrder = function(req, res) {
	Order.findById(req.params.order_id, function (err, order) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (req.user.type != "deliverer"){
        	res.status(403).send("You need to be a deliverer to accept orders.");
        	return;
        } else if ( order.status != "Ordered" ){
        	res.status(400).send("The order is already assigned");
        	return;
        }

        order.deliverer = req.user;
        order.status = "Assigned";

        order.save(function (err, order) {
        	if (err) {
        		res.status(500).send(err);
        		return
        	}
	        res.status(200).json(order);
	        return;
        });

    });
};

exports.getAvailableOrders = function(req, res) {
	res.sendStatus(501); 
};

exports.getOrder = function(req, res) {
	res.sendStatus(501); 
};