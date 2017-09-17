'use strict';

/**
 * @ngdoc function
 * @name sol2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sol2App
 */
angular.module('sol2App')
  .controller('AboutCtrl', function ($scope,$http,configCtrl) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.item = [1,2,3,4,5,6,7,8]
    var apiAddress = configCtrl.apiAddress
    setInterval(() => {
      $http({
        url: apiAddress + '/getServerLog',
        method: "POST",
  
      })
  
      .then(function (response) {
        var liveResults = response.data
        //parse
        for(var result in liveResults){
        //  var timestamp = liveResults[result]._id.toString().substring(0,8)
        //  var date = new Date( parseInt( timestamp, 16 ) * 1000 )
        //  liveResults[result].timestamp = date

        }
        
        console.log(liveResults)
        $scope.liveResults = liveResults
      })
    },1000)
  
    
  });
