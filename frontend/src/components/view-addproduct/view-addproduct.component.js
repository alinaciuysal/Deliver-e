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

    uploadProductPic(){
        // TODO: Upload pic
    }

    submitNewProduct(){
        let productName = this.product.name;
        let productCategory = this.product.category;
        let productWeight = this.product.weight;
        let weightType = this.product.weightType;
        let productPrice = this.product.price;
        let productStock = this.product.stock;
        let productStockInf = this.product.selected;
        let productDetails = this.product.productDetails;

        console.log(productName + "   " + productCategory + "   " + productWeight + "   " + weightType + "   " + productPrice + "    " + productStock + "   " + productStockInf + "   " + productDetails);

        // TODO: API call
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default ViewAddProductComponent;
