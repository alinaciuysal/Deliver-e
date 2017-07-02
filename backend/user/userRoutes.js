module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();


    router.route('/')
    	.get(passport.authenticate('jwt', {session: false}), userController.getUser)
    	.put(passport.authenticate('jwt', {session: false}), userController.editUser);
    router.post('/login', userController.login);
    router.post('/signup/customer', userController.customerSignup);
    router.post('/signup/deliverer', userController.delivererSignup);
    router.post('/signup/shop', userController.shopSignup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister);
    router.route('/:user_id')
        .get(passport.authenticate('jwt', {session: false}), userController.getUserById);

    return router;

}