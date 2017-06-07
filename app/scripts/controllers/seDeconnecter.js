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
		
		$cookies.remove('idU');
		Connexion.setUser(null);

		$http.post('http://localhost:8080/logout', {}).finally(function () {
			delete this.user;
			$rootScope.authenticated = false;
			angular.isDefined(null);
			$cookies.remove('remember-me');
			$cookies.remove('JSESSIONID');
		}.bind(this));
		
		$location.path('/');
		
    }]);