'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$rootScope', '$http', '$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion', '$window',
      function ($rootScope, $http, $location, $scope, $cookies, ProfilFactory, Connexion, $window) {
    $scope.data = {};

    $scope.seConnecterF = function () {
		var nomUtil = $scope.data.nomUtil;
		var mdpUtil = $scope.data.password;
		
		$rootScope.authenticated = false;
        
        if(nomUtil!==undefined){
	
			this.user = undefined;
			var requestParams = {};

			var headers = {
				authorization: 'Basic ' + btoa(nomUtil + ":" + mdpUtil)
			};
			var requestParams = {headers: headers};

			$http.get('http://localhost:8080/api/seConnecter', requestParams)
				.then(function (response) {
					this.user = response.data;
					$rootScope.authenticated = true;
					angular.isDefined(this.user);
					
					ProfilFactory.get({'pseudoU' : nomUtil}).$promise.then(function(data) {

						$cookies.put('idU', data.id);
						Connexion.setUser(data.id);
						
						$location.path('/compte');
					
					}).catch(function() {
						$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
						/** redirection page principale **/
						$location.path('/');
					});
				}
				.bind(this))
				.catch(function (response) {
					$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
					/** redirection page principale **/
					$location.path('/');
				});
				
				
        }else{
            $window.alert("Aucun utilisateur renseigné!");
        }

	  };	
    
}]);