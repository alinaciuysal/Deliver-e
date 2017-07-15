var mongoose = require('mongoose');
var Shop = require('../shop/shopSchema');

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
    district: {
        type: String,
        required: function() {
            return this.status != "Basket";
        }
    },
    location: {
        type: String,
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
    orderTime: Date,
    deliveryTime: Date,
    items: [itemSchema],
    orderer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deliverer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejecters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});



class OrderClass {
	addItem(product, amount, callback) {
        var order = this;
        Shop.findOne({ catalogue: { $eq: product } }, function(err, shop){
            if (err){
                callback(err, null);
                return;
            }
            if (order.shop && String(order.shop) != String(shop._id)) {
                callback("Shops are not equal", null);
                return;
            }else{
                order.shop = shop;
                var item = order.items.find( function (item) {
                    return String(item.product) == String(product._id);
                });
                if (item == undefined) {
                    item = {amount: amount, product: product};
                    order.items.push(item);
                } else {
                    item.amount += amount;
                }
                order.totalPrice += (amount * product.price);
                order.totalWeight += (amount * product.weight);
                order.save(function(err, updated_order) {
                        callback(err, updated_order);
                        return;
                });
            }
        });
        

	}
	removeItem(product, amount, callback) {
        var item = this.items.find( function (item) {
            return String(item.product) == String(product._id);
        });
        if (item == undefined) {
            callback("There is no such product in basket.", item)
            return;
        } else if ( item.amount <= amount ) {
            amount = item.amount;
            item.remove();
        } else {
            item.amount -= amount;
        }
        if (this.items.length < 1)
            this.shop = undefined;
        this.totalPrice -= (amount * product.price);
        this.totalWeight -= (amount * product.weight);
        this.save(function(err, updated_order) {
                console.log("aaa")
                callback(err, updated_order);
        });
	}
}

orderSchema.loadClass(OrderClass);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;