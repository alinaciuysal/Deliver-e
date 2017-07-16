'use strict';

export default class OrderService {
    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.reload = false;
    }

    static get name(){
        return 'OrderService';
    }

    reloaded() {
        this.reload = false;
    }

    getBasket() {
        return this.$http.get(`${ this.API_URL }/order/basket`).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    addProductToBasket(productId, productAmount){
        return this.$http.post(`${ this.API_URL }/order/basket`, {
            product: productId,
            amount: productAmount
        }).then(responce => {
            this.reload = true;
        });
    }

    clearBasket(){
        return this.$http.put(`${ this.API_URL }/order/basket/clear`).then(responce => {
            this.reload = true;
        });
    }

    // https://stackoverflow.com/questions/29791003/angular-http-delete-request-with-body
    removeProductFromBasket (productId, productAmount){
        let ctrl = this;

        return ctrl.$http({
            method: 'DELETE',
            url: `${ this.API_URL }/order/basket`,
            data: {
                product: productId,
                amount: productAmount
            },
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
    }

    makeOrder(inputTime){
        return this.$http.post(`${ this.API_URL }/order/`, {
            deliveryTime: inputTime
        });
    }
}