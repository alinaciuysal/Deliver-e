'use strict';

import angular from 'angular';

import ViewShopPageComponent from './view-shop-page.component';

export default angular.module('ViewShopPage', [])
    .component(ViewShopPageComponent.name, new ViewShopPageComponent)
