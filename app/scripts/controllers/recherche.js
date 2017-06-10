'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:RechercheCtrl
* @description
* # RechercheCtrl
* Controller of the leSoukApp
*/
angular.module('leSoukApp')
.controller('RechercheCtrl', ['$scope', '$routeParams', '$cookies', 'RechercherAnnoncesFactory', 'UtilisateurFactory', 'GeoLocalisationFactory', '$location',
function ($scope, $routeParams, $cookies, RechercherAnnoncesFactory, UtilisateurFactory, GeoLocalisationFactory, $location) {
  $scope.search = $routeParams.search;

  //Récupération des résultats de la recherche
  RechercherAnnoncesFactory.query({'idU' : $cookies.get('idU'), motsCles : $scope.search}).$promise.then(function(data) {
    $scope.annonces = data;
  });

  //Tri par localisation
  $scope.trier = function() {
    var points = [];
    //Récupération des annonces dans le tableau "points"
    UtilisateurFactory.get({'idU' : $cookies.get('idU')}).$promise.then(function(dataUser) {
      angular.forEach($scope.annonces, function(value, key) {
        points = points.concat(value.createur);
      });

      //Création de la requête avec la source (user) et les points (les annonces)
      var geoLoc = new GeoLocalisationFactory({
        'source' : dataUser,
        'points' : points
      });

      //Requête post pour trier
      geoLoc.$save(function success() {
        var annoncesTriees = [];

        //Création de la nouvelle table d'annonces ordonnée
        angular.forEach(geoLoc.points, function(valueGeo, keyGeo) {
          angular.forEach($scope.annonces, function(valueA, keyA) {
            if(valueGeo.id == valueA.createur.id) {
              annoncesTriees = annoncesTriees.concat(valueA);
            }
          });
        });
        $scope.annonces = annoncesTriees;
      });
    });
  };
}
]);
