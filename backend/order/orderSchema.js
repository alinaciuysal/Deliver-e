var mongoose = require('mongoose');

var orderSchema   = new mongoose.Schema({
    totalAmount: Number,
    status: {
    	type: String,
    	enum: ["Basket", "Ordered", "Assigned", "Done"]
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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
	addItem(item){
		this.update({ $push: { items: item }, $add: { totalAmount: item.price } });
		return this;
	}
	removeItem(item) {
		this.update({ $pull: { items: item }, $substract: { totalAmount: item.price } });
		return this;
	}
}

orderSchema.loadClass(OrderClass);

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;