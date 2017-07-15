
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

        if(this.type == 'asian') {
            this.name = "Asian Shops";
            this.getShopsListByType('asian');
        }
        else if(this.type == 'getrankemarkt') {
            this.name = "Getrankemarkts"
            this.getShopsListByType('getrankemarkt');
        }
        else if(this.type == 'turkish') {
            this.name = "Turkish Shops"
            this.getShopsListByType('turkish');
        }
        else if(this.type == 'russian') {
            this.name = "Russian Shops"
            this.getShopsListByType('russian');
        }
    }

    getShopsListByType(type) {
        this.ShopService.getShopsListByType(type).then(value => {
            this.shopsList = value;

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