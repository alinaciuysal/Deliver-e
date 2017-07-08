
'use strict';

import template from './view-mainpage.template.html';
import UserService from './../../services/user/user.service';

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

    constructor($state, $rootScope, $location, UserService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;

        this.dataArray = [
            {  src: 'http://lorempixel.com/960/300/food/1'  },
            {  src: 'http://lorempixel.com/960/300/food/2'  },
            {  src: 'http://lorempixel.com/960/300/food/4'  },
            {  src: 'http://lorempixel.com/960/300/food/5'  },
            {  src: 'http://lorempixel.com/960/300/food/6'  }
            // {  src: 'img/imgTest.png'  }
        ];
        this.currentIndex = 0;

        this.products = [
            {  name: "Product1", id: "0001", src: 'img/asian/asian1.jpg', desc:"description" },
            {  name: "Product2", id: "0002", src: 'img/asian/asian2.jpg', desc:"description"  },
            {  name: "Product3", id: "0003", src: 'img/asian/asian1.jpg', desc:"description"  },
            {  name: "Product4", id: "0004", src: 'img/asian/asian2.jpg', desc:"description"  },
            {  name: "Product5", id: "0005", src: 'img/asian/asian1.jpg', desc:"description"  },
            {  name: "Product6", id: "0006", src: 'img/asian/asian2.jpg', desc:"description"  }
        ];

        this.numCol = this.products.length/4;
        if(this.products.length%4!=0) this.numCol++;

    }

    search() {
        //Search func
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url());
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name];
    }
}

export default ViewMainPageComponent;