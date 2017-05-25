'use strict';

/**
 * @ngdoc overview
 * @name sol2App
 * @description
 * # sol2App
 *
 * Main module of the application.
 */
angular
  .module('sol2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    "chart.js", 'ngMessages'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/actionsmanager', {
        templateUrl: 'views/actionsmanager.html',
        controller: 'actionsManager'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
