/**
 * Created by Melih Berçin on 6/16/2017.
 */

'use strict';

import UserService from './../../services/user/user.service';

import template from './view-addproduct.template.html';
import './view-addproduct.style.css';

class ViewAddProductComponent {
    constructor(){
        this.controller = ViewAddProductComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewAddProduct';
    }

}

class ViewAddProductComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.register = {};
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewAddProductComponent;
