
'use strict';

import template from './view-search.html';
import UserService from './../../services/user/user.service';
import ShopService from './../../services/shop/shop.service';
import OrderService from './../../services/order/order.service';

class ViewSearchComponent {
    constructor(){
        this.controller = ViewSearchController;
        this.template = template;
    }

    static get name() {
        return 'viewSearchPage';
    }
}

class ViewSearchController {

    constructor($state, UserService, ShopService, OrderService){
        this.$state = $state;
        this.UserService = UserService;
        this.ShopService = ShopService;
        this.OrderService = OrderService;

        this.nameToSearch = this.$state.params.search;

        this.products = [];
        this.numCol = 0;

        this.photo = 'img/asian/asian1.jpg';

        this.search(this.nameToSearch);
    }

    search(name) {
        this.ShopService.searchProductsInShop(name).then(value => {
            for (var idx in value) {
                for (var idx2 in value[idx].catalogue) {
                    this.products.push(value[idx].catalogue[idx2]);
                }
            }

            this.numCol = this.products.length/4;
            if(this.products.length%4!=0) this.numCol++;
        });
    }

    addProductToBasket(productId){
        console.log(productId);
        this.OrderService.addProductToBasket(productId, 1);
    }

    $onInit() {
        console.log("ViewSearchController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name, ShopService.name, OrderService.name];
    }
}

export default ViewSearchComponent;