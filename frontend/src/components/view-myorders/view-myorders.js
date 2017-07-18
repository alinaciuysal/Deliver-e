/**
 * Created by Melih Berçin on 6/17/2017.
 */

'use strict';

import angular from 'angular';

import ViewAvailableOrdersComponent from './view-availableorders.component.js';

export default angular.module('ViewAvailableOrders', [])
    .component(ViewAvailableOrdersComponent.name, new ViewAvailableOrdersComponent);
