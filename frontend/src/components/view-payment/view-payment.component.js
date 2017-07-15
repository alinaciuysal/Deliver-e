/**
 * Created by Melih Berçin on 7/15/2017.
 */
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-payment.template.html';
import './view-payment.style.css';

class ViewPaymentComponent {
    constructor(){
        this.controller = ViewPaymentComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewPayment';
    }
}

class ViewPaymentComponentController{
    constructor($state, $element, UserService){
        this.$element = $element;
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        let ctrl = this;
        ctrl.register = {};
    }


    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewPaymentComponent;
