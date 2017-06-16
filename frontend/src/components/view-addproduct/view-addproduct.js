/**
 * Created by Melih Berçin on 6/16/2017.
 */
'use strict';

import angular from 'angular';

import ViewAddProductComponent from './view-addproduct.component.js';


export default angular.module('ViewAddProduct', [])
    .component(ViewAddProductComponent.name, new ViewAddProductComponent);
