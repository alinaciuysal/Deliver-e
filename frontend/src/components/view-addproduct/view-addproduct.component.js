/**
 * Created by Melih Berçin on 6/16/2017.
 */

'use strict';

import ShopService from './../../services/shop/shop.service';

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
    constructor($state, $element, ShopService){
        this.$element = $element;
        this.$state = $state;
        this.ShopService = ShopService;
    }

    $onInit() {
        let ctrl = this;
        ctrl.register = {};
    }

    uploadProductPic(){
        // TODO: Upload pic
        return "";
    }

    submitNewProduct(){
        let productName = this.product.name;
        let productCategory = this.product.category;
        let productWeight = this.product.weight;
        let weightType = this.product.weightType;
        let productPrice = this.product.price;
        let productStock = this.product.stock;
        //let productStockInf = this.product.selected;
        let productDetails = this.product.productDetails;
        let productPhoto = "";//this.uploadProductPic();

        if(weightType == "gram")
            productWeight = productWeight / 1000;
        // TODO: API call
        this.ShopService.addProduct(productName, productPrice, productCategory, productWeight, productStock, productDetails, productPhoto).then(()=> {
            console.log("Product added");
            this.$state.go('shopHomePage',{});
        }).catch(function(obj){
            ctrl.addProductError = "Error: " + obj.data;
        });
    }

    static get $inject(){
        return ['$state', '$element', ShopService.name];
    }
}

export default ViewAddProductComponent;
