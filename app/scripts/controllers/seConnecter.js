'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion',
      function ($location, $scope, $cookies, ProfilFactory, Connexion) {
    $scope.data = {};

    $scope.seConnecterF = function (form) {
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
                    alert("Couple utilisateur/mot de passe incorrect. Réessayez ! ");
                }

				
			}).catch(function() {
				alert("L'utilisateur "+nomUtil+" n'existe pas.");
                /** redirection page principale **/
                $location.path('/');
            });
        }else{
            alert("Aucun utilisateur renseigné!");
        }

						
    };
}]);