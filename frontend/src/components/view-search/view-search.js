'use strict';

import angular from 'angular';

import ViewSearchComponent from './view-search.component';

export default angular.module('ViewSearch', [])
    .component(ViewSearchComponent.name, new ViewSearchComponent)
