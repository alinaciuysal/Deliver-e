
'use strict';

import template from './view-product-page.html';
import UserService from './../../services/user/user.service';

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

    constructor($state,  $rootScope, $location, UserService){
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.UserService = UserService;

        this.productId = this.$state.params.productId;

        console.log(this.productId);

        ///GET PRODUCT BY ID
        /// /api/shop/product/:(product_id)

        this.name = "Dummy Product Name";
        this.image = 'img/asian/asian1.jpg';
        this.price = "10 €";
        this.category = "category";
        this.desc = "Product description..."; //details

    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location', UserService.name, '$http'];
    }
}

export default ViewProductPageComponent;