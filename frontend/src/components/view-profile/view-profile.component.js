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

class ViewProfileController {

    constructor($state, $element, $rootScope, $location, $filter, UserService){
        this.$element = $element;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        this.$filter = $filter;
    }

    initializeController() {
        let ctrl = this;
        ctrl.user = {};

        ctrl.UserService.getCurrentUserDetails().then( function(response) {
            let retrievedUser = response.data;
            console.log("ViewProfileController $onInit ", retrievedUser);
            ctrl.user.email = retrievedUser.email;
            ctrl.user.type = retrievedUser.type;

            if(retrievedUser.type === "customer") {
                ctrl.user.name = retrievedUser.name;
                ctrl.user.surname = retrievedUser.surname;
                console.log("I'm a customer");
            } else if (retrievedUser.type === "deliverer") {
                ctrl.user.name = retrievedUser.name;
                ctrl.user.surname = retrievedUser.surname;
                let filteredDate = ctrl.$filter('date')(retrievedUser.birthday, "dd-MM-yyyy");
                ctrl.user.birthday = filteredDate;
                ctrl.user.address = retrievedUser.address;
                ctrl.user.phone = retrievedUser.phone;
                ctrl.user.maxWeight = retrievedUser.maxWeight;
                ctrl.user.preferredLocations = retrievedUser.preferredLocations;
                //ctrl.user.preferredDistricts = retrievedUser.preferredDistricts;
            } else if (retrievedUser.type === "shop") {
                ctrl.user.shopName = retrievedUser.name;
                ctrl.user.shopAddress = retrievedUser.address;
                ctrl.user.phone = retrievedUser.phone;
            } else {
                console.log("Error occurred onInit profileCtrl");
            }
        });
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url());
    }

    static get $inject(){
        return ['$state', '$element', '$rootScope', '$location', '$filter', UserService.name];
    }
}

export default ViewProfileComponent;
