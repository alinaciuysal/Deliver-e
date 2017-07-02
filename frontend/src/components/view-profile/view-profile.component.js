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

    constructor($state, $element, UserService){
        this.$element = $element;
        this.$state = $state;
        this.UserService = UserService;
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
                ctrl.user.birthDate = retrievedUser.birthDate;
                ctrl.user.address = retrievedUser.address;
                ctrl.user.phoneNumber = retrievedUser.phoneNumber;
                ctrl.user.maxWeight = retrievedUser.maxWeight;
                ctrl.user.preferredLocations = retrievedUser.preferredLocations;
                ctrl.user.preferredDistricts = retrievedUser.preferredDistricts;
            } else if (retrievedUser.type === "shop") {
                ctrl.user.shopName = retrievedUser.shopName;
                ctrl.user.shopAddress = retrievedUser.shopAddress;
                ctrl.user.phoneNumber = retrievedUser.phoneNumber;
            } else {
                console.log("Error occurred onInit profileCtrl");
            }
        });
    }

    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewProfileComponent;
