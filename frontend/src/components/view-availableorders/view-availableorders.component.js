/**
 * Created by Melih Berçin on 6/17/2017.
 */
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-availableorders.template.html';
import './view-availableorders.style.css';

class ViewAvailableOrdersComponent {
    constructor(){
        this.controller = ViewAvailableOrdersComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewAvailableOrders';
    }

}

class ViewAvailableOrdersComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.register = {};
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewAvailableOrdersComponent;
