// Load required packages
var mongoose = require('mongoose');

var Product   = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    },
    category:  {
        type: String,
        required: true
    },
    weight:  {
        type: Number,
        required: true
    },
    stock:  {
        type: Number,
        required: true
    },
    details: String,
    photo: String,
});

Product.pre('remove', function (next) {
	var product = this;
	product.model('Shop').update(
		{ catalogue: product._id},
		{ $pull: { catalogue: product._id }},
		{ multi: true},
		next);
});

// Export the Mongoose model

module.exports = mongoose.model('Product', Product);

