'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.user = null;

    }

    static get name(){
        return 'UserService';
    }

    register(name, surname, email, pass, address, location, district) {
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

    registerDeliverer(email, password, name, surname, birthday, phone, address, maxWeight, preferredLocation, preferredDistricts) {
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

    registerShop(email, password, shopName, shopAddress, shopPhoneNumber) {
        return this.$http.post(`${ this.API_URL }/user/signup/shop`, {
            email: email,
            password: password,
            name: shopName,
            shop: {
                // "name": shopName,
                "address": shopAddress,
                "phone": shopPhoneNumber
            }
        });
    }

    login(mail, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            email: mail,
            password: pass,
            // name: "test"
        });
    }

    logout() {
        this.$window.localStorage.removeItem('jwtToken');
        if (this.user) {
            this.user = null;
        }
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

    updateUser(user) {
        return this.$http.put(`${ this.API_URL }/user/`, user);
    }


}