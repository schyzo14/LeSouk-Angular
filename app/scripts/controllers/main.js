'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('MainCtrl', ['$scope', 'AnnoncesCreesFactory', 'AnnoncesCandidateesFactory',
	function ($scope, AnnoncesCreesFactory, AnnoncesCandidateesFactory) {

		$scope.data = {};
		$scope.data.id = 1;
		
		// Evenements crees
		AnnoncesCreesFactory.query({'idU' : $scope.data.id}).$promise.then(function(data) {
			$scope.annoncesCrees = data;
		});
		
		// Evenements candidates
		AnnoncesCandidateesFactory.query({'idU' : $scope.data.id}).$promise.then(function(data) {
			$scope.annoncesCandidatees = data;
		});
	
	}
]);
