'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:CloturerAnnonceCtrl
 * @description
 * # CloturerAnnonceCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('cloturerAnnonceCtrl', ['$scope', '$routeParams', '$window', 'AnnonceFactory', 'UtilisateurFactory', 'CloturerAnnonceFactory',
	function ($scope, $routeParams, $window, AnnonceFactory, UtilisateurFactory, CloturerAnnonceFactory) {
    AnnonceFactory.get({'idA' : $routeParams.idA}).$promise.then(function(data) {
      $scope.annonce = data;
      console.log(data);
      $scope.user = data.candidat;
    });

    $scope.submit = function() {
      CloturerAnnonceFactory.update({'idA' : $scope.annonce.idA}, $scope.annonce)
      .$promise.then(function() {
        console.log("Annonce cloturée");
        $window.location.href = '#!/detailAnnonce/'+$routeParams.idA;
      });
    }
	}
]);
