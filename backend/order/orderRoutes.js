module.exports = orderRoutes;


function orderRoutes(passport) {

    var orderController = require('./orderController');
    var router = require('express').Router();

    var mw = passport.authenticate('jwt', {session: false});

    //middleware
    router.use(mw);

    router.route('/')
    	.post(orderController.makeOrder)
    	.get(orderController.getAvailableOrders);
    	
    router.route('/basket')
    	.post(orderController.addBasket)
    	.delete(orderController.deleteBasket)
        .get(orderController.getBasket);


    router.route('/history')
        .get(orderController.getOrderHistory)

    router.route('/:order_id')
    	.get(orderController.getOrder);

    router.route('/:order_id/accept')
    	.post(orderController.acceptOrder)


    return router;
}
