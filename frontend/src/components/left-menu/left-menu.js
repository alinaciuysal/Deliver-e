'use strict';

import angular from 'angular';

import LeftMenuComponent from './left-menu.component';

export default angular.module('leftMenu', [])
    .component(LeftMenuComponent.name, new LeftMenuComponent);