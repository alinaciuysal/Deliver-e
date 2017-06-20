
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
    constructor(){
        this.controller = ViewLoginComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewLogin';
    }

}

class ViewLoginComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.login = {};
        this.loginError = {};
    }

    submit() {
        let email = this.login.email;
        let password = this.login.password;
        var ctrl = this;

        this.UserService.login(email,password).then( function (response) {
            ctrl.UserService.$window.localStorage['jwtToken'] = response.data.token;
            ctrl.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.loginError = "Error: " + obj.data;
        });
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewLoginComponent;