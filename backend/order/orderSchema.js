var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    amount: { 
        type: Number,
        default: 0
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});


var orderSchema   = new mongoose.Schema({
    totalPrice: Number,
    status: {
    	type: String,
    	enum: ["Basket", "Ordered", "Assigned", "Done"]
    },
    totalWeight: {
        type: Number,
        default: 0
    },
    shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shop'
    },
    deliveryTime: String,
    items: [itemSchema],
    orderer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deliverer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



class OrderClass {
	addItem(product, amount, callback) {

        var item = this.items.find( function (item) {
            return String(item.product) == String(product._id);
        });
        if (item == undefined) {
            item = new Item({amount: amount, product: product});
            this.update({ $push: { items: item }}, function (err, item) {
                if (err) callback(err, item);
            });
        } else {
            item.amount += amount;
        }
		this.update( { $inc: { totalAmount: product.price , totalWeight: product.weight } },  function(err, order) {
            if (err) callback(err, order);
        });
        this.save(function(err, order) {
            callback(err, order);
        });
	}
	removeItem(product, amount) {
        this.update({ "items.$.product": item }, { $substract : { "items.amount": amount }, $substract: { totalAmount: item.price } });
		return this;
	}
}

orderSchema.loadClass(OrderClass);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;