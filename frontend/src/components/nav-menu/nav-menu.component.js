
'use strict';

import template from "./nav-menu.template.html";
import './nav-menu.style.css';


class NavMenuComponent {
    constructor(){
        this.controller = NavMenuController;
        this.template = template;
    }

    static get name() {
        return 'navMenu';
    }
}

class NavMenuController {
    constructor($state) {
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }

    $onInit() {
        let ctrl = this;
        ctrl.pages = ["Test", "Test2"];
    }
}

export default NavMenuComponent;