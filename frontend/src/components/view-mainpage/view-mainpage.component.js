
'use strict';

import template from './view-mainpage.template.html';
import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';

import './view-mainpage.style.css'


class ViewMainPageComponent {
    constructor(){
        this.controller = ViewMainPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewMainPage';
    }
}

class ViewMainPageComponentController {

    constructor($state, $rootScope, $location, UserService, ShopService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        this.ShopService = ShopService;

        this.dataArray = [
            {  src: 'http://lorempixel.com/960/300/food/1'  },
            {  src: 'http://lorempixel.com/960/300/food/2'  },
            {  src: 'http://lorempixel.com/960/300/food/4'  },
            {  src: 'http://lorempixel.com/960/300/food/5'  },
            {  src: 'http://lorempixel.com/960/300/food/6'  }
            // {  src: 'img/imgTest.png'  }
        ];
        this.currentIndex = 0;

        //this.productsList = [];
        this.shopsList = [];
        this.numCol = 0;

        //this.photo = 'img/asian/asian1.jpg';
        //this.getProductsList();
        this.search("test");
        this.getShopsList();
    }

    getShopsList() {
        this.ShopService.getShopsList().then(value => {
            this.shopsList = value;

            this.numCol = this.shopsList.length/2;
            if(this.shopsList.length%2!=0) this.numCol++;
        });
    }

    // getProductsList() {
    //     this.ShopService.getProductsList().then(value => {
    //         this.productsList = value;
    //
    //         this.numCol = this.productsList.length/4;
    //         if(this.productsList.length%4!=0) this.numCol++;
    //     });
    // }

    search(name) {
        this.ShopService.searchProductsInShop(name).then(value => {
            console.log(value);
            console.log(this);

        });
    }

    $onInit() {
        var ctrl = this;
        ctrl.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }



    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name, ShopService.name];
    }
}

export default ViewMainPageComponent;