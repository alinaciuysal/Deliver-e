
'use strict';

import template from './view-mainpage.template.html';
import UserService from './../../services/user/user.service';
import MainPageService from './../../services/main/main.service';

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

    constructor($state, UserService){
        this.$state = $state;
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
            {  name: "Product1", src: 'img/asian/asian1.jpg', desc:"hhhhh" },
            {  name: "Product2", src: 'img/asian/asian2.jpg', desc:"hhhhh"  },
            {  name: "Product3", src: 'img/asian/asian1.jpg', desc:"hhhhh"  },
            {  name: "Product4", src: 'img/asian/asian2.jpg', desc:"hhhhh"  },
            {  name: "Product5", src: 'img/asian/asian1.jpg', desc:"hhhhh"  },
            {  name: "Product6", src: 'img/asian/asian2.jpg', desc:"hhhhh"  }
        ]

        this.numCol = this.products.length/4;
        if(this.products.length%4!=0) this.numCol++;

    }

    $onInit() {
        console.log("ViewMainPageComponentController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewMainPageComponent;