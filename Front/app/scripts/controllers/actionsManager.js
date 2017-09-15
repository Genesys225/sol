'use strict';

/**
 * @ngdoc function
 * @name sol2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sol2App
 */
angular.module('sol2App')
  .controller('actionsManager', function ($scope, $http, configCtrl, moment) {
    $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', $scope.exampleDate)
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
    var apiAddress = configCtrl.apiAddress

    $scope.lastrun = {}
    $scope.runtime = {}

    $http.get(apiAddress + '/getActions')
      .then(function (response) {
        $scope.actions = response.data

        console.log("DATEEEEE", $scope.actions)

        for (var action in $scope.actions) {
 //parseInt((new Date($scope.actions[action].lastrun).getTime() / 1000).toFixed(0))
          $scope.lastrun[($scope.actions[action]._id)] = new Date($scope.actions[action].lastrun * 1000);
          $scope.runtime[($scope.actions[action]._id)] =  new Date($scope.actions[action].runtime * 1000);
        }
        console.log("DATEEEEE", $scope.timers)

        function getMin() {

        }





        $scope.getNextRun = function (lastRun, runTime, runSeq) {
          if (runSeq == 'every') {


            console.log('NEXT RUNNNNN:', myDiff, 'DATE1', lastRun, 'DATE2', new Date, (runTime.getHours() * 60) + runTime.getMinutes())
            var a = moment(new Date); //now
            var b = moment(new Date(lastRun));
          //  console.log('RUN EVERY in min:', (runTime.getHours() * 60) + runTime.getMinutes())
          //  console.log('LAST RUN:', lastRun)
          //  console.log('DIFF IN MIN:', a.diff(b, 'minutes'))
          //  console.log('RUN:', a.diff(b, 'minutes') > (runTime.getHours() * 60) + runTime.getMinutes())
            var myDiff = a.diff(b, 'minutes')
            console.log() // 44700
         //   console.log(a.diff(b, 'hours')) // 745
        //    console.log(a.diff(b, 'days')) // 31
         //   console.log(a.diff(b, 'seconds')) // 4
           var nextRunInMin =  (runTime.getHours() * 60) + runTime.getMinutes()-a.diff(b, 'minutes');
           var newD = new Date()
           newD.setMinutes(newD.getMinutes()+nextRunInMin)
          // return newD
            return moment(newD).fromNow() //myDiff//.fromNow()
            /*



                        console.log('NEXT RUNNNNN:',runTime,runTime.getMinutes(), runTime.getHours())
                       return  moment(dateNow).add(runTime.getHours(), 'hours').add(runTime.getMinutes(), 'minutes').fromNow();
                        //return moment(lastRunMoment, 'seconds').add(hoursToadd, 'hours').add(minsToadd, 'minutes').fromNow(); // 6 years ago

            */

          } else if (runSeq == 'in') {
            var lastRunMoment = moment.unix(lastRun)
            runTime = new Date(runTime)
            var minsToadd = runTime.getMinutes()
            var hoursToadd = runTime.getHours()

            var dateNow = new Date();
            lastRunMoment = moment().hours(hoursToadd).minutes(minsToadd)
            var runMinAgo = ((lastRunMoment.diff(moment()) / 1000) / 60) * -1
            //   return moment(lastRunMoment, 'seconds').add(hoursToadd, 'hours').add(minsToadd, 'minutes').fromNow(); // 6 years ago

            return lastRunMoment.fromNow() //.diff(moment())//.fromNow()
          }
        }

        //       $scope.timers = {}
        for (var action in $scope.actions) {
          //$scope.action[action].runtime = new Date($scope.actions[action].runtime * 1000);
          //console.log("DATEEEEE",$scope.action[action].runtime)
          // $scope.actions[action].runtime         
          /*
            $scope.$watch($scope.actions[action].runtime, function (newDate) {
          var date = new Date($scope.actions[action].runtime * 1000);
             $scope[action].rtime = date //$filter('date')(newDate, 'HH:mm', 'UTC'); 
          });


          $scope.$watch($scope.actions[action].rtime, function (newDate) {
             var date = parseInt((new Date($scope.actions[action].rtime).getTime() / 1000).toFixed(0))
             $scope.actions[action].runtime = date //$filter('date')(newDate, 'HH:mm', 'UTC'); 
          });
          */

          moment('2012.08.10', 'YYYY.MM.DD').unix();
          parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))

          ///  $scope.actions[action].runtime = new Date($scope.actions[action].runtime);
          //  $scope.actions[action].lastrun = new Date($scope.actions[action].lastrun);
          /*
                  
                    $scope.actions[action].runtime.getMinutes()
                    console.log("NEXT EVERY", $scope.actions[action].runtime.getMinutes(), $scope.actions[action].lastrun);
                    var lastrun = new Date($scope.actions[action].lastrun);
                    console.log("NEXT LAST RUN", lastrun);
                    console.log("NEXT NOW", $scope.now.getMinutes());
                    var minAgo = ($scope.actions[action].lastrun.getHours() * 60) + ($scope.actions[action].lastrun.getMinutes()) // last run min ago
                    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', minAgo, $scope.actions[action].lastrun.getHours() * 60), ($scope.actions[action].lastrun.getMinutes())
                    var nextRun = ($scope.actions[action].runtime.getHours() * 60) + ($scope.actions[action].runtime.getMinutes()) - minAgo
          */
          /*
          function diff(start, end) {

            start = start.split(":");
            end = end.split(":");
            console.log(start, end)
            var startDate = new Date(0, 0, 0, start[0], start[1], 0);
            var endDate = new Date(0, 0, 0, end[0], end[1], 0);
            var diff = endDate.getTime() - startDate.getTime();
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);

            // If using time pickers with 24 hours format, add the below line get exact hours
            if (hours < 0)
              hours = hours + 24;

            return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
          }
          var lll = moment($scope.actions[action].lastRun);

          var runMinAgo = ((lll.diff(moment()) / 1000) / 60) * -1
          
 */
          //console.log("NEXT RUUUUUUN", runMinAgo);
          // console.log()
        }

      })
    setInterval(function () {
      $http.get(apiAddress + '/getActions')
        .then(function (response) {
          var actions = response.data
             for (var action in actions) {
 //parseInt((new Date($scope.actions[action].lastrun).getTime() / 1000).toFixed(0))
          $scope.lastrun[($scope.actions[action]._id)] = new Date(actions[action].lastrun * 1000);
         // $scope.runtime[($scope.actions[action]._id)] =  new Date(actions[action].runtime * 1000);
         //  $scope.lastrun = actions[action].lastrun;
       //   $scope.runtime[($scope.actions[action]._id)] =  actions[action].runtime;
       $scope.actions[action].lastrun = actions[action].lastrun;
       $scope.actions[action].runtime = actions[action].runtime;
        }
          for (var action in actions) {
            //actions[action].lastrun = $scope.actions[action].lastrun
          }

        })
    }, 10000)

    //*******************************************
    $scope.now = new Date()
    $scope.pickerDate = new Date();
    $scope.setEvery = function (pickerValue, actionIndex) {
      $scope.actions[actionIndex].runtime = pickerValue.getHours() + ":" + pickerValue.getMinutes();
    }
    $scope.setoClock = function (pickerValue, actionIndex) {
      $scope.actions[actionIndex].runtime = pickerValue.getHours() + ":" + pickerValue.getMinutes() + " oclock"
    }
    $scope.formatActionDate = function (thisData, newData) {
      thisData = newData
    }





    //GET ACTIONS

    function getActionsList() {
      var promise = new Promise(function (resolve, reject) {


        $http({
            url: apiAddress + '/getactionsnames',
            method: "POST",
            data: []
          })

          .then(function (response) {
            $scope.avalibleActions = response.data
            resolve(actionsArray)
          })
      })
      return promise
    }
    getActionsList()





    //*******************************************
    $scope.subbmitAction = function (action) {
      //action.runtime = parseInt((new Date(action.runtime).getTime() / 1000).toFixed(0))
      //action.runtime =new Date.parse( action.runtime).getTime()/1000

      //    for (var action in $scope.actions) {
      //$scope.actions[action].runtime =  parseInt((new Date( $scope.timers[action]).getTime() / 1000).toFixed(0))
      //   $scope.timers[action] = new Date($scope.actions[action].runtime * 1000);

      //      }
      action.runtime = parseInt((new Date($scope.runtime[action._id]).getTime() / 1000).toFixed(0))


      $http({
          url: apiAddress + '/setActions',
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

    $scope.runActionForce = function (action) {
      action.lastrun = 0;
      $http({
          url: apiAddress + '/setActions',
          method: "POST",
          data: [action]
        })

        .then(function (response) {

        })

    }

    $scope.subbmit = function () {
      $http({
          url: apiAddress + '/setActions',
          method: "POST",
          data: $scope.actions
        })

        .then(function (response) {

        })
      console.log($scope.actions)
    }


  });
