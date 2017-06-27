'use strict';

import angular from 'angular';

import FaqComponent from './faq.component';

export default angular.module('faq', [])
    .component(FaqComponent.name, new FaqComponent);