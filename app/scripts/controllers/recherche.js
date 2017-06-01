'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:RechercheCtrl
 * @description
 * # RechercheCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('RechercheCtrl', ['$scope', '$routeParams', '$cookies', 'RechercherAnnoncesFactory',
	function ($scope, $routeParams, $cookies, RechercherAnnoncesFactory) {
    $scope.search = $routeParams.search;

    RechercherAnnoncesFactory.query({'idU' : $cookies.get('idU'), motsCles : $scope.search}).$promise.then(function(data) {
      $scope.annonces = data;
      console.log(data);
    });
	}
]);
