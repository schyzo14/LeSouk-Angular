'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$rootScope', '$http', '$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion', '$window',
      function ($rootScope, $http, $location, $scope, $cookies, ProfilFactory, Connexion, $window) {
    $scope.data = {};

	// Quand on clique sur le bouton "Se connecter"
    $scope.seConnecterF = function () {
        // Récupération des champs saisis
		var nomUtil = $scope.data.nomUtil;
		var mdpUtil = $scope.data.password;
		
		$rootScope.authenticated = false;
        
		// Si un pseudo est saisie
        if(nomUtil!==undefined){
	
			this.user = undefined;
			var requestParams = {};

			// Header avec nom et le mdp cryptés en Base64
			var headers = {
				authorization: 'Basic ' + btoa(nomUtil + ":" + mdpUtil)
			};
			var requestParams = {headers: headers};

            // Test de l'authentification côté serveur
			$http.get('http://localhost:8080/api/seConnecter', requestParams)
				.then(function (response) {
					// On enregistre sur le client qu'on est identifié
					this.user = response.data;
					$rootScope.authenticated = true;
					angular.isDefined(this.user);
					
					// Si l'authentification a fonctionné, on récupére l'utilisateur avec son pseudo
					ProfilFactory.get({'pseudoU' : nomUtil}).$promise.then(function(data) {
						
						// On garde l'id de l'utilisateur dans un Cookie
						$cookies.put('idU', data.id);
						Connexion.setUser(data.id);
						
						// On est redirigé sur la page de garde
						$location.path('/compte');
					
					}).catch(function() {
						$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
						// redirection page de connexion
						$location.path('/');
					});
				}
				.bind(this))
				.catch(function (response) {
					$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
					// redirection page de connexion
					$location.path('/');
				});
				
				
        }else{
            $window.alert("Aucun utilisateur renseigné!");
        }

	  };	
    
}]);