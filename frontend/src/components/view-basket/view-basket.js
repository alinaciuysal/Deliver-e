'use strict';

import angular from 'angular';

import ViewBasketComponent from './view-basket.component';


export default angular.module('ViewBasket', [])
    .component(ViewBasketComponent.name, new ViewBasketComponent);