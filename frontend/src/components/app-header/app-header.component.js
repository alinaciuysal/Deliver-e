
'use strict';

import UserService from './../../services/user/user.service';

import template from './app-header.template.html';

import './app-header.style.css';

class AppHeaderComponent {
    constructor(){
        this.controller = AppHeaderComponentController;
        this.template = template;
    }

    static get name() {
        return 'appHeader';
    }
}

class AppHeaderComponentController {

    constructor($rootScope, $state, UserService){
        let ctrl = this;
        this.$state = $state;
        this.UserService = UserService;

        this.$rootScope = $rootScope;
        ctrl.$rootScope.$on("navbar-changed", function(evt, arg) {
            ctrl.$onInit();
        });
    }

    $onInit() {
        let ctrl = this;

        if(ctrl.isAuthenticated()) {
            ctrl.UserService.getCurrentUserDetails().then(function(response) {
                ctrl.initialUser = response.data;
                let userType = ctrl.initialUser.type;
                if (userType === "customer") {
                    ctrl.userRedirectMsg = "My Orders";
                } else if (userType === "deliverer") {
                    ctrl.userRedirectMsg = "Available Orders";
                    ctrl.delivererRedirectMsg = "My Orders";
                } else if (userType === "shop") {
                    ctrl.userRedirectMsg = "Add Product";
                }
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    openMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    goToMainPage() {
        let ctrl = this;
        if(ctrl.initialUser !== null) {
            let userType = ctrl.initialUser.type;
            if(userType !== null) {
                if (userType === "customer") {
                    ctrl.$state.go('myOrders',{});
                } else if (userType === "deliverer") {
                    ctrl.$state.go('delivererHomePage',{});
                } else if (userType === "shop") {
                    ctrl.$state.go('shopHomePage',{});
                }
            }
        }
    }

    goToAcceptedOrdersPage() {
        let ctrl = this;
        if(ctrl.initialUser !== null) {
            let userType = ctrl.initialUser.type;
            if(userType !== null) {
                if (userType === "deliverer") {
                    ctrl.$state.go('acceptedOrders',{});
                }
            }
        }
    }

    isAuthenticatedDeliverer() {
        let ctrl = this;
        if(ctrl.isAuthenticated()) {
            ctrl.UserService.getCurrentUserDetails().then(function(response) {
                let user = response.data;
                let userType = user.type;
                if (userType === "deliverer") {
                    return true;
                } else {
                    return false;
                }
            }).catch(function(err){
                console.log(err);
                return false;
            });
        } else {
            return false;
        }
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    getCurrentUser(){
        let user = this.UserService.getCurrentUser();
        return user.email;
    }

    getCurrentUserName(){
        let user = this.UserService.getCurrentUser();
        return user.name;
    }

    goHome(){
        this.$state.go('mainPage',{});
    }

    login() {
        this.$state.go('login',{});
    }

    register(){
        this.$state.go('register',{});
    }

    logout(){
        this.UserService.logout();
        this.$state.go('mainPage',{});
    }

    goToProfilePage() {
        this.$state.go('profile',{});
    }

    static get $inject(){
        return ['$rootScope', '$state', UserService.name];
    }
}

export default AppHeaderComponent;