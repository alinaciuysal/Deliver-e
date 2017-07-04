
'use strict';

import template from "./faq.template.html";
import './faq.style.css';


class FaqComponent {
    constructor(){
        this.controller = FaqController;
        this.template = template;
    }

    static get name() {
        return 'faq';
    }
}

class FaqController {
    constructor($state, $rootScope, $location) {
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$location = $location;
    }

    $onInit() {
        this.$rootScope.$emit("menu-changed", this.$location.url());
    }

    static get $inject(){
        return ['$state', '$rootScope', '$location'];
    }
}

export default FaqComponent;