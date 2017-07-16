/**
 * Created by Melih Berçin on 6/17/2017.
 */
'use strict';

import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';

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
    constructor($state, $rootScope, $location, UserService, ShopService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        this.ShopService = ShopService;
        angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    }

    $onInit() {
        let ctrl = this;
        this.register = {};
        ctrl.availableOrders3 = {};
        ctrl.showTabs = false;
        ctrl.currentShop = "asdasd";
        this.availableOrders2 = this.UserService.getAvailableOrders().then(function(response){
            ctrl.availableOrders3 = response.data;
            if(ctrl.availableOrders3.length !== 0)
                ctrl.showTabs = true;
        });

        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    rejectOrder(orderNo){
        this.UserService.rejectOrder(orderNo).then(function(response){
            console.log(response.data);
            console.log("Rejected");
            location.reload();
        });
    }

    acceptOrder(orderNo){
        this.UserService.acceptOrder(orderNo).then(function(response){
            console.log(response.data);
            console.log("Accepted");
            location.reload();
        });
    }

    getShopName(shopId){
        this.ShopService.getShopById(shopId).then(function(response){
            ctrl.currentShop = response.data.name;
        });
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name, ShopService.name];
    }
}

export default ViewAvailableOrdersComponent;
