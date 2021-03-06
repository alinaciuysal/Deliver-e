
'use strict';

import template from './view-shop-page.html';
import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';
import OrderService from './../../services/order/order.service';

class ViewShopPageComponent {
    constructor(){
        this.controller = ViewShopPageController;
        this.template = template;
    }

    static get name() {
        return 'viewShopPage';
    }
}

class ViewShopPageController {

    constructor($state, UserService, ShopService, OrderService, $stateParams){
        this.$state = $state;
        this.UserService = UserService;
        this.ShopService = ShopService;
        this.OrderService = OrderService;

        this.shopId = this.$state.params.shopId;

        this.shop = [];
        this.name = "";
        this.address = "";
        this.phone = "";
        this.products = [];
        this.numCol = 0;

        //this.photo = 'img/asian/asian1.jpg';
        ///GET SHOP BY ID
        /// /api/shop/:(shop_id)
        this.getDetailedShopById(this.shopId);

    }

    getDetailedShopById(id) {
        this.ShopService.getDetailedShopById(id).then(value => {
            this.shop = value;
            this.name = this.shop.name;
            this.address = this.shop.address;
            this.phone = this.shop.phone;

            this.products = this.shop.catalogue;

            this.numCol = this.products.length/4;
            if(this.products.length%4!=0) this.numCol++;

        });
    }

    getProductById(id) {
        this.ShopService.getProductById(id).then(value => {
            this.products.push(value);

            this.numCol = this.products.length/4;
            if(this.products.length%4!=0) this.numCol++;

        });
    }

    addProductToBasket(productId){
        this.OrderService.addProductToBasket(productId, 1);
    }

    $onInit() {
        this.isAuthenticated = this.UserService.isAuthenticated();
    }

    static get $inject(){
        return ['$state', UserService.name, ShopService.name, OrderService.name, '$stateParams', '$http'];
    }
}

export default ViewShopPageComponent;