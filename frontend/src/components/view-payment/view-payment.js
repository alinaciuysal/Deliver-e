/**
 * Created by Melih Berçin on 7/15/2017.
 */
'use strict';

import angular from 'angular';

import ViewPaymentComponent from './view-payment.component.js';

export default angular.module('ViewPayment', [])
    .component(ViewPaymentComponent.name, new ViewPaymentComponent);
