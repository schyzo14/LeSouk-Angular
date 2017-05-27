'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # propositionAchatCtrl
 * Controller of PropositionAchat
 */
angular.module('leSoukApp')
  .controller('propositionAchatCtrl', ['$scope', '$routeParams', '$window', 'AnnonceFactory', 'CandidaterAnnonceFactory',
	function ($scope, $routeParams, $window, AnnonceFactory, CandidaterAnnonceFactory) {
    var idA = $routeParams.idA;

    AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
      $scope.annonce = data;
      console.log(data);
    });

    $scope.submit = function() {
      if($scope.prixCandidat) {
        $scope.annonce.prixCandidat = $scope.prixCandidat;
        $scope.annonce.idUCandidat = 1;
        console.log("prix saved : " + $scope.annonce.prixCandidat);

        CandidaterAnnonceFactory.update({'idA' : $scope.annonce.idA}, $scope.annonce)
        .$promise.then(function() {
          console.log("Enregistrement good");
          $window.location.href = '#!/detailAnnonce/'+idA;
        });
      } else {
        $window.alert("Veuillez faire une proposition");
      }
    }
  }
]);
