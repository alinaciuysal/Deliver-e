
'use strict';

import template from './view-shops.template.html';
import UserService from './../../services/user/user.service';

class ViewShopsComponent {
    constructor(){
        this.controller = ViewShopsController;
        this.template = template;

    }

    static get name() {
        return 'viewShops';
    }
}

class ViewShopsController {

    constructor($state, UserService, $stateParams){
        this.$state = $state;
        this.UserService = UserService;

        this.type = this.$state.params.type;

        if(this.type == 'asian')
            this.name = "Asian Shops"
        else if(this.type == 'getranke')
            this.name = "Getrankemarkts"
        else if(this.type == 'turkish')
            this.name = "Turkish Shops"
        else if(this.type == 'russian')
            this.name = "Russian Shops"
    }

    $onInit() {
        console.log("ViewShopsController onInit works");
    }

    static get $inject(){
        return ['$state', UserService.name, '$stateParams', '$http'];
    }
}

export default ViewShopsComponent;