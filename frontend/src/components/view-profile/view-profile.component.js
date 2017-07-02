/**
 * Created by Melih Berçin on 7/2/2017.
 */

'use strict';

import UserService from './../../services/user/user.service';

import template from './view-profile.template.html';
import './view-profile.style.css';

class ViewProfileComponent {
    constructor(){
        this.controller = ViewProfileController;
        this.template = template;
    }

    static get name() {
        return 'viewProfile';
    }
}

class ViewProfileController{
    constructor($state, $element, UserService){
        this.$element = $element;
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        let ctrl = this;
        ctrl.user = {};
        ctrl.user.name = "Test";
        ctrl.user.surname = "Test";
        ctrl.user.email = "test@gmail.com";
        ctrl.user.birthDate = new Date("23.04.1990");
        ctrl.user.address = "Schellingstr. 18";
        ctrl.user.phoneNumber = "+4917612349988";
        ctrl.user.maxWeight = 29.99;
    }


    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewProfileComponent;
