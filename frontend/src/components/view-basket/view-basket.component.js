
'use strict';

import UserService from './../../services/user/user.service';
import OrderService from './../../services/order/order.service';

import template from './view-basket.template.html';
import './view-basket.style.css';

class ViewBasketComponent {
    constructor(){
        this.controller = ViewBasketComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewBasket';
    }
}

class ViewBasketComponentController{
    constructor($state, UserService, OrderService, $rootScope, $location){
        let ctrl = this;
        this.$state = $state;
        this.UserService = UserService;
        this.OrderService = OrderService;
        this.$rootScope = $rootScope;
        this.$location = $location;

        this.basket = [];
        this.getUserBasket();


        this.$rootScope.$on("mainPage-changed", function(evt, arg) {
            console.log("emit arg ", arg);

            // if incoming arg is false, then it means that basket should not be shown
            if (!arg) {
                ctrl.showBasket = arg;
                console.log("ctrl showBasket updated to ", ctrl.showBasket);
            } else {
                ctrl.isUserAuthenticated();
            }

        });
    }

    $onInit() {
        let ctrl = this;
        ctrl.showBasket = false;
        this.isUserAuthenticated();
        //ctrl.basket = ctrl.getUserBasket();
    }

    isUserAuthenticated() {
        let ctrl = this;
        let isAuthenticated = ctrl.UserService.isAuthenticated();
        ctrl.showBasket = null;
        if (isAuthenticated) {
            ctrl.UserService.getCurrentUserDetails().then(function (response) {
                if (response.data.type == "customer") {
                    ctrl.showBasket = true;
                }
            });
        } else {
            ctrl.showBasket = false;
        }
    }

    getUserBasket() {
        this.OrderService.getBasket().then(basket => {
            this.basket = basket;
            console.log(basket);
        });

        // let basket = {
        //     "_id": "5969214bfd9c8616bc3c95f8",
        //     "status": "Basket",
        //     "orderer": "5969214afd9c8616bc3c95f7",
        //     "__v": 2,
        //     "items": [
        //         {
        //             "product": {
        //                 "_id": "596922a0fd9c8616bc3c95f9",
        //                 "name": "Small Water",
        //                 "price": 2,
        //                 "category": "Liquid",
        //                 "weight": 1,
        //                 "stock": 100,
        //                 "__v": 0
        //             },
        //             "_id": "596922eafd9c8616bc3c95e0",
        //             "amount": 1
        //         },
        //         {
        //             "product": {
        //                 "_id": "5969235dfd9c8616bc3c95fb",
        //                 "name": "Large Water",
        //                 "price": 3,
        //                 "category": "Liquid",
        //                 "weight": 1,
        //                 "stock": 50,
        //                 "__v": 0
        //             },
        //             "_id": "59692386fd9c8616bc3c95fc",
        //             "amount": 1
        //         }
        //     ],
        //     "totalWeight": 2,
        //     "totalPrice": 5
        // };
    }

    clearBasket(){
        this.OrderService.clearBasket();
    }

    static get $inject(){
        return ['$state', UserService.name, OrderService.name, '$rootScope', '$location'];
    }
}

export default ViewBasketComponent;