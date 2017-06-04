'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SeConnecterCtrl
 * @description
 * # SeConnecterCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
    .controller('SeConnecterCtrl', ['$location', '$scope', '$cookies', 'ProfilFactory', 'Connexion', '$window', 'AuthentificationFactory',
      function ($location, $scope, $cookies, ProfilFactory, Connexion, $window, AuthentificationFactory) {
    $scope.data = {};

    $scope.seConnecterF = function () {
			var nomUtil = $scope.data.nomUtil;
            var mdpUtil = $scope.data.password;
			
			var authenticated = false;
        
        if(nomUtil!==undefined){
			
			var info = btoa(nomUtil + ":" + mdpUtil);
			
			var auth = new AuthentificationFactory({
						data : info
					 });
			auth.$save(function(data) {
				
				if (data.name) {
					authenticated = true;
				} else {
					authenticated = false;
				}
				
				alert(authenticated);
				alert(data);
			
            //GET
				ProfilFactory.get({'pseudoU' : nomUtil}).$promise.then(function(data) {
					var mdpU = data.mdp;
					var idU = data.id;
					
					if(mdpU===mdpUtil){
						$cookies.put('idU', idU);
						Connexion.setUser(idU);
						
						$location.path('/compte');
					}else{
						$window.alert("GET foireux");
					}
					
				}).catch(function() {
					$window.alert("L'utilisateur "+nomUtil+" n'existe pas.");
					/** redirection page principale **/
					$location.path('/');
				});

				
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