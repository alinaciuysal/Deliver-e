'use strict';

import angular from 'angular';

import ViewShopsListComponent from './view-shops-list.component';

export default angular.module('ViewShopsList', [])
    .component(ViewShopsListComponent.name, new ViewShopsListComponent)
