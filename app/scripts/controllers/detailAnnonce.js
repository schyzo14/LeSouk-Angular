'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:detailAnnonceCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
  .controller('detailAnnonceCtrl', ['$scope', '$routeParams', '$cookies', 'AnnonceFactory', '$location', 'UtilisateurFactory', 'Connexion',
    function ($scope, $routeParams, $cookies, AnnonceFactory, $location, UtilisateurFactory, Connexion) {
        var idU = $cookies.get('idU');
        console.log("idU detail : "+idU);
        var idCreat = "";
        var idCand = "";
        var idA = $routeParams.idA;
        
        if(idU!==undefined){
            /** Récupération éléments annonce**/
            //GET
            AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
                $scope.idAnnonce = data.idA;
                $scope.nomAnnonce = data.nomA;
                $scope.descrAnnonce = data.descriptionA;
                $scope.prixAnnonce = data.prixA+" €";
                $scope.dateCreatAnnonce = data.dateCreaA;
                $scope.etatAnnonce = data.etatA;
                idCreat = data.idUCreateur;
                idCand = data.idUCandidat;
                //console.log("idCreat : "+idCreat);
                console.log("idCand : "+idCand);
                //Pour test : $scope.etatAnnonce="Cloturee";
                if($scope.etatAnnonce==="Active" || $scope.etatAnnonce==="Optionnée") {
                    console.log("id Active/Opt");
                    //Affichage des boutons CLoturer et Optionnée que si Active
                    if($scope.etatAnnonce==="Active"){
                        $scope.boutonProp=true;
                        $scope.boutonCloturer=true;
                    }else{
                        $scope.boutonProp=false;
                        $scope.boutonCloturer=true;
                    }
                    console.log("EG : "+idU===idCand);
                    $scope.cloturee = false;
                    if(idU===idCand){
                        /**Utilisateur = Candidat ==> Logo**/
                        $scope.icone = true;
                    }

                    if(idU===idCreat)
                    {
                        /**Utilisateur = Annonceur ==> Lieu + Prix proposé + Date création du candidat**/
                        /** Récupération éléments Utilisateur candidat**/
                        //GET
                        if(idCand!==null){
                            UtilisateurFactory.get({'idU' : idCand}).$promise.then(function(dataUtil) {
                                $scope.lieuAnnonce = dataUtil.ville+" - "+dataUtil.pays;
                                $scope.dateCandidature = data.dateCandidat;
                                if(data.prixCandidat===null){
                                    $scope.prixProposeAnnonce="Aucun prix";
                                }else{
                                    $scope.prixProposeAnnonce = data.prixCandidat+" €";
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
                    console.log("idU : "+idU);
                    console.log("idCand : "+idCand);
                    console.log("eglité : "+idCand===idU);
                    if(idU===idCand){
                        /** Récupération éléments Utilisateur annonceur**/
                        //GET
                        //idCreat=1; //Pour test
                        if(idCreat!==null){
                            UtilisateurFactory.get({'idU' : idCreat}).$promise.then(function(data) {
                                $scope.annonceur = data.pseudo;
                            });
                        }
                    }
                    
                    if(idU===idCreat){
                        /** Récupération éléments Utilisateur candidat**/
                        //GET
                        //idCand=1; //Pour test
                        if(idCand!==null){
                            UtilisateurFactory.get({'idU' : idCand}).$promise.then(function(data) {
                                $scope.candidat = data.pseudo;
                            });
                        }
                    }
                }

                //Affichage des commentaires de l'annonce
                $scope.commentaire = data;
            });
        }else{
            $location.path('/');
        }

  }]);
