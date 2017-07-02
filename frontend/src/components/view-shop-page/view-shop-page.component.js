
'use strict';

import template from './view-shop-page.html';
import UserService from './../../services/user/user.service';

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

    constructor($state, UserService, $stateParams){
        this.$state = $state;
        this.UserService = UserService;

        this.shopId = this.$state.params.shopId;

        console.log(this.shopId);

        ///GET SHOP BY ID

        this.name = "Dummy Shop Name"
        this.products = [
            {  name: "Product1", src: 'img/asian/asian1.jpg', desc:"description" },
            {  name: "Product2", src: 'img/asian/asian2.jpg', desc:"description"  },
            {  name: "Product3", src: 'img/asian/asian1.jpg', desc:"description"  },
            {  name: "Product4", src: 'img/asian/asian2.jpg', desc:"description"  },
            {  name: "Product5", src: 'img/asian/asian1.jpg', desc:"description"  },
            {  name: "Product6", src: 'img/asian/asian2.jpg', desc:"description"  }
        ];
        this.numCol = this.products.length/4;
        if(this.products.length%4!=0) this.numCol++;
    }

    $onInit() {
        console.log("ViewShopPageController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name, '$stateParams', '$http'];
    }
}

export default ViewShopPageComponent;