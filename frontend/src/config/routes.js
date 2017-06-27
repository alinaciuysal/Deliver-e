'use strict';

import MainPageComponent from './../components/view-mainpage/view-mainpage.component';
import LoginComponent from './../components/view-login/view-login.component';
import RegisterComponent from './../components/view-register/view-register.component';
import AddProductComponent from './../components/view-addproduct/view-addproduct.component';
import AvailableOrdersComponent from './../components/view-availableorders/view-availableorders.component';
import ShopsComponent from './../components/view-shops/view-shops.component';
import AboutUsComponent from './../components/aboutUs/aboutUs.component';
import FaqComponent from './../components/faq/faq.component';



config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/mainPage");

    $stateProvider
        .state('mainPage', {
            url: '/mainPage',
            component: MainPageComponent.name,
        })
        .state('register', {
            url: '/register',
            component: RegisterComponent.name
        })
        .state('addproduct', {
            url: '/addproduct',
            component: AddProductComponent.name
        })
        .state('availableorders', {
            url: '/availableorders',
            component: AvailableOrdersComponent.name
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name
        })
        .state('shops', {
            url: '/shops/:type',
            component: ShopsComponent.name,
            params: { type: null },
            resolve: {
                type: ['$stateParams', function ($stateParams) {
                    return $stateParams.type; //By putting this here... (STEP 1)
                }]
            }
        })
        .state('about', {
            url: '/about',
            component: AboutUsComponent.name
        })
        .state('faq', {
            url: '/faq',
            component: FaqComponent.name
        })


}

