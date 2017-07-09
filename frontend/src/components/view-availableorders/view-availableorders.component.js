/**
 * Created by Melih Berçin on 6/17/2017.
 */
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-availableorders.template.html';
import './view-availableorders.style.css';

class ViewAvailableOrdersComponent {
    constructor(){
        this.controller = ViewAvailableOrdersComponentController;
        this.template = template;
        angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    }

    static get name() {
        return 'viewAvailableOrders';
    }

}

class ViewAvailableOrdersComponentController{
    constructor($state, $rootScope, $location, UserService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    }

    $onInit() {
        console.log("asdasdasd");
        this.register = {};
        let availableOrders = [
            {
                id: "Order 234",
                totalPrice: 59.99,
                status: "Pending",
                items: [{
                    amount: 2,
                    product: 44
                },{
                    amount: 4,
                    product: 88
                }],
                orderer: 12,
                deliverer: 13
            }, {
                id: "Order 235",
                totalPrice: 69.99,
                status: "Pending",
                items: [{
                    amount: 20,
                    product: 400
                },{
                    amount: 30,
                    product: 900
                }],
                orderer: 100,
                deliverer: 101
            }
        ];
        this.availableOrders = availableOrders;


        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    rejectOrder(orderNo){
        // TODO: API calls
    }

    acceptOrder(orderNo){
        // TODO: API calls
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name];
    }
}

export default ViewAvailableOrdersComponent;
