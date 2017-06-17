
'use strict';

import template from './view-mainpage.template.html';
import UserService from './../../services/user/user.service';
import MainPageService from './../../services/main/main.service';

import './view-mainpage.style.css'


class ViewMainPageComponent {
    constructor(){
        this.controller = ViewMainPageComponentController;
        this.template = template;
        bindings: {
            dataArray: '='
        }
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
            {  src: 'http://lorempixel.com/400/200/food/1'  },
            {  src: 'http://lorempixel.com/400/200/food/2'  },
            {  src: 'http://lorempixel.com/400/200/food/3'  },
            {  src: 'http://lorempixel.com/400/200/food/4'  },
            {  src: 'http://lorempixel.com/400/200/food/5'  },
            {  src: 'http://lorempixel.com/400/200/food/6'  },
            {  src: 'http://lorempixel.com/400/200/food/7'  },
        ];
    }

    $onInit() {
        console.log("ViewMainPageComponentController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewMainPageComponent;