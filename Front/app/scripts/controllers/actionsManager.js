'use strict';

/**
 * @ngdoc function
 * @name sol2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sol2App
 */
angular.module('sol2App')
  .controller('actionsManager', function ($scope, $http) {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    var self = this;
    $scope.timeSelector = [
      'every 1 min',
      'every 2 min',
      'every 5 min',
      'every 10 min',
      'every 30 min',
      'every 60 min',
      '00:00 ocklock',
      '01:00 ocklock',
      '02:00 ocklock',
      '03:00 ocklock',
      '04:00 ocklock',
      '05:00 ocklock'


    ]
    $http.get('http://localhost:3000/getActions')
      .then(function (response) {

        $scope.actions = response.data
      })
    $scope.subbmitAction = function (action) {
      $http({
          url: 'http://localhost:3000/setActions',
          method: "POST",
          data: [action]
        })

        .then(function (response) {

        })

    }


    $scope.deleteAction = function () {

    }


    $scope.addAction = function (action) {
      $scope.actions.push({
        "name": "newAction",
        "lastrun": 9495708029.782,
        "status": "active",
        "runtime": "every 100min"
      })
    }



    $scope.subbmit = function () {
      $http({
          url: 'http://localhost:3000/setActions',
          method: "POST",
          data: $scope.actions
        })

        .then(function (response) {

        })
      console.log($scope.actions)
    }


  });
