/**
 * Created by Melih Berçin on 6/16/2017.
 */

'use strict';

import ShopService from './../../services/shop/shop.service';
import AWSService from './../../services/aws/aws.service';

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
    constructor($state, $element, ShopService, AWSService){
        this.$element = $element;
        this.$state = $state;
        this.ShopService = ShopService;
        this.AWSService = AWSService;
    }

    $onInit() {
        let ctrl = this;
        ctrl.register = {};
    }

    uploadProductPic(){
        document.querySelector('#photo').click();
    }

    submitNewProduct(){
        let ctrl = this;
        let productName = this.product.name;
        let productCategory = this.product.category;
        let productWeight = this.product.weight;
        let weightType = this.product.weightType;
        let productPrice = this.product.price;
        let productStock = this.product.stock;
        //let productStockInf = this.product.selected;
        let productDetails = this.product.productDetails;
        this.AWSService.upload(this.product.photo).then(photo => {
            let productPhoto = photo;
            if(weightType === "gram")
                productWeight = productWeight / 1000;
            // TODO: API call
            this.ShopService.addProduct(productName, productPrice, productCategory, productWeight, productStock, productDetails, productPhoto).then(()=> {
                this.$state.go('mainPage',{});
            }).catch(function(obj){
                ctrl.addProductError = "Error: " + obj.data;
            });
        });

        
    }

    static get $inject(){
        return ['$state', '$element', ShopService.name, AWSService.name];
    }
}

export default ViewAddProductComponent;
