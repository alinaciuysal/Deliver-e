'use strict';

import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';

import template from './view-myorders.template.html';
import './view-myorders.style.css';

class ViewMyOrdersComponent {
    constructor(){
        this.controller = ViewMyOrdersComponentController;
        this.template = template;
        angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    }

    static get name() {
        return 'viewMyOrders';
    }

}

class ViewMyOrdersComponentController{
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
        this.availableOrders2 = this.UserService.getMyOrders().then(function(response){
            ctrl.availableOrders3 = response.data;
            if(ctrl.availableOrders3.length !== 0)
                ctrl.showTabs = true;
        });

        let showBasket = this.$state.params.showBasket;
        this.$rootScope.$emit("mainPage-changed", showBasket);

        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
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

export default ViewMyOrdersComponent;
