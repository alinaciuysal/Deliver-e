/**
 * Created by Ali Naci Uysal on 6/13/2017.
 */
'use strict';

import angular from 'angular';

import ViewRegisterComponent from './view-register.component.js';


export default angular.module('ViewRegister', [])
    .component(ViewRegisterComponent.name, new ViewRegisterComponent);
