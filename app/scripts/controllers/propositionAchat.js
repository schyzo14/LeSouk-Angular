'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # propositionAchatCtrl
 * Controller of PropositionAchat
 */
angular.module('leSoukApp')
  .controller('propositionAchatCtrl', ['$scope', '$routeParams', '$window', 'AnnonceFactory', 'CandidaterAnnonceFactory', 'UtilisateurFactory', '$cookies',
	function ($scope, $routeParams, $window, AnnonceFactory, CandidaterAnnonceFactory, UtilisateurFactory, $cookies) {
    var idA = $routeParams.idA;

    AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
      $scope.annonce = data;
      console.log(data);
    });

    $scope.submit = function() {
      if($scope.prixCandidat) {
		  UtilisateurFactory.get({'idU' : $cookies.get('idU')}).$promise.then(function(dataUtil) {
			$scope.annonce.prixCandidat = $scope.prixCandidat;
			$scope.annonce.candidat = dataUtil;
			console.log("prix saved : " + $scope.annonce.prixCandidat);

			CandidaterAnnonceFactory.update({'idA' : $scope.annonce.idA}, $scope.annonce)
			.$promise.then(function() {
			  console.log("Enregistrement good");
			  $window.location.href = '#!/detailAnnonce/'+idA;
			});
		  });
      } else {
        $window.alert("Veuillez faire une proposition");
      }
    }
  }
]);
