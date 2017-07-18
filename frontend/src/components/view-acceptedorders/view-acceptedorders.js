'use strict';

import angular from 'angular';

import ViewAcceptedOrdersComponent from './view-acceptedorders.component.js';

export default angular.module('ViewAcceptedOrders', [])
    .component(ViewAcceptedOrdersComponent.name, new ViewAcceptedOrdersComponent);
