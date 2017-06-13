'use strict';

import angular from 'angular';

import LeftMenuComponent from './left-menu.component';

export default angular.module('LeftMenu', [])
    .component(LeftMenuComponent.name, new LeftMenuComponent);