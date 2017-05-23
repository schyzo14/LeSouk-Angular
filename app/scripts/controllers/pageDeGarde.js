'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('PageDeGardeCtrl', ['$scope', '$cookies', 'AnnoncesCreesFactory', 'AnnoncesCandidateesFactory', 'UtilisateurFactory',
	function ($scope, $cookies, AnnoncesCreesFactory, AnnoncesCandidateesFactory, UtilisateurFactory) {

		$scope.user = {};
		$scope.user.id = $cookies.get('idU');
		
		// Utilisateur
		UtilisateurFactory.get({'idU' : $scope.user.id}).$promise.then(function(dataUtil) {
			$scope.user.nom = dataUtil.nom;
			$scope.user.prenom = dataUtil.prenom;
       });
	   
		// Evenements crees
		AnnoncesCreesFactory.query({'idU' : $scope.user.id}).$promise.then(function(data) {
			$scope.annoncesCrees = data;
		});
		
		// Evenements candidates
		AnnoncesCandidateesFactory.query({'idU' : $scope.user.id}).$promise.then(function(data) {
			$scope.annoncesCandidatees = data;
		});
		
	}
]);
