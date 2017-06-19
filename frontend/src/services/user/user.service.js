'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;

    }

    static get name(){
        return 'UserService';
    }

    register(email, pass) {
        console.log("UserService register works");
        return this.$http.post(`${ this.API_URL }/user/signup/customer`, {
            email: email,
            password: pass
        });
    }

    registerDeliverer(email, password, name, surname, birthday, phone, address, maxWeight, preferredLocations) {
        console.log("UserService registerDeliverer works");
        return this.$http.post(`${ this.API_URL }/user/signup/deliverer`, {
            email: email,
            password: password,
            maxWeight: maxWeight,
            preferredLocations: preferredLocations,
            name: name,
            surname: surname,
            address: address,
            phone: phone,
            birthday: birthday
        });
    }

    registerShop(email, password, shopName, shopAddress, shopPhoneNumber) {
        console.log("UserService registerShop works");
        return this.$http.post(`${ this.API_URL }/user/signup/shop`, {
            email: email,
            password: password,
            shop: {
                "name": shopName,
                "address": shopAddress,
                "phone": shopPhoneNumber
            }
        });
    }

    login(mail, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            email: mail,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


}