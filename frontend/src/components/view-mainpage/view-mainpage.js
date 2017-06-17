'use strict';

import angular from 'angular';

import ViewMainPageComponent from './view-mainpage.component';

export default angular.module('ViewMainPage', [])
    .component(ViewMainPageComponent.name, new ViewMainPageComponent)
    .controller('mainPageCtrl', ['$scope', function($scope) {
        $scope.myInterval = 3000;

        let slides = [{
                image: 'http://lorempixel.com/400/200/'
            },
            {
                image: 'http://lorempixel.com/400/200/food'
            }
        ];

        $scope.slides = slides;
    }]);