
'use strict';

import template from './aboutUs.template.html';
import './aboutUs.style.css';

class AboutUsComponent {
    constructor(){
        this.controller = AboutUsComponentController;
        this.template = template;
    }

    static get name() {
        return 'aboutUs';
    }
}

class AboutUsComponentController{
    constructor($rootScope, $location){
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.$rootScope.$emit("mainPage-changed", false);
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url().toString().substr(1));
    }

    static get $inject(){
        return ['$rootScope', '$location'];
    }
}

export default AboutUsComponent;