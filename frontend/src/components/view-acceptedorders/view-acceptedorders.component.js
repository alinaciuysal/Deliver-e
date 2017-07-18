'use strict';

import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';

import template from './view-acceptedorders.template.html';
import './view-acceptedorders.style.css';

class ViewAcceptedOrdersComponent {
    constructor(){
        this.controller = ViewAcceptedOrdersComponentController;
        this.template = template;
        angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
    }

    static get name() {
        return 'viewAcceptedOrders';
    }

}

class ViewAcceptedOrdersComponentController{
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
        this.availableOrders2 = this.UserService.getAcceptedOrders().then(function(response){
            ctrl.availableOrders3 = response.data;
            if(ctrl.availableOrders3.length !== 0)
                ctrl.showTabs = true;
        });

        let showBasket = this.$state.params.showBasket;
        this.$rootScope.$emit("mainPage-changed", showBasket);

        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    doneOrder(orderNo) {
        this.UserService.doneOrder(orderNo).then(function(response){
            console.log("Done");
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

export default ViewAcceptedOrdersComponent;
