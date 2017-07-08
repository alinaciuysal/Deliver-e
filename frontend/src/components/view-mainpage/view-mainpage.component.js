
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

        this.productsList = [];
        this.numCol = 0;

        this.photo = 'img/asian/asian1.jpg';
        this.getProductsList();
    }

    getProductsList() {
        // this.ShopService.getProductsList().then(value => {
        //     this.productsList = value;
        //
        //     this.numCol = this.productsList.length/4;
        //     if(this.productsList.length%4!=0) this.numCol++;
        // });

        this.productsList = [
            {"_id":"59610d87311f94032157c04d", "name":"Product Name", "price":13, "category":"axe", "weight":14, "stock":5, "details":"Product details", "photo":"", "__v":0}
        ];
        this.numCol = this.productsList.length/4;
        if(this.productsList.length%4!=0) this.numCol++;
    }

    search() {
        //Search func
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url());
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name, ShopService.name];
    }
}

export default ViewMainPageComponent;