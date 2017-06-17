'use strict';

import angular from 'angular';

import ViewMainPageComponent from './view-mainpage.component';

export default angular.module('ViewMainPage', [])
    .component(ViewMainPageComponent.name, new ViewMainPageComponent)
