'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:MenuCtrl
* @description
* # MenuCtrl
* Controller of the leSoukApp
*/
angular.module('leSoukApp')
.controller('MenuCtrl', ['$scope', '$window', '$cookies', 'Connexion',
function ($scope, $window, $cookies, Connexion) {
  $scope.user = Connexion;

  //Fonction de recherche
  $scope.submit = function() {
    //Si mot-clé saisi
    if($scope.search) {
      $window.location.href = '#!/recherche/'+$scope.search;
    } else {
      alert("Veuillez saisir des mots-clés");
    }
  }
}]);
