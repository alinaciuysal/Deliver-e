/**
 * Created by Melih Berçin on 6/17/2017.
 */

'use strict';

import angular from 'angular';

import ViewMyOrdersComponent from './view-myorders.component.js';

export default angular.module('ViewMyOrders', [])
    .component(ViewMyOrdersComponent.name, new ViewMyOrdersComponent);
