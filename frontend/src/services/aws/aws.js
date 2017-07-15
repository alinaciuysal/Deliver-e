'use strict';

import angular from 'angular';

import AWSService from './aws.service';


export default angular.module('AWSServiceDefinition', [])
    .service(AWSService.name, AWSService);