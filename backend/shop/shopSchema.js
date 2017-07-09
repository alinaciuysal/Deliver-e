// Load required packages
var mongoose = require('mongoose');

var Shop   = new mongoose.Schema({
    name: String,
    address: String,
    photo: String,
    phone: String,
    type: String,
    catalogue: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

Shop.pre('remove', function (next) {
	var shop = this;
	shop.model('User').update(
		{ shop: shop._id},
		{ $unset: { shop: 1 }, $set: { type: "customer" }},
		{ multi: true},
		next);
});

// Export the Mongoose model

module.exports = mongoose.model('Shop', Shop);

