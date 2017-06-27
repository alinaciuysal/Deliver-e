'use strict';

import angular from 'angular';

import AboutUsComponent from './aboutUs.component';

export default angular.module('AboutUs', [])
    .component(AboutUsComponent.name, new AboutUsComponent);