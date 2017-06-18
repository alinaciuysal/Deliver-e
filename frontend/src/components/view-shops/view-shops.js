'use strict';

import angular from 'angular';

import ViewShopsComponent from './view-shops.component';

export default angular.module('ViewShops', [])
    .component(ViewShopsComponent.name, new ViewShopsComponent)
