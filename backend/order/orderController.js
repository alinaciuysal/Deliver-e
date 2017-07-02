var User = require('../user/userSchema');
var Order = require('./orderSchema');

exports.getBasket = function(req, res) {
	Order.findOne({ orderer: req.user, status:'Basket'}, function(err, basket) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		if (basket == null){
			basket = new Order({
		        totalPrice: 0,
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
	res.sendStatus(501); 
};

exports.deleteBasket = function(req, res) {
	res.sendStatus(501); 
};

exports.makeOrder = function(req, res) {
	res.sendStatus(501); 
};

exports.getOrderHistory = function(req, res) {
	res.sendStatus(501); 
};

exports.acceptOrder = function(req, res) {
	res.sendStatus(501); 
};

exports.getAvailableOrders = function(req, res) {
	res.sendStatus(501); 
};

exports.getOrder = function(req, res) {
	res.sendStatus(501); 
};