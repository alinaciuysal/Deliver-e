'use strict';

import MainPageComponent from './../components/view-mainpage/view-mainpage.component';
import LoginComponent from './../components/view-login/view-login.component';
import RegisterComponent from './../components/view-register/view-register.component';
import AddProductComponent from './../components/view-addproduct/view-addproduct.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AvailableOrdersComponent from './../components/view-availableorders/view-availableorders.component';
import ShopsListComponent from '../components/view-shops-list/view-shops-list.component';
import ShopPageComponent from './../components/view-shop-page/view-shop-page.component';
import ProductPageComponent from './../components/view-product-page/view-product-page.component';
import AboutUsComponent from './../components/aboutUs/aboutUs.component';
import FaqComponent from './../components/faq/faq.component';
import ViewAddProductComponent from './../components/view-addproduct/view-addproduct.component';



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
        .state('profile', {
            url: '/profile',
            component: ProfileComponent.name
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
            component: ShopsListComponent.name,
            params: { type: null },
            resolve: {
                type: ['$stateParams', function ($stateParams) {
                    return $stateParams.type;
                }]
            }
        })
        .state('shop', {
            url: '/shop/:shopId',
            component: ShopPageComponent.name,
            params: { type: null },
            resolve: {
                shopId: ['$stateParams', function ($stateParams) {
                    return $stateParams.shopId;
                }]
            }
        })
        .state('product', {
            url: '/product/:productId',
            component: ProductPageComponent.name,
            params: { type: null },
            resolve: {
                productId: ['$stateParams', function ($stateParams) {
                    return $stateParams.productId;
                }]
            }
        })
        .state('about', {
            url: '/aboutUs',
            component: AboutUsComponent.name
        })
        .state('faq', {
            url: '/faq',
            component: FaqComponent.name
        })
        .state('delivererHomePage', {
            url: '/availableOrders',
            component: AvailableOrdersComponent.name
        })
        // TODO: url in the following state can be changed
        .state('shopHomePage', {
            url: '/addProduct',
            component: ViewAddProductComponent.name
        })


}

