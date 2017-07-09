
'use strict';

import template from './view-shops-list.template.html';
import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';

class ViewShopsListComponent {
    constructor(){
        this.controller = ViewShopsListController;
        this.template = template;
    }

    static get name() {
        return 'viewShopsList';
    }
}

class ViewShopsListController {

    constructor($state, UserService, ShopService, $rootScope, $location, $stateParams){
        this.$state = $state;
        this.UserService = UserService;
        this.ShopService = ShopService;
        this.$rootScope = $rootScope;
        this.$location = $location;

        this.type = this.$state.params.type;

        this.name = "";
        this.shopsList = [];
        this.numCol = 0;

        /// GET SHOPS LIST
        this.getShops();

        if(this.type == 'asian') {
            this.name = "Asian Shops";
        }
        else if(this.type == 'getranke') {
            this.name = "Getrankemarkts"
        }
        else if(this.type == 'turkish') {
            this.name = "Turkish Shops"
        }
        else if(this.type == 'russian') {
            this.name = "Russian Shops"
        }
    }

    getShops() {
        this.ShopService.getShop().then(value => {
            this.shopsList = value;
            //this.name = "Asian Shops";
            // this.shopsList = [
            //     {  name: "AsianShop1", _id:"5960ebf5311f94032157c04c", address:"description" },
            // ];s

            this.numCol = this.shopsList.length/2;
            if(this.shopsList.length%2!=0) this.numCol++;
        });
    }

    $onInit() {
        var array = [];
        var wholeURL = this.$location.url().toString();
        var smallURLs = wholeURL.split("/");

        for(var i = 0; i < smallURLs.length; i++) {
            if(smallURLs[i].length != 0) {
                array.push(smallURLs[i]);
            }
        }
        this.$rootScope.$emit("menu-changed", array);
    }

    static get $inject(){
        return ['$state', UserService.name, ShopService.name, '$rootScope', '$location', '$stateParams', '$http'];
    }
}

export default ViewShopsListComponent;