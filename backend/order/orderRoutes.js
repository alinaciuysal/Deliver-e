module.exports = orderRoutes;


function orderRoutes(passport) {

    var orderController = require('./orderController');
    var router = require('express').Router();

    var mw = passport.authenticate('jwt', {session: false});

    //middleware
    router.use(mw);

    router.route('/basket')
        .get(orderController.getBasket);

    return router;
}
