'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$rootScope', '$http', '$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion', '$window', 'AuthentificationFactory',
      function ($rootScope, $http, $location, $scope, $cookies, ProfilFactory, Connexion, $window, AuthentificationFactory) {
    $scope.data = {};

    $scope.seConnecterF = function () {
		var nomUtil = $scope.data.nomUtil;
		var mdpUtil = $scope.data.password;
		
		var authenticated = false;
        
        if(nomUtil!==undefined){
	
			this.user = undefined;
			var requestParams = {};

			var headers = {
				authorization: 'Basic ' + btoa(nomUtil + ":" + mdpUtil)
			};
			var requestParams = {headers: headers};

			$http.get('http://localhost:8080/api/seConnecter', requestParams).then(function (response) {
				this.user = response.data;
				$rootScope.authenticated = true;
				
				ProfilFactory.get({'pseudoU' : nomUtil}).$promise.then(function(data) {

					$cookies.put('idU', data.id);
					Connexion.setUser(data.id);
					
					$location.path('/compte');
				
				}).catch(function() {
					$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
					/** redirection page principale **/
					$location.path('/');
				});
				
			}.bind(this));
			
			angular.isDefined(this.user);

            //GET
			

				
        }else{
            $window.alert("Aucun utilisateur renseigné!");
        }

	  };	
    
}]);