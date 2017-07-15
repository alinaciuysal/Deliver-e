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

    getBasket() {
        return this.$http.get(`${ this.API_URL }/order/basket`).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    addProductToBasket(productId, productAmount){
        return this.$http.post(`${ this.API_URL }/order/basket`, {
            product: productId,
            amount: productAmount
        });
    }

    clearBasket(){
        return this.$http.put(`${ this.API_URL }/order/basket/clear`);
    }

}