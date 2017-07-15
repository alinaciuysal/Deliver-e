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
        let ctrl = this;
        this.register = {};
        ctrl.availableOrders3 = {};
        this.availableOrders2 = this.UserService.getAvailableOrders().then(function(response){
            console.log(response.data);
            ctrl.availableOrders3 = response.data;
        });

        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    rejectOrder(orderNo){
        // TODO: API calls
    }

    acceptOrder(orderNo){
        console.log(orderNo);
        this.UserService.acceptOrder(orderNo).then(function(response){
            console.log(response.data);
            console.log("Accepted");
            location.reload();
        });
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name];
    }
}

export default ViewAvailableOrdersComponent;
