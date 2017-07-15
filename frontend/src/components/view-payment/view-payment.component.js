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
        ctrl.basket = ctrl.getUserBasket();
        console.log(ctrl.basket);
    }

    getUserBasket() {
        let basket = {
            "_id": "5969214bfd9c8616bc3c95f8",
            "status": "Basket",
            "orderer": "5969214afd9c8616bc3c95f7",
            "__v": 2,
            "items": [
                {
                    "product": {
                        "_id": "596922a0fd9c8616bc3c95f9",
                        "name": "Water",
                        "price": 2,
                        "category": "Liquid",
                        "weight": 1,
                        "stock": 100,
                        "__v": 0
                    },
                    "_id": "596922eafd9c8616bc3c95e0",
                    "amount": 1
                },
                {
                    "product": {
                        "_id": "5969235dfd9c8616bc3c95fb",
                        "name": "Soda",
                        "price": 3,
                        "category": "Liquid",
                        "weight": 1,
                        "stock": 50,
                        "__v": 0
                    },
                    "_id": "59692386fd9c8616bc3c95fc",
                    "amount": 1
                }
            ],
            "totalWeight": 2,
            "totalPrice": 5
        };
        return basket;
    }

    static get $inject(){
        return ['$state', '$element', UserService.name];
    }
}

export default ViewPaymentComponent;
