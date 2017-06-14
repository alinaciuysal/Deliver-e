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

    submit(){
        let email = this.login.email;
        let password = this.login.password;

        // TODO: add other attributes for different registration types

        this.UserService.register(email,password).then(()=> {
            // TODO: application logic goes here after submitting registration request
            this.$state.go('mainPage',{});
        });
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewRegisterComponent;
