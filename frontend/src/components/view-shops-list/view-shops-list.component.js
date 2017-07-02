
'use strict';

import template from './view-shops-list.template.html';
import UserService from './../../services/user/user.service';

class ViewShopsListComponent {
    constructor(){
        this.controller = ViewShopsListController;
        this.template = template;
    }

    static get name() {
        return 'viewShopsList';
    }
}

class ViewShopsListController {

    constructor($state, UserService, $stateParams){
        this.$state = $state;
        this.UserService = UserService;

        this.type = this.$state.params.type;

        /// GET SHOPS LIST

        if(this.type == 'asian') {
            this.name = "Asian Shops";
            this.shoplist = [
                {  name: "AsianShop1", shopId:"12341", desc:"description" },
                {  name: "AsianShop2", shopId:"12342", desc:"description"  },
                {  name: "AsianShop3", shopId:"12343", desc:"description"  },
                {  name: "AsianShop4", shopId:"12344", desc:"description"  },
                {  name: "AsianShop5", shopId:"12345", desc:"description"  },
                {  name: "AsianShop6", shopId:"12346", desc:"description"  },
                {  name: "AsianShop7", shopId:"12347", desc:"description"  }
            ];

            this.numCol = this.shoplist.length/2;
            if(this.shoplist.length%2!=0) this.numCol++;
        }
        else if(this.type == 'getranke') {
            this.name = "Getrankemarkts"
        }
        else if(this.type == 'turkish') {
            this.name = "Turkish Shops"
        }
        else if(this.type == 'russian') {
            this.name = "Russian Shops"
        }
    }

    $onInit() {
        console.log("ViewShopsListController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name, '$stateParams', '$http'];
    }
}

export default ViewShopsListComponent;