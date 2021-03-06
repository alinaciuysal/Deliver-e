/**
 * Created by Ali Naci Uysal on 6/13/2017.
 */

'use strict';

import UserService from './../../services/user/user.service';

import template from './view-register.template.html';
import './view-register.style.css';

class ViewRegisterComponent {
    constructor(){
        this.controller = ViewRegisterComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewRegister';
    }

}

class ViewRegisterComponentController{
    constructor($state, $element, $rootScope, $location, UserService){
        this.$element = $element;
        this.$state = $state;
        this.UserService = UserService;
        this.$rootScope = $rootScope;
        this.$location = $location;
    }

    $onInit() {
        let ctrl = this;
        ctrl.register = {};

        // retrieve these from API
        let availableLocations = [
            {
                name: 'Munich',
                districts: ["Am Hart",
                    "Am Laim",
                    "Bogenhausen",
                    "Garching",
                    "Lehel",
                    "Ludwigsvorstadt-Isarvorstadt",
                    "Neuhausen",
                    "Perlach",
                    "Schwabing-West",
                    "Schwanthalerhöhe",
                    "Sendling",
                    "Solln",
                    "Westend"]
            }, {
                name: 'Berlin',
                districts: ["Charlottenburg-Wilmersdorf",
                    "Friedrichshain-Kreuzberg",
                    "Lichtenberg",
                    "Marzahn-Hellersdorf",
                    "Mitte",
                    "Neukölln",
                    "Pankow",
                    "Reinickendorf",
                    "Spandau",
                    "Steglitz-Zehlendorf",
                    "Tempelhof-Schöneberg",
                    "Treptow-Köpenick"]
            }
        ];
        ctrl.availableLocations = availableLocations;
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));

    }

   /* resetDistricts() {
        let ctrl = this;
        // reset if there are previously-selected districts on UI
        if(ctrl.hasOwnProperty("delivererRegister")) {
            if(ctrl.delivererRegister.hasOwnProperty("selectedDistricts")) {
                ctrl.delivererRegister.selectedDistricts = null;
            }
        }
    }*/

    submitUserRegistrationRequest(){
        let ctrl = this;
        let name = ctrl.userRegister.name;
        let surname = ctrl.userRegister.surname;
        let email = ctrl.userRegister.email;
        let password = ctrl.userRegister.password;
        let address = ctrl.userRegister.address;
        let location = ctrl.userRegister.selectedLocationUser.name;
        let district = ctrl.userRegister.selectedDistrict;

        this.UserService.register(name, surname, email, password, address, location, district).then(()=> {
            alert("Registration is successful");
            this.$state.go('mainPage',{});
            this.$rootScope.$emit("navbar-changed", {});
        }).catch(function(obj){
            ctrl.userRegistrationError = "Error: " + obj.data;
        });
    }

    submitDelivererRegistrationRequest() {
        let ctrl = this;
        let name = ctrl.delivererRegister.name;
        let password = ctrl.delivererRegister.password;
        let surname = ctrl.delivererRegister.surname;
        let email = ctrl.delivererRegister.email;
        let phone = ctrl.delivererRegister.phoneNumber;
        let maxWeight = ctrl.delivererRegister.maxWeight;
        let address = ctrl.delivererRegister.address;
        let selectedDistricts = ctrl.delivererRegister.selectedDistricts;
        let selectedLocation = ctrl.delivererRegister.selectedLocation.name;
        let date = new Date(ctrl.delivererRegister.birthday);

        this.UserService.registerDeliverer(email, password, name, surname, date, phone, address, maxWeight, selectedLocation, selectedDistricts).then(()=> {
            alert("Registration is successful");
            this.$state.go('delivererHomePage',{});
            this.$rootScope.$emit("navbar-changed", {});
        }).catch(function(obj){
            ctrl.delivererRegistrationError = "Error: " + obj;
        });
    }

    submitShopRegistrationRequest() {
        let ctrl = this;

        let email = ctrl.shopRegister.email;
        let password = ctrl.shopRegister.password;
        let name = ctrl.shopRegister.shopName;
        let type = ctrl.shopRegister.category;
        let shopAddress = ctrl.shopRegister.shopAddress;
        let shopPhoneNumber = ctrl.shopRegister.shopPhoneNumber;


        ctrl.UserService.registerShop(email, password, name, type, shopAddress, shopPhoneNumber).then(()=> {
            alert("Registration is successful");
            this.$state.go('shopHomePage',{});
            this.$rootScope.$emit("navbar-changed", {});
        }).catch(function(obj){
            ctrl.shopRegistrationError = "Error: " + obj.statusText;
        });
    }

    static get $inject(){
        return ['$state', '$element', '$rootScope', '$location', UserService.name];
    }
}

export default ViewRegisterComponent;
