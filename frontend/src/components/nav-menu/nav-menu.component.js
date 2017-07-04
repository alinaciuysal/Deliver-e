
'use strict';

import template from "./nav-menu.template.html";
import './nav-menu.style.css';


/* Reference: see last answer at https://stackoverflow.com/questions/36033940/how-to-pass-data-between-sibling-components-without-using-scope */
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

    constructor($state, $location, $rootScope) {
        var ctrl = this;
        this.$state = $state;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.$rootScope.$on("menu-changed", function(evt, arg) {
            ctrl.initializeNavBar(arg);
        });
    }

    static get $inject(){
        return ['$state', '$location', '$rootScope'];
    }

    initializeNavBar(arg) {
        let ctrl = this;

        if (arg !== undefined) {
            arg = arg.substr(1);
            if(arg !== "mainPage") {
                ctrl.navigationElements = ["Main Page", arg];
            } else {
                ctrl.navigationElements = ["Main Page"];
            }
        } else {
            ctrl.navigationElements = ["Main Page"];
        }
    }
}

export default NavMenuComponent;