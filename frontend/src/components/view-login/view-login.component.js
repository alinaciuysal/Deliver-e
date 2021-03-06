
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

        let noBasket = this.$state.params.basketIsNotShown;
        this.$rootScope.$emit("mainPage-changed", noBasket);

        if(this.loginError !== undefined)
            this.loginError = undefined;
    }

    submit() {
        let email = this.login.email;
        let password = this.login.password;
        var ctrl = this;

        this.UserService.login(email,password).then( function (response) {
            ctrl.UserService.getCurrentUserDetails().then( function(resp) {
                ctrl.user = resp.data;
                ctrl.$rootScope.$emit("navbar-changed", {});

                if (ctrl.user.type === "customer") {
                    ctrl.$state.go('mainPage',{});

                    let noBasket = false; // means that basket should be shown only to the user after login
                    ctrl.$rootScope.$emit("mainPage-changed", noBasket);
                }
                else if (ctrl.user.type === "deliverer")
                    ctrl.$state.go('delivererHomePage', {});
                else if (ctrl.user.type === "shop")
                    ctrl.$state.go('shopHomePage', {});
            }).catch(function (err) {
                console.log("login component err ", err);
            });

        }).catch(function(obj){
            ctrl.loginError = "Error: " + obj.data;
        });
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name];
    }
}

export default ViewLoginComponent;