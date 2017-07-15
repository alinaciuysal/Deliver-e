
'use strict';

import template from './app-content.template.html';

class AppContentComponent {
    constructor(){
        this.controller = AppContentComponentController;
        this.template = template;
    }

    static get name() {
        return 'appContent';
    }
}

class AppContentComponentController {

    constructor($location, $rootScope){
        this.$rootScope = $rootScope;
        this.$location = $location;
    }

    static get $inject(){
        return ['$location', '$rootScope'];
    }

    $onInit() {
    }
}

export default AppContentComponent;