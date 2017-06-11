'use strict';

import angular from 'angular';

import MainPageService from './main.service';


export default angular.module('MainPageServiceDefinition', [])
    .service(MainPageService.name, MainPageService)