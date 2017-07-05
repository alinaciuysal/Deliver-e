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
    totalPrice: {
        type: Number,
        default: 0,
        set: v => Math.max(v, 0)
    },
    status: {
    	type: String,
    	enum: ["Basket", "Ordered", "Assigned", "Done"]
    },
    totalWeight: {
        type: Number,
        default: 0,
        set: v => Math.max(v, 0)
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
            item = {amount: amount, product: product};
            this.items.push(item);
        } else {
            item.amount += amount;
        }
		this.update( { $inc: { totalPrice: (amount * product.price) , totalWeight: (amount * product.weight) } },  function(err, order) {
            if (err) {
                callback(err, order);
                return;
            }
        });
        this.save(function(err, order) {
            callback(err, order);
        });
	}
	removeItem(product, amount, callback) {
        var item = this.items.find( function (item) {
            return String(item.product) == String(product._id);
        });
        if (item == undefined) {
            callback("There is no such product in basket.", item)
        } else {
            item.amount = Math.max(item.amount - amount, 0);
            if (item.amount == 0) {
                item.remove();
            }
        }
        this.update( { $inc: { totalPrice: -(amount * product.price) , totalWeight: -(amount * product.weight) } },  function(err, order) {
            if (err) callback(err, order);
        });
        this.save(function(err, order) {
            callback(err, order);
        });
	}
}

orderSchema.loadClass(OrderClass);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;