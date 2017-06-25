'use strict';

import angular from 'angular';

import ShopService from './shop.service';


export default angular.module('ShopServiceDefinition', [])
    .service(ShopService.name, ShopService);