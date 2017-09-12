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

  .controller('MainCtrl', function ($scope, $mdDialog, $http, configCtrl) {
    var apiAddress = configCtrl.apiAddress
    //switch demo mqtt on off
    $scope.message = 'false';
    //switch demo mqtt on off
    $scope.message = 'false';
    //**********************************run actions manual***************************//


    //light
    $scope.light_on = function () {
      runActionManual('light_on')
    }
    $scope.light_off = function () {
      runActionManual('light_off')
    }
    //cool
     $scope.cool_on = function () {
      runActionManual('cool_on')
    }
    $scope.cool_off = function () {
      runActionManual('cool_off')
    }

    //co
    $scope.co_on = function () {
      runActionManual('co_on')
    }
    $scope.co_off = function () {
      runActionManual('co_off')
    }



    //water
    $scope.water2_on = function () {
      runActionManual('water2_on')
    }
    $scope.water2_off = function () {
      runActionManual('water2_off')
    }
    $scope.water1_on = function () {
      runActionManual('water1_on')
    }
    $scope.water1_off = function () {
      runActionManual('water1_off')
    }

    //vent
    $scope.vent1_on = function () {
      runActionManual('vent1_on')
    }
    $scope.vent1_off = function () {
      runActionManual('vent1_off')
    }
    $scope.vent2_off = function () {
      runActionManual('vent2_off')
    }
    $scope.vent2_on = function () {
      runActionManual('vent2_on')
    }

    //hum
    $scope.humidity_status = function () {
      runActionManual('hum_status')
    }
    $scope.humidity_on = function () {
      runActionManual('hum_off')
    }
     $scope.humidity_off = function () {
      runActionManual('hum_on')
    }
    $scope.hum_on = function () {
      runActionManual('hum_on')
    }
     $scope.hum_off = function () {
      runActionManual('hum_off')
    }

    function runActionManual(ActionName) {

      var action = {

        "name": ActionName,
        "lastrun": 0,
        "runseq": "every"
      }

      $http({
        url: apiAddress + '/runAction',
        method: "POST",
        data: action
      })
    }
    //**********************************run actions manual***************************//


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
          url: apiAddress + '/runAction',
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
    $scope.chartsXtimesstamp = []
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
    //*******************get log data*************************************


    //SET TIME TEMPERALY IN HOURS
    $scope.selectedTimeRange =  $scope.selectedTimeRange || 2;
    
    $http.post(apiAddress + '/getactionsnames')
      .then(function (responce) {
        var allActions = responce.data
        console.log("allActions:", allActions)
        var chartData = {};


        //get Log Data
        var dateFrom = new Date();
        
        
        //SET TIME RANGE FOR CHARTS ETC........
        dateFrom.setHours(dateFrom.getHours() - $scope.selectedTimeRange);
        //SET TIME RANGE FOR CHARTS ETC........


        //    console.log(dateFrom)
        //   console.log(Date(Math.floor(Date.now())))
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA From:", Date(dateFrom), "To:", Date(Math.floor(Date.now())))


//**********************get Log DATA***********************************
 //setInterval(function () {
        $http({
            url: apiAddress + '/getlogdata',
            method: "POST",
            data: {
              from: Math.floor(dateFrom.getTime()) / 1000, // minus 2 hours
              to: Math.floor(Date.now()) / 1000 //now,
            }
          })

          .then(function (allActionsLogData) {
            console.log("allActionsLogData:", allActionsLogData)
            var allActionsLogData = allActionsLogData.data

            for (var singleAction in allActions) {
              parseResforCharts(allActionsLogData, allActions[singleAction])
            }
            console.log(chartData)

            function parseResforCharts(allResults, stringToParse) {
              chartData[stringToParse] = []
              $scope.chartsXtimesstamp[stringToParse] = []
              //charts X timestamp
            // 
              for (var thisResult in allResults) {
                (function (thisResult) {
                  if (allActionsLogData[thisResult][stringToParse] != undefined) {
                    
                    
                    chartData[stringToParse].push(allActionsLogData[thisResult][stringToParse])

                    var myDate = new Date((allActionsLogData[thisResult].timestamp)*1000);
                    
                    var minutes = myDate.getMinutes();
                    var hours = myDate.getHours();

                    $scope.chartsXtimesstamp[stringToParse].push(hours+":"+minutes)
                    console.log("RECIVED DATA",$scope.chartsXtimesstamp)
                 //   $scope.chartsXtimesstamp = [1,2,3,4,5,6,7,8]
                  }
                })(thisResult)
              }

              $scope.chartData = chartData
            }

         // },30000)


          })



      })
      //**********************get Log DATA***********************************




    //*******************get log data*************************************
    /*
    setInterval(function () {
      $http.get(apiAddress + '/getAllLog').then(function (response) {
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
*/

  });
