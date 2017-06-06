module.exports = shopRoutes;


function shopRoutes(passport) {

    var shopController = require('./shopController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(shopController.postShop)
        .get(shopController.getShops)
        .delete(shopController.deleteShop);

    router.route('/product')
        .post(shopController.postProduct);

    router.route('/product/:product_id')
        .get(shopController.getProduct)
        .put(shopController.putProduct)
        .delete(shopController.deleteProduct);

    router.route('/:shop_id')
        .get(shopController.getShop)
        .put(shopController.putShop);

    return router;
}