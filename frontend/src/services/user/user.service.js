'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window', '$rootScope', 'API_URL'];
    }

    constructor ($http, $window, $rootScope, API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.$rootScope = $rootScope;
        this.user = null;

    }

    static get name(){
        return 'UserService';
    }

    register (name, surname, email, pass, address, location, district) {
        return this.$http.post(`${ this.API_URL }/user/signup/customer`, {
            name: name,
            surname: surname,
            email: email,
            password: pass,
            address: address,
            location: location,
            district: district
        });
    }

    registerDeliverer (email, password, name, surname, birthday, phone, address, maxWeight, preferredLocation, preferredDistricts) {
        return this.$http.post(`${ this.API_URL }/user/signup/deliverer`, {
            email: email,
            password: password,
            maxWeight: maxWeight,
            preferredLocation: preferredLocation,
            preferredDistricts: preferredDistricts,
            name: name,
            surname: surname,
            address: address,
            phone: phone,
            birthday: birthday
        });
    }

    registerShop (email, password, shopName, type, shopAddress, shopPhoneNumber) {
        return this.$http.post(`${ this.API_URL }/user/signup/shop`, {
            email: email,
            password: password,
            name: shopName,
            shop: {
                // "name": shopName,
                "address": shopAddress,
                "phone": shopPhoneNumber,
                "type": type
            }
        });
    }

    login (mail, pass) {
        let ctrl = this;
        return ctrl.$http.post(`${ this.API_URL }/user/login`, {
            email: mail,
            password: pass,
            // name: "test"
        });
    }

    logout() {
        let ctrl = this;
        ctrl.$window.localStorage.removeItem('jwtToken');
        if (ctrl.user) {
            ctrl.user = null;
        }
        ctrl.$rootScope.$emit("mainPage-changed", true);
    }

    getCurrentUser() {

        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let user = JSON.parse(this.$window.atob(base64)).user;
        return user;
    }

    getCurrentUserDetails() {

        if (!this.user) {
            this.user = this.$http.get(`${ this.API_URL }/user`);
            return this.user;
        } else {
            return this.user;
        }
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


    updateUser (user) {
        return this.$http.put(`${ this.API_URL }/user/`, user);
    }

    getAvailableOrders(){
        return this.$http.get(`${ this.API_URL }/order`);
    }

    acceptOrder(orderId){
        return this.$http.put(`${ this.API_URL }/order/${orderId}/accept`);
    }

    rejectOrder(orderId){
        return this.$http.put(`${ this.API_URL }/order/${orderId}/reject`);
    }
}