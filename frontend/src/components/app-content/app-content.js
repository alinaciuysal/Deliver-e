'use strict';

import angular from 'angular';

import AppHeader from './../app-header/app-header';
import AppFooter from './../app-footer/app-footer';
import LeftMenu from './../left-menu/left-menu';
import NavMenu from './../nav-menu/nav-menu';

import AppContentComponent from './app-content.component';

export default angular.module('AppView', [
        AppHeader.name,
        AppFooter.name,
        LeftMenu.name,
        NavMenu.name
    ])
    .component(AppContentComponent.name, new AppContentComponent);