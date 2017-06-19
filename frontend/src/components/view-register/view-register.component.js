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
        var ctrl = this;
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
        var ctrl = this;
        console.log("before change: ", ctrl.delivererRegister.selectedDistricts);
        ctrl.delivererRegister.selectedDistricts = null;
    }

    submitUserRegistrationRequest(){
        var ctrl = this;

        let email = this.userRegister.email;
        let password = this.userRegister.password;

        console.log(email + " " + password);
        this.UserService.register(email, password).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.userRegistrationError = "Error: " + obj.data;
        });
    }

    submitDelivererRegistrationRequest() {
        var ctrl = this;

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
        console.log("date: " + date);

        /*var month = new Date(timestamp).getMonth() + 1;
        var year = new Date(timestamp).getFullYear();
        var original_date =  date + '-' + month+ '-' + year;
        console.log(original_date);*/
        // https://stackoverflow.com/questions/43277458/how-to-specify-timestamp-format-when-converting-to-human-readable-string-in-js
        // https://momentjs.com/

        console.log(name + " " + password + " " + surname + " " + email + " " + date + " " + phone + " " + address + " " + maxWeight + " " + selectedDistricts);

        this.UserService.registerDeliverer(email, password, name, surname, birthday, phone, address, maxWeight, selectedDistricts).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.delivererRegistrationError = "Error: " + obj.data;
        });
    }

    submitShopRegistrationRequest() {
        var ctrl = this;
        let shopName = this.shopRegisterer.name;
        let address = this.shopRegisterer.address;
        let email = this.shopRegisterer.email;
        let password = this.shopRegisterer.password;
        let phoneNumber = this.shopRegisterer.phoneNumber;

        console.log(name + " " + address + " " + email + " " + password + " " + phoneNumber);

        this.UserService.registerShop(email, password, shopName, phoneNumber, address).then(()=> {
            this.$state.go('mainPage',{});
        }).catch(function(obj){
            ctrl.shopRegistrationError = "Error: " + obj.data;
        });
    }


    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewRegisterComponent;
