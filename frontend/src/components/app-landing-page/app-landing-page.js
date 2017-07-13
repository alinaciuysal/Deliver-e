'use strict';

import angular from 'angular';

import AppLandingPageComponent from './app-landing-page.component';

export default angular.module('AppLandingPage', [])
    .component(AppLandingPageComponent.name, new AppLandingPageComponent)


