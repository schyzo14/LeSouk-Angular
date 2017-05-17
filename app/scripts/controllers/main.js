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
		AnnoncesCreesFactory.get({'idU' : $scope.data.id}).$promise.then(function(data) {
			$scope.annonceCrees = data;
		});
		
		// Evenements candidates
		AnnoncesCandidateesFactory.get({'idU' : $scope.data.id}).$promise.then(function(data) {
			$scope.annonceCandidatees = data;
		});
	
	}
]);
