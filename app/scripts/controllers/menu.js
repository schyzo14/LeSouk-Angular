'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
  .controller('MenuCtrl', ['$scope', '$window', '$cookies', 'Connexion',
      function ($scope, $window, $cookies, Connexion) {
    $scope.user = Connexion;

    $scope.submit = function() {
      if($scope.search) {
        $window.location.href = '#!/recherche/'+$scope.search;
      } else {
        alert("Veuillez saisir des mots-clés");
      }
    }
  }]);
