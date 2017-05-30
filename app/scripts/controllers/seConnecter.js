'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion', '$window',
      function ($location, $scope, $cookies, ProfilFactory, Connexion, $window) {
    $scope.data = {};

    $scope.seConnecterF = function () {
			var nomUtil = $scope.data.nomUtil;
            var mdpUtil = $scope.data.password;
        
        if(nomUtil!==undefined){
            //GET
			ProfilFactory.get({'pseudoU' : nomUtil}).$promise.then(function(data) {
				var mdpU = data.mdp;
				var idU = data.id;
                
                if(mdpU===mdpUtil){
                    $cookies.put('idU', idU);
                    Connexion.setUser(idU);
                    
                    $location.path('/compte');
                }else{
                    $window.alert("Couple utilisateur/mot de passe incorrect. Réessayez ! ");
                }

				
			}).catch(function() {
				$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
                /** redirection page principale **/
                $location.path('/');
            });
        }else{
            $window.alert("Aucun utilisateur renseigné!");
        }

						
    };
}]);