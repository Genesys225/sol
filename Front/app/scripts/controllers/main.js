'use strict';

/**
 * @ngdoc function
 * @name sol2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sol2App
 */
angular.module('sol2App')
  .controller('MainCtrl', function ($scope) {
 
  });






angular.module('sol2App')

  .controller('MainCtrl', function ($scope, $mdDialog, $http) {
     var apiAddress = 'http://10.0.0.7:3000'
    //switch demo mqtt on off
    $scope.message = 'false';
   //switch demo mqtt on off
    $scope.message = 'false';

    $scope.onChange = function (cbState) {
      $scope.message = cbState;
    };
    //switch demo mqtt on off
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.onChange = function (cbState) {

      if (cbState) {
        var actionToRun = {
          "name": "switchOff",
          "lastrun": 1495534259.319,
          "status": "active",
          "runtime": "1",
          "params": {
            "timeToRun": "3000"
          }
        }
      } else {

        var actionToRun = {
          "name": "switchOn",
          "lastrun": 1495534259.319,
          "status": "active",
          "runtime": "1",
          "params": {
            "timeToRun": "3000"
          }
        }

      }

      $http({
          url: apiAddress+'/runAction',
          method: "POST",
          data: actionToRun
        })

        .then(function (response) {
          console.log(response)
        })
      console.log(cbState, 1111)
      $scope.message = cbState;
    };
    //switch demo mqtt on off
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.imagePath = 'img/washedout.png';
    $scope.co2 = ''
    $scope.xxx = 5555

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{
      yAxisID: 'y-axis-1'
    }, {
      yAxisID: 'y-axis-2'
    }];
    $scope.options = {
      scales: {
        yAxes: [{
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    setInterval(function () {
      $http.get(apiAddress+'/getAllLog').then(function (response) {
        console.log(response, 55555555)
        $scope.ResData = response.data;
        var coChartData = []
        var tempChartData = []
        var huChartData = []
        var lightChartData = []
        var allResultsForCarts = []


        var arrayForCHarts = ['co', 'light', 'hu', 'temp']
        for (var singleRes in arrayForCHarts) {
          parseResforCharts($scope.ResData, arrayForCHarts[singleRes])
        }


        function parseResforCharts(allResults, stringToParse) {
          allResultsForCarts[stringToParse] = []
          for (var thisResult in allResults) {
            (function (thisResult) {
              if (response.data[thisResult][stringToParse] != undefined) {
                allResultsForCarts[stringToParse].push(response.data[thisResult][stringToParse])
              }
            })(thisResult)
          }
        }





        $scope.coData = allResultsForCarts['co'];
        $scope.tempData = allResultsForCarts['temp'];
        $scope.huData = allResultsForCarts['hu'];
        $scope.lightData = allResultsForCarts['light'];


        console.log(allResultsForCarts)
        angular.extend(inbox, response.data);
      })
    }, 3000)

    var inbox = {};

    angular.module("sol2App").controller("LineCtrl", function ($scope) {

    });


  });
