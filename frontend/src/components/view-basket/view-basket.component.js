
'use strict';

import UserService from './../../services/user/user.service';
import OrderService from './../../services/order/order.service';
import ShopService from './../../services/shop/shop.service';

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

    constructor($state, UserService, OrderService, ShopService, $rootScope, $location, $mdMenu, $mdDialog){
        let ctrl = this;
        this.$state = $state;
        this.UserService = UserService;
        this.OrderService = OrderService;
        this.ShopService = ShopService;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$mdMenu = $mdMenu;
        this.$mdDialog = $mdDialog;
        this.$rootScope.basket = [];

        this.showBasket = false;
        this.isUserAuthenticated();


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
            // if incoming arg is false, then it means that basket should not be shown
            if (!arg) {
                ctrl.showBasket = arg;
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
        let ctrl = this;
        if (isAuthenticated) {
            this.UserService.getCurrentUserDetails().then((response) => {
                if (response.data.type === "customer" && ctrl.$state.current.name !== "profile") {
                    this.showBasket = true;
                    this.getUserBasket();
                }
            }).catch(function(err) {
                console.log(err);
                return false;
            });
        } else {
            this.showBasket = false;
        }
    }

    getUserBasket() {
        let ctrl = this;
        this.OrderService.getBasket().then(basket => {
            ctrl.$rootScope.basket = basket;
        });
    }

    clearBasket(){
        this.OrderService.clearBasket();
    }

    showConfirm() {
        let ctrl = this;
        // Appending dialog to document.body to cover sidenav in docs app
        let confirm = ctrl.$mdDialog.confirm()
            .title('Would you like to delete all items in your basket?')
            .ok('Confirm')
            .cancel('Return back');

        ctrl.$mdDialog.show(confirm).then(function() {
            ctrl.clearBasket();
        }, function() {
            // do nothing here
        });
    }

    removeProduct(productId, productAmount){

        let ctrl = this;
        this.OrderService.removeProductFromBasket(productId, productAmount).then(function(response){
            if(response.data) {
                ctrl.getUserBasket();
            }
        });
    }

    static get $inject(){
        return ['$state', UserService.name, OrderService.name, ShopService.name, '$rootScope', '$location', '$mdMenu', '$mdDialog'];
    }

    goPaymentPage() {
        let ctrl = this;
        ctrl.$state.go('payment',{});
    }
}

export default ViewBasketComponent;