/**
 * Created by Melih Berçin on 7/15/2017.
 */
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-payment.template.html';
import './view-payment.style.css';
import OrderService from './../../services/order/order.service';

class ViewPaymentComponent {
    constructor(){
        this.controller = ViewPaymentComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewPayment';
    }
}

class ViewPaymentComponentController{
    constructor($rootScope, $state, $element, $location, UserService, OrderService){
        this.$rootScope = $rootScope;
        this.$element = $element;
        this.$state = $state;
        this.$location = $location;
        this.UserService = UserService;
        this.OrderService = OrderService;
    }

    $onInit() {
        let ctrl = this;
        ctrl.basket = ctrl.getUserBasket();
        console.log(ctrl.basket);
        ctrl.$rootScope.$emit("mainPage-changed", false);
        ctrl.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
        console.log(ctrl.$rootScope);
        this.UserService.getCurrentUserDetails().then(function(response){
            ctrl.user = response.data;
            ctrl.newAddress = ctrl.user.address + " - " + ctrl.user.location;
        });
        ctrl.deliveryTime = 3;
    }

    getUserBasket() {
        let ctrl = this;
        ctrl.OrderService.getBasket().then(basket => {
            ctrl.basket = basket;
        });
    }

    confirmPayment(id){
        let ctrl = this;
        let newTime = 60 * ctrl.deliveryTime;
        this.OrderService.makeOrder(newTime).then(()=> {
            this.OrderService.clearBasket().then(()=> {
                console.log("Payment Confirmed and Basket Cleared");
                this.$state.go('mainPage',{});
            }).catch(function(obj){
                ctrl.clearBasketError = "Error: " + obj.data;
            });
        }).catch(function(obj){
            ctrl.makeOrderError = "Error: " + obj.data;
        });
    }

    cancelPayment(id){
        console.log("Payment Rejected and User Redirected to Main Page");
        this.$state.go('mainPage',{});
    }


    static get $inject(){
        return ['$rootScope', '$state', '$element', '$location', UserService.name, OrderService.name];
    }
}

export default ViewPaymentComponent;
