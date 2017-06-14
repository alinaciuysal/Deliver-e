
'use strict';

import template from './left-menu.template.html';

class LeftMenuComponent {
    constructor(){
        this.controller = LeftMenuController;
        this.template = template;
    }

    static get name() {
        return 'leftMenu';
    }
}

class LeftMenuController{
    constructor($state){
        this.$state = $state;

    }

    static get $inject(){
        return ['$state'];
    }
}

export default LeftMenuComponent;