'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:SeDeConnecterCtrl
 * @description
 * # SeDeConnecterCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('SeDeconnecterCtrl', ['$location', '$scope', '$cookies', 'Connexion',
    function ($location, $scope, $cookies, Connexion) {
      $cookies.remove('idU');
      Connexion.setUser(null);
      $location.path('/');
    }]);