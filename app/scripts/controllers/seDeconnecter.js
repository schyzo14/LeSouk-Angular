'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:SeDeConnecterCtrl
 * @description
 * # SeDeConnecterCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('SeDeconnecterCtrl', ['$location', '$scope', '$cookies', 'Connexion', '$http', '$rootScope',
    function ($location, $scope, $cookies, Connexion, $http, $rootScope) {
		
        // Suppression du cookies
		$cookies.remove('idU');
		Connexion.setUser(null);

        // Mise à jour côté serveur de l'authentification
		$http.post('http://localhost:8080/logout', {}).finally(function () {
			// Suppresion coté client de toutes les traces de connexion
			delete this.user;
			$rootScope.authenticated = false;
			angular.isDefined(null);
			$cookies.remove('remember-me');
			$cookies.remove('JSESSIONID');
		}.bind(this));
		
        // Redirection sur la page de connexion
		$location.path('/');
		
    }]);