'use strict';

import angular from 'angular';

import NavMenuComponent from './nav-menu.component';

export default angular.module('navMenu', [])
    .component(NavMenuComponent.name, new NavMenuComponent);