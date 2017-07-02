'use strict';

import angular from 'angular';

import ViewProductPageComponent from './view-product-page.component';

export default angular.module('ViewProductPage', [])
    .component(ViewProductPageComponent.name, new ViewProductPageComponent)
