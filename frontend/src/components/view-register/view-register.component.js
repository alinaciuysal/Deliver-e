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
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.register = {};
    }

    submitUserRegistrationRequest(){
        let email = this.userRegister.email;
        let password = this.userRegister.password;

        console.log(email + " " + password);
        this.UserService.register(email, password).then(()=> {
            // TODO: application logic goes here after submitting registration request
            this.$state.go('mainPage',{});
        });
    }

    submitDelivererRegistrationRequest() {
        let name = this.delivererRegister.name;
        let password = this.delivererRegister.password;
        let surname = this.delivererRegister.surname;
        let email = this.delivererRegister.email;
        let birthday = this.delivererRegister.birthday;
        let phoneNumber = this.delivererRegister.phoneNumber;
        let maxWeight = this.delivererRegister.maxWeight;

        // Ref: https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
        let date = new Date(birthday);
        console.log("date: " + date);

        var date = new Date(timestamp).getDate();
        var month = new Date(timestamp).getMonth()+1;
        var year = new Date(timestamp).getFullYear();
        var original_date =  date + '-' + month+ '-' + year;
        console.log(original_date);

        // https://stackoverflow.com/questions/43277458/how-to-specify-timestamp-format-when-converting-to-human-readable-string-in-js
        // https://momentjs.com/

        console.log(name + " " + password + " " + surname + " " + email + " " + date + " " + phoneNumber + " " + maxWeight);

        // TODO: API CALLS
    }

    submitShopRegistrationRequest() {
        let name = this.shopRegisterer.name;
        let address = this.shopRegisterer.address;
        let email = this.shopRegisterer.email;
        let password = this.shopRegisterer.password;
        let phoneNumber = this.shopRegisterer.phoneNumber;
        console.log(name + " " + address + " " + email + " " + password + " " + phoneNumber);

        // TODO: API CALLS
    }


    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewRegisterComponent;
