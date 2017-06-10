'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:creerAnnonceCtrl
* @description
* # creerAnnonceCtrl
* Controller of the leSoukApp
*/
angular.module('leSoukApp')
.controller('creerAnnonceCtrl', ['$scope', '$location', '$cookies', 'creerAnnonceFactory','$window', 'UtilisateurFactory',
function ($scope, $location, $cookies, creerAnnonceFactory, $window, UtilisateurFactory) {
  //Gestion du bouton créer
  $scope.submit = function() {
    //Si connecté et que tous les champs ont été renseignés
    if($scope.nomAnnonce!==undefined && $scope.comment!==undefined && $scope.prixAnnonce!==undefined){

      // récupère l'utilisateur
      UtilisateurFactory.get({'idU' : $cookies.get('idU')}).$promise.then(function(dataUtil) {
        // Création de la variable Annonce
        var annonce = new creerAnnonceFactory({
          createur : dataUtil,
          nomA : $scope.nomAnnonce,
          descriptionA: $scope.comment,
          prixA: $scope.prixAnnonce

        });

        // on fait un post pour créer l'annonce
        annonce.$save(function success(){
          // renvoyer sur la page de garde
          $location.path('/compte');
        }, function error(){
          $window.alert("Echec lors de la création de l''annonce !");
        });
      });


    }else{
      $window.alert('Les champs sont obligatoires');
    }
  };
}]);
