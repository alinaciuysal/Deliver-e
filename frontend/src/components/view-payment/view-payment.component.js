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

        ctrl.$rootScope.$emit("mainPage-changed", false);
        ctrl.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
        console.log(ctrl.$rootScope);
    }

    getUserBasket() {
        let ctrl = this;
        ctrl.OrderService.getBasket().then(basket => {
            ctrl.basket = basket;
        });
    }

    static get $inject(){
        return ['$rootScope', '$state', '$element', '$location', UserService.name, OrderService.name];
    }
}

export default ViewPaymentComponent;
