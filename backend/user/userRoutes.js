module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();

    var mw = passport.authenticate('jwt', {session: false});

    router.use('/', mw);

    router.route('/')
    	.get(userController.getUser)
    	.put(userController.editUser);
    router.post('/login', userController.login);
    router.post('/signup/customer', userController.customerSignup);
    router.post('/signup/deliverer', userController.delivererSignup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister)

    return router;

}