
'use strict';

import template from './view-mainpage.template.html';
import UserService from './../../services/user/user.service';
import MainPageService from './../../services/main/main.service';

class ViewMainPageComponent {
    constructor(){
        this.controller = ViewMainPageComponentController;
        this.template = template;
        this.bindings = {
            arrayData: '<',
        }
    }

    static get name() {
        return 'viewMainPage';
    }
}

class ViewMainPageComponentController{
    constructor($state, UserService){
        this.$state = $state;
        this.UserService = UserService;

        this.arrayData = [
            { src: 'assets/food.png' },
            { src: 'image2.png' },
            { src: 'image3.png' },
            { src: 'image4.png' }
        ];

    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewMainPageComponent;