
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

    constructor($state, UserService, OrderService, $rootScope, $location, $mdMenu){
        let ctrl = this;
        this.$state = $state;
        this.UserService = UserService;
        this.OrderService = OrderService;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$mdMenu = $mdMenu;

        //this.basket = [];
        this.$rootScope.basket = [];

        this.showBasket = false;
        this.isUserAuthenticated();

        // if(this.showBasket) {
        //     this.getUserBasket();
        // }

        this.$rootScope.$watch(
            function(){return OrderService.reload;},
            function(newVal, oldVal){
                if(newVal){
                    OrderService.reloaded();
                    OrderService.getBasket().then(basket => {
                        $rootScope.basket = basket;
                    });
                }
            }
        );

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
        let isAuthenticated = this.UserService.isAuthenticated();

        if (isAuthenticated) {
            this.UserService.getCurrentUserDetails().then((response) => {
                if (response.data.type == "customer") {
                    this.showBasket = true;
                    this.getUserBasket();
                }
            });
        } else {
            this.showBasket = false;
        }
    }

    getUserBasket() {
        this.OrderService.getBasket().then(basket => {
            //this.basket = basket;
            this.$rootScope.basket = basket;
        });
    }

    clearBasket(){
        this.OrderService.clearBasket();
    }

    removeProduct(productId, productAmount){
        this.OrderService.removeProductFromBasket(productId, productAmount);
    }

    static get $inject(){
        return ['$state', UserService.name, OrderService.name, '$rootScope', '$location', '$mdMenu'];
    }
}

export default ViewBasketComponent;