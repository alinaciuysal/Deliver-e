'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngAria from 'angular-aria';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import OrderService from './services/order/order';
import UserService from './services/user/user';
import ShopService from './services/shop/shop';
import AWSService from './services/aws/aws';
import Routes from './config/routes';
import Middlewares from './config/middlewares';
import Icons from './config/icons';

import AppContent from './components/app-content/app-content';
import ViewLogin from './components/view-login/view-login';
import ViewRegister from './components/view-register/view-register';
import ViewAddProduct from './components/view-addproduct/view-addproduct';
import ViewProfile from './components/view-profile/view-profile';
import ViewAvailableOrders from './components/view-availableorders/view-availableorders';
import ViewPayment from './components/view-payment/view-payment';
import ViewMainPage from './components/view-mainpage/view-mainpage';
import LeftMenu from './components/left-menu/left-menu';
import ViewShopsList from './components/view-shops-list/view-shops-list';
import ViewShopPage from './components/view-shop-page/view-shop-page';
import ViewProductPage from './components/view-product-page/view-product-page';
import ViewSearch from './components/view-search/view-search';
import AboutUs from './components/aboutUs/aboutUs';
import jkAngularCarousel from 'angular-jk-carousel';
import Faq from './components/faq/faq';
import ViewBasket from './components/view-basket/view-basket';
import ViewMyOrders from './components/view-myorders/view-myorders';
import ViewAcceptedOrders from './components/view-acceptedorders/view-acceptedorders';

let app = angular.module('app', [
        uiRouter,
        angularMaterial,
        ngMdIcons,
        OrderService.name,
        UserService.name,
        ShopService.name,
        AWSService.name,
        AppContent.name,
        ViewRegister.name,
        ViewProfile.name,
        ViewLogin.name,
        ViewPayment.name,
        ViewMainPage.name,
        ViewAddProduct.name,
        ViewAvailableOrders.name,
        LeftMenu.name,
        AboutUs.name,
        ViewShopsList.name,
        ViewShopPage.name,
        ViewProductPage.name,
        ViewMyOrders.name,
        ViewAcceptedOrders.name,
        Faq.name,
        ViewBasket.name,
        ViewSearch.name,
        jkAngularCarousel,
        ngAria

]).run(() => {
    console.log(`Starting the angular module`);
});

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);
app.config(Icons);
app.directive("ngFileModel", [function () {
    return {
        scope: {
            ngFileModel: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.ngFileModel = {
                            lastModified: changeEvent.target.files[0].lastModified,
                            lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
                            name: changeEvent.target.files[0].name,
                            size: changeEvent.target.files[0].size,
                            type: changeEvent.target.files[0].type,
                            data: loadEvent.target.result
                        };
                    });
                }
                reader.readAsArrayBuffer(changeEvent.target.files[0]);
            });
        }
    }
}]);

angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;