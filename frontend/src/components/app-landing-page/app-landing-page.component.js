'use strict';

import template from './app-landing-page.template.html';

class AppLandingPageComponent {
    constructor($state){
        this.$state = $state;
        this.controller = AppLandingPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'appLandingPage';
    }
}

class AppLandingPageComponentController{
    static get $inject(){
        return ['$scope', '$mdDialog', '$mdMedia'];
    }

    constructor($scope, $mdDialog, $mdMedia){
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.$scope.status = '  ';
        this.$scope.customFullscreen = this.$mdMedia('xs') || this.$mdMedia('sm');
    }
}

export default AppLandingPageComponent;

