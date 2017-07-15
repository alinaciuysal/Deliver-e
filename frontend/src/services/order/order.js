'use strict';

import angular from 'angular';

import OrderService from './order.service';


export default angular.module('OrderServiceDefinition', [])
    .service(OrderService.name, OrderService);