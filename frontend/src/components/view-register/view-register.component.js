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
    constructor($state, $element, UserService){
        this.$element = $element;
        this.$state = $state;
        this.UserService = UserService;
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
    }

    resetDistricts() {
        let ctrl = this;
        ctrl.delivererRegister.selectedDistricts = null;
    }

    submitUserRegistrationRequest(){
        let ctrl = this;

        let email = this.userRegister.email;
        let password = this.userRegister.password;

        this.UserService.register(email, password).then(()=> {
/*
            this.resetUserRegistrationForm();
*/
            this.$state.go('mainPage',{});
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
        let birthday = ctrl.delivererRegister.birthday;
        let phone = ctrl.delivererRegister.phoneNumber;
        let maxWeight = ctrl.delivererRegister.maxWeight;
        let address = ctrl.delivererRegister.address;
        let selectedDistricts = ctrl.delivererRegister.selectedDistricts;


        // Ref: https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
        let date = new Date(birthday);
/*
        console.log("date: " + date);
*/

        /*var month = new Date(timestamp).getMonth() + 1;
        var year = new Date(timestamp).getFullYear();
        var original_date =  date + '-' + month+ '-' + year;
        console.log(original_date);*/
        // https://stackoverflow.com/questions/43277458/how-to-specify-timestamp-format-when-converting-to-human-readable-string-in-js
        // https://momentjs.com/

        console.log(name + " " + password + " " + surname + " " + email + " " + date + " " + phone + " " + address + " " + maxWeight + " " + selectedDistricts);

        this.UserService.registerDeliverer(email, password, name, surname, birthday, phone, address, maxWeight, selectedDistricts).then(()=> {
/*
            this.resetDelivererRegistrationForm();
*/
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.delivererRegistrationError = "Error: " + obj.data;
        });
    }

    submitShopRegistrationRequest() {
        let ctrl = this;

        let email = ctrl.shopRegister.email;
        let password = ctrl.shopRegister.password;

        let shopName = ctrl.shopRegister.shopName;
        let shopAddress = ctrl.shopRegister.shopAddress;
        let shopPhoneNumber = ctrl.shopRegister.shopPhoneNumber;

        console.log(email + " " + password + " " + shopName + " " + shopAddress + " " + shopPhoneNumber);

        this.UserService.registerShop(email, password, shopName, shopAddress, shopPhoneNumber).then(()=> {
/*
            this.resetShopRegistrationForm();
*/
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
        form.email = {};
        form.password = {};
    }

    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewRegisterComponent;
