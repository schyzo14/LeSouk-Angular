'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:detailAnnonceCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
  .controller('detailAnnonceCtrl', ['$scope', '$routeParams', 'AnnonceFactory', '$location', 'UtilisateurFactory',
    function ($scope, $routeParams, AnnonceFactory, $location, UtilisateurFactory) {
        var idU = /*$routeParams.idU*/ 1;
        var dateCreatAnn = "";
        var idCreat = "";
        var idCand = "";
        var prixCandidat = 0;
        var idA = $routeParams.idA;
      
        /** Récupération éléments annonce**/
        //GET
        AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
            
            $scope.nomAnnonce = data.nomA;
            $scope.descrAnnonce = data.descriptionA;
            $scope.prixAnnonce = data.prixA;
            $scope.dateCreatAnnonce = ""; 
            dateCreatAnn = data.dateCreaA;
            console.log("dateCreatAnn : "+dateCreatAnn);
            $scope.etatAnnonce = data.etatA;
            idCreat = data.idUCreateur;
            idCand = data.idUCandidat;
            prixCandidat = data.prixCandidat;
            
            //Pour test : $scope.etatAnnonce="Cloturee";
            if($scope.etatAnnonce=="Active" || $scope.etatAnnonce=="Optionnée") {
                
                //Affichage des boutons CLoturer et Optionnée que si Active
                if($scope.etatAnnonce==="Active"){
                    $scope.boutonProp=true;
                    $scope.boutonCloturer=true;
                }else{
                    $scope.boutonProp=false;
                    $scope.boutonCloturer=true;
                }
                
                $scope.cloturee = false;
                if(idU==idCand){
                    /**Utilisateur = Candidat ==> Logo**/
                    $scope.icone = true;
                }
                
                if(idU==idCreat)
                {
                    /**Utilisateur = Annonceur ==> Lieu + Prix proposé + Date création du candidat**/
                    /** Récupération éléments Utilisateur candidat**/
                    //GET
                    if(idCand!=null){
                        UtilisateurFactory.get({'idU' : idCand}).$promise.then(function(data) {
                            $scope.lieuAnnonce = data.ville+" - "+data.pays;
                            $scope.dateCandidature = data.dateCandidat;
                            if(prixCandidat==null){                       
                                $scope.prixProposeAnnonce="Aucun prix";
                            }else{
                                $scope.prixProposeAnnonce = prixCandidat;
                            }
                            
                        });
                        
                        $scope.annonceCoursUtilAnnonceur = true;
                        $scope.aucunCandidat=false;
                    }else{
                        console.log("aucun candidat");
                        //Aucun candidat
                        $scope.annonceCoursUtilAnnonceur = false;
                        $scope.aucunCandidat=true;
                    }                   
                    
                    
                }
            }else{
                //Annonce cloturee
                $scope.icone=false;
                $scope.annonceCoursUtilAnnonceur = false;
                $scope.aucunCandidat=false;
                $scope.cloturee = true;
                $scope.boutonCloturer=false;
                $scope.boutonProp=false;
                
                if(idU==idCand){
                    /** Récupération éléments Utilisateur annonceur**/
                    //GET
                    idCreat=1; //Pour test
                    if(idCreat!=null){
                        UtilisateurFactory.get({'idU' : idCreat}).$promise.then(function(data) {
                            $scope.annonceur = data.pseudo;
                        });
                    }
                }
                
                if(idU==idCreat){
                    /** Récupération éléments Utilisateur candidat**/
                    //GET
                    idCand=1; //Pour test
                    if(idCand!=null){
                        UtilisateurFactory.get({'idU' : idCand}).$promise.then(function(data) {
                            $scope.candidat = data.pseudo;
                        });
                    }
                }
            }
            
            //Affichage des commentaires de l'annonce
            $scope.commentaire = data;
        });
    
        
        
        /** Reste à faire : 
         - Affichage des commentaires de l'annonce
         - Gestion des dates (serveur)
        **/
        

  }]);