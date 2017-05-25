'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:detailAnnonceCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('leSoukApp')
  .controller('detailAnnonceCtrl', ['$scope', '$routeParams', '$cookies', 'AnnonceFactory', '$location', '$route', '$window', '$templateCache', 'UtilisateurFactory', 'CommenterAnnonceFactory',
    function ($scope, $routeParams, $cookies, AnnonceFactory, $location, $route, $window, $templateCache, UtilisateurFactory, CommenterAnnonceFactory) {

		var idU = $cookies.get('idU');
        var idCreat = "";
        var idCand = "";
        var idA = $routeParams.idA;
        
        //if(idU!==undefined){
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
                
                if($scope.etatAnnonce==="Active" || $scope.etatAnnonce==="Optionnée") {
                    
                    //Affichage des boutons CLoturer et Optionnée que si Active
                    if($scope.etatAnnonce==="Active"){
                        $scope.boutonProp=true;
                        $scope.boutonCloturer=true;
                    }else{
                        $scope.boutonProp=false;
                        $scope.boutonCloturer=true;
                    }
                    
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
                    
                    if(idCand!==null && idU===idCand.toString()){
                        /** Récupération éléments Utilisateur annonceur**/
                        //GET
                        if(idCreat!==null){
                            UtilisateurFactory.get({'idU' : idCreat}).$promise.then(function(data) {
                                $scope.annonceur = data.pseudo;
                            });
                        }
                    }
                    
                    if(idCreat!==null && idU===idCreat.toString()){
                        /** Récupération éléments Utilisateur candidat**/
                        //GET
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
        //}else{
          //  $location.path('/');
        //}
		
		
		// Commenter une annonce
		$scope.commenter = function() {
			
			// Création de la variable Commentaire
			var comm = new CommenterAnnonceFactory({
				idA : $scope.idAnnonce,
				idU: idU,
				texte: $scope.comment
			});
			
			// on fait un post pour créer le commentaire
			comm.$save(function success(dataC){
				alert('Le commentaire est ajouté !');
				// raffraichir la page
				$window.location.reload();
			}, function error(){
				alert("Echec lors de la création du commentaire !");
			});
			
		};

  }]);
