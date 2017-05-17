'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:detailAnnonceCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
  .controller('detailAnnonceCtrl', ['$scope', '$routeParams', 'AnnonceFactory', '$location',
    function ($scope, $routeParams, AnnonceFactory, $location) {
        var idU = $routeParams.idU;
        var villeU = $routeParams.villeU;
        var paysU = $routeParams.paysU;
        var dateCreatAnn = "";
        var idCreat = "";
        var idCand = "";
        var prixCandidat = 0;
        var idA = $routeParams.idA;
        console.log(idA);
      
        /** Récupération éléments annonce**/
        //GET
        AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
            $scope.nomAnnonce = data.nomA;
            $scope.descrAnnonce = data.descriptionA;
            $scope.prixAnnonce = data.prixA;
            $scope.dateCreatAnnonce = ""; 
            dateCreatAnn = data.dateCreaA;
            $scope.etatAnnonce = data.etatA;
            idCreat = data.idUCreateur;
            idCand = data.idUCandidat;
            prixCandidat = data.prixCandidat;
            
            if($scope.etatAnnonce=="Active" || $scope.etatAnnonce=="Optionnee") {
                console.log("Annonce active ou optionnee!");
                if(idU==idCand){
                    console.log("Utilisateur = Candidat ==> Logo");
                }
            
                if(idU==idCreat)
                {
                    console.log("Utilisateur = Annonceur ==> Lieu + Prix proposé + Date création Candidature");
                }
            }else{
                console.log("Annonce cloturee");
                if(idU==idCand){
                    console.log("afficher identité candidat");
                }
            
                if(idU==idCreat){
                    console.log("afficher identité créateur");
                }
        }
            
            
        });
    
        
        
        /** Reste à faire : 
         - Affichage des informations suivant état de l'annonce
         - Affichage des commentaires de l'annonce
         - Tester 
        **/
        

  }]);