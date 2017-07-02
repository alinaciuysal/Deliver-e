var mongoose = require('mongoose');

var orderSchema   = new mongoose.Schema({
    totalPrice: Number,
    status: {
    	type: String,
    	enum: ["Basket", "Ordered", "Assigned", "Done"]
    },
    items: [{
        amount: { 
            type: Number,
            default: 0
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
  	}],
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
	addItem(item, amount){
		this.update({ "items.product": item }, { $add: { "items.amount": amount }, $add: { totalAmount: item.price } }, { upsert: true });
		return this;
	}
	removeItem(item, amount) {
        this.update({ "items.$.product": item }, { $substract : { "items.amount": amount }, $substract: { totalAmount: item.price } });
		return this;
	}
}

orderSchema.loadClass(OrderClass);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;