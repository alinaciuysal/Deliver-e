
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
    constructor($state, $rootScope, $location, UserService){
        this.$state = $state;
        this.UserService = UserService;
        this.$rootScope = $rootScope;
        this.$location = $location;
    }

    $onInit() {
        this.login = {};
        this.loginError = {};
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));

        if(this.loginError !== undefined)
            this.loginError = undefined;
    }

    submit() {
        let email = this.login.email;
        let password = this.login.password;
        var ctrl = this;

        this.UserService.login(email,password).then( function (response) {
            
            ctrl.UserService.getCurrentUserDetails().then( function(response) {
                ctrl.user = response.data;
                console.log("UserService getCurrentUserDetails ", ctrl.user);
            });
            ctrl.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.loginError = "Error: " + obj.data;
        });
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name];
    }
}

export default ViewLoginComponent;