'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import UserService from './services/user/user';
import Routes from './config/routes';
import Middlewares from './config/middlewares';
import Icons from './config/icons';

import AppContent from './components/app-content/app-content';
import ViewLogin from './components/view-login/view-login';
import ViewRegister from './components/view-register/view-register';
import ViewAddProduct from './components/view-addproduct/view-addproduct';
import ViewAvailableOrders from './components/view-availableorders/view-availableorders';
import ViewMainPage from './components/view-mainpage/view-mainpage';
import LeftMenu from './components/left-menu/left-menu.component';

let app = angular.module('app', [
        uiRouter,
        angularMaterial,
        ngMdIcons,
        UserService.name,
        AppContent.name,
        ViewRegister.name,
        ViewLogin.name,
        ViewMainPage.name,
        ViewAddProduct.name,
        ViewAvailableOrders.name,
        LeftMenu.name
]).run(() => {
    console.log(`Starting the angular module`);
});

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);
app.config(Icons);

angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;