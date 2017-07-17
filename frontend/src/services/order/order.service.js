'use strict';

export default class OrderService {
    static get $inject(){
        return ['$http', '$window','API_URL', '$mdDialog'];
    }

    constructor($http,$window,API_URL, $mdDialog) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.$mdDialog = $mdDialog;
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
        let ctrl = this;
        return this.$http.post(`${ this.API_URL }/order/basket`, {
            product: productId,
            amount: productAmount
        }).then(response => {
            this.reload = true;
        }).catch(function(e){
            if (e.data === "Shops are not equal") {
                ctrl.showAlert("You cannot add different products from different shops");
            }

        });
    }

    clearBasket(){
        return this.$http.put(`${ this.API_URL }/order/basket/clear`).then(responce => {
            this.reload = true;
        });
    }

    showAlert(textContent) {
        let ctrl = this;
        let alert = ctrl.$mdDialog.alert({
            title: 'Please be advised',
            textContent: textContent,
            ok: 'Close'
        });

        ctrl.$mdDialog
            .show(alert)
            .finally(function() {
                alert = undefined;
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