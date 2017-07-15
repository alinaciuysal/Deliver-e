'use strict';

export default class OrderService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
    }

    static get name(){
        return 'OrderService';
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