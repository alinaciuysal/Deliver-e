
'use strict';

import template from './view-product-page.html';
import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';
import OrderService from './../../services/order/order.service';

class ViewProductPageComponent {
    constructor(){
        this.controller = ViewProductPageController;
        this.template = template;
    }

    static get name() {
        return 'viewProductPage';
    }
}

class ViewProductPageController {

    constructor($state,  $rootScope, $location, UserService, ShopService, OrderService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;
        this.ShopService = ShopService;
        this.OrderService = OrderService;

        this.productId = this.$state.params.productId;

        this.photo = null;
        this.name = "";
        this.category = "";
        this.price = "";
        this.stock = "";
        this.weight = "";
        this.details = "";

        ///GET PRODUCT BY ID
        /// /api/shop/product/:(product_id)

        this.getProductById(this.productId);

    }

    getProductById(id) {
        this.ShopService.getProductById(id).then(value => {
            this.photo = value.photo;
            this.name = value.name;
            this.category = value.category;
            this.price = value.price;
            this.stock = value.stock;
            this.weight = value.weight;
            this.details = value.details;
        });
    }

    addProductToBasket(productId){
        this.OrderService.addProductToBasket(productId, 1);
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
        this.isAuthenticated = this.UserService.isAuthenticated();
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name, ShopService.name, OrderService.name];
    }
}

export default ViewProductPageComponent;