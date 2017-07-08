'use strict';

export default class ShopService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
    }

    static get name(){
        return 'ShopService';
    }

    addProduct(productName, productPrice, productCategory, productWeight, productStock, productDetails, productPhoto){
        console.log("AddProduct works");
        return this.$http.post(`${ this.API_URL }/shop/product`, {
            name: productName,
            price: productPrice,
            category: productCategory,
            weight: productWeight,
            stock: productStock,
            details: productDetails,
            photo: productPhoto
        });
    }

    getShop() {
        return this.$http.get(`${ this.API_URL }/shop`).then(responce => {
                return new Promise((resolve, reject) => {
                    resolve(responce.data);
            });
        })
    }
}