'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:MainCtrl
* @description
* # propositionAchatCtrl
* Controller of PropositionAchat
*/
angular.module('leSoukApp')
.controller('propositionAchatCtrl', ['$scope', '$routeParams', '$window', 'AnnonceFactory', 'CandidaterAnnonceFactory', 'UtilisateurFactory', '$cookies', '$location',
function ($scope, $routeParams, $window, AnnonceFactory, CandidaterAnnonceFactory, UtilisateurFactory, $cookies, $location) {
  var idA = $routeParams.idA;

  //Récupération de l'annonce
  AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
    $scope.annonce = data;
  });

  $scope.submit = function() {
    //Si un prix a été saisi
    if($scope.prixCandidat) {
      //Récupération de l'utilisateur
      UtilisateurFactory.get({'idU' : $cookies.get('idU')}).$promise.then(function(dataUtil) {
        $scope.annonce.prixCandidat = $scope.prixCandidat;
        $scope.annonce.candidat = dataUtil;

        //Mise à jour de l'annonce
        CandidaterAnnonceFactory.update({'idA' : $scope.annonce.idA}, $scope.annonce)
        .$promise.then(function() {
          //Retour à l'annonce
          $window.location.href = '#!/detailAnnonce/'+idA;
        });
      });
    } else {
      $window.alert("Veuillez faire une proposition");
    }
  }
}
]);
