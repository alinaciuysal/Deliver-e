'use strict';

import MainPageComponent from './../components/view-mainpage/view-mainpage.component';
import LoginComponent from './../components/view-login/view-login.component';
import RegisterComponent from './../components/view-register/view-register.component';
import AddProductComponent from './../components/view-addproduct/view-addproduct.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AvailableOrdersComponent from './../components/view-availableorders/view-availableorders.component';
import PaymentComponent from './../components/view-payment/view-payment.component';
import ShopsListComponent from '../components/view-shops-list/view-shops-list.component';
import ShopPageComponent from './../components/view-shop-page/view-shop-page.component';
import ProductPageComponent from './../components/view-product-page/view-product-page.component';
import AboutUsComponent from './../components/aboutUs/aboutUs.component';
import FaqComponent from './../components/faq/faq.component';
import ViewAddProductComponent from './../components/view-addproduct/view-addproduct.component';
import ViewSearchComponent from './../components/view-search/view-search.component';
import ViewMyOrdersComponent from './../components/view-myorders/view-myorders.component';
import ViewAcceptedOrdersComponent from './../components/view-acceptedorders/view-acceptedorders.component';


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/mainPage");

    $stateProvider
        .state('mainPage', {
            url: '/mainPage',
            component: MainPageComponent.name
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
            component: ProfileComponent.name,
            params: {
                showBasket: false
            }
        })
        .state('availableorders', {
            url: '/availableorders',
            component: AvailableOrdersComponent.name
        })
        .state('payment', {
            url: '/payment',
            component: PaymentComponent.name,
            params: {
                showBasket: false
            }
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
            params: {
                basketIsNotShown: true
            }
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
        .state('search', {
            url: '/search/:search',
            component: ViewSearchComponent.name,
            params: { type: null },
            resolve: {
                productId: ['$stateParams', function ($stateParams) {
                    return $stateParams.search;
                }]
            }
        })
        .state('about', {
            url: '/aboutUs',
            component: AboutUsComponent.name,
            params: {
                showBasket: false
            }
        })
        .state('faq', {
            url: '/faq',
            component: FaqComponent.name,
            params: {
                showBasket: false
            }
        })
        .state('delivererHomePage', {
            url: '/availableOrders',
            component: AvailableOrdersComponent.name
        })
        .state('shopHomePage', {
            url: '/addProduct',
            component: ViewAddProductComponent.name
        })
        .state('myOrders', {
            url: '/myOrders',
            component: ViewMyOrdersComponent.name,
            params: {
                showBasket: false
            }
        })
        .state('acceptedOrders', {
            url: '/acceptedOrders',
            component: ViewAcceptedOrdersComponent.name,
            params: {
                showBasket: false
            }
        })


}

