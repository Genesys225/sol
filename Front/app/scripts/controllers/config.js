'use strict';

/**
 * @ngdoc function
 * @name sol2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sol2App
 */
angular.module('sol2App')
  .service('configCtrl', function () {
    this.apiAddress = '';
    return this
  });
