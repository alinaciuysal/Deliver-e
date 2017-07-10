/**
 * Created by Melih Berçin on 6/16/2017.
 */
'use strict';

import angular from 'angular';

import ViewProfileComponent from './view-profile.component.js';

export default angular.module('ViewProfile', [])
    .component(ViewProfileComponent.name, new ViewProfileComponent)
