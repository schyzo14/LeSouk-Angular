'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:CloturerAnnonceCtrl
* @description
* # CloturerAnnonceCtrl
* Controller of the leSoukApp
*/
angular.module('leSoukApp')
.controller('cloturerAnnonceCtrl', ['$scope', '$routeParams', '$window', 'AnnonceFactory', 'UtilisateurFactory', 'CloturerAnnonceFactory', '$cookies', '$location',
function ($scope, $routeParams, $window, AnnonceFactory, UtilisateurFactory, CloturerAnnonceFactory, $cookies, $location) {
  //Récupération de l'annonce
  AnnonceFactory.get({'idA' : $routeParams.idA}).$promise.then(function(data) {
    $scope.annonce = data;
    $scope.user = data.candidat;
  });

  //Mise à jour de l'annonce pour la cloturer
  $scope.submit = function() {
    CloturerAnnonceFactory.update({'idA' : $scope.annonce.idA}, $scope.annonce)
    .$promise.then(function() {
      $window.location.href = '#!/detailAnnonce/'+$routeParams.idA;
    });
  }
}
]);
