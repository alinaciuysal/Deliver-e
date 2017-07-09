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
                districts: ["Ludwigsvorstadt-Isarvorstadt", "Schwabing-West", "Am-Hart", "Schwanthalerhöhe", "Sendling", "Am Laim"]
            }, {
                name: 'Berlin',
                districts: ["Mitte", "Kreuzberg", "Schönerberg"]
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

        console.log(location + " " + district);

        this.UserService.register(name, surname, email, password, address, location, district).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            console.log(obj);
            ctrl.userRegistrationError = "Error: " + obj.data;
        });
    }

    submitDelivererRegistrationRequest() {
        let ctrl = this;
        let name = ctrl.delivererRegister.name;
        let password = ctrl.delivererRegister.password;
        let surname = ctrl.delivererRegister.surname;
        let email = ctrl.delivererRegister.email;
        let birthday = ctrl.delivererRegister.birthday;
        let phone = ctrl.delivererRegister.phoneNumber;
        let maxWeight = ctrl.delivererRegister.maxWeight;
        let address = ctrl.delivererRegister.address;
        let selectedDistricts = ctrl.delivererRegister.selectedDistricts;
        let selectedLocation = ctrl.delivererRegister.selectedLocation.name;
        let date = new Date(birthday);

        this.UserService.registerDeliverer(email, password, name, surname, birthday, phone, address, maxWeight, selectedLocation, selectedDistricts).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            console.log(obj);
            ctrl.delivererRegistrationError = "Error: " + obj;
        });
    }

    submitShopRegistrationRequest() {
        let ctrl = this;

        let email = ctrl.shopRegister.email;
        let password = ctrl.shopRegister.password;
        let name = ctrl.shopRegister.shopName;
        let shopAddress = ctrl.shopRegister.shopAddress;
        let shopPhoneNumber = ctrl.shopRegister.shopPhoneNumber;

        console.log(email + " " + password + " " + name + " " + shopAddress + " " + shopPhoneNumber);

        this.UserService.registerShop(email, password, name, shopAddress, shopPhoneNumber).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            console.log(obj);
            ctrl.shopRegistrationError = "Error: " + obj.data;
        });
    }

    resetShopRegistrationForm() {
        let ctrl = this;
        let form = ctrl.ShopRegisterForm;
        form.email = '';
        form.password = '';
        form.shopName = '';
        form.shopAddress = '';
        form.shopPhoneNumber = '';

        // Set back to pristine.
        ctrl.ShopRegisterForm.$setPristine();
        // Since Angular 1.3, set back to untouched state.
        ctrl.ShopRegisterForm.$setUntouched();
    }

    resetDelivererRegistrationForm() {
        let ctrl = this;
        let form = ctrl.delivererRegister;
        form.name = '';
        form.password = '';
        form.surname = '';
        form.email = '';
        form.birthday = '';
        form.phoneNumber = '';
        form.maxWeight = '';
        form.address = '';
        form.selectedDistricts = '';

        // Set back to pristine.
        ctrl.delivererRegister.$setPristine();
        // Since Angular 1.3, set back to untouched state.
        ctrl.delivererRegister.$setUntouched();
    }

    resetUserRegistrationForm() {
        let ctrl = this;
        let form = ctrl.userRegister;
        form.name = '';
        form.password = '';
        form.email = '';
        form.password = '';
    }

    userSelectedLocationChanged(val) {
        var ctrl = this;
        if (val && val.length > 1) {
            ctrl.userRegister.selectedDistrict = ctrl.userRegister.prevModel;
        } else {
            ctrl.userRegister.prevModel = val;
        }
    }


    static get $inject(){
        return ['$state', '$element', '$rootScope', '$location', UserService.name];
    }
}

export default ViewRegisterComponent;
