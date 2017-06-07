'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('PageDeGardeCtrl', ['$scope', '$cookies', 'UtilisateurFactory', '$location', 
	function ($scope, $cookies, UtilisateurFactory, $location) {

		// Si connecté
		if(($cookies.get('idU') !== undefined)){
	
			$scope.user = {};
			$scope.user.id = $cookies.get('idU');
			
			// Utilisateur
			UtilisateurFactory.get({'idU' : $scope.user.id}).$promise.then(function(dataUtil) {
				$scope.user.nom = dataUtil.nom;
				$scope.user.prenom = dataUtil.prenom;
				$scope.annoncesCrees = dataUtil.annoncesCreees;
				$scope.annoncesCandidatees = dataUtil.annoncesCandidatees;
		   });	

		} else {
            //Non connecté
            $location.path('/');
        }
	   
	}
]);
