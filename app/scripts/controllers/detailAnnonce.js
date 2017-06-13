'use strict';

/**
* @ngdoc function
* @name leSoukApp.controller:detailAnnonceCtrl
* @description
* # detailAnnonceCtrl
* Controller of the leSoukApp
*/
angular.module('leSoukApp')
.controller('detailAnnonceCtrl', ['$scope', '$routeParams', '$cookies', '$q', 'AnnonceFactory', 'AnnonceClotureeFactory', '$location', '$route', '$window', '$templateCache', 'UtilisateurFactory', 'CommenterAnnonceFactory',
function ($scope, $routeParams, $cookies, $q, AnnonceFactory, AnnonceClotureeFactory, $location, $route, $window, $templateCache, UtilisateurFactory, CommenterAnnonceFactory) {
  var idU = $cookies.get('idU');
  var idCreat = "";
  var idCand = "";
  var idA = $routeParams.idA;

  /** Récupération éléments annonce**/
  //GET
  AnnonceFactory.get({'idA' : idA}).$promise.then(function(data) {
    if(data.etatA == "Cloturée") {
        AnnonceClotureeFactory.get({'idA' : idA}).$promise.then(function(dataComplet) {
            if(idCreat!==null){
                $scope.annonceur = dataComplet.createur.nom+"  "+dataComplet.createur.prenom+" : "+dataComplet.createur.mail;
            }
            
            if(idCand!==null){
                $scope.candidat = dataComplet.candidat.nom+" "+dataComplet.candidat.prenom+" : "+dataComplet.candidat.mail;
            }
        })
    }
    $scope.idAnnonce = data.idA;
    $scope.nomAnnonce = data.nomA;
    $scope.descrAnnonce = data.descriptionA;
    $scope.prixAnnonce = data.prixA+" €";
    $scope.dateCreatAnnonce = data.dateCreaA;
    $scope.etatAnnonce = data.etatA;
    $scope.commentaires = data.listeCommentaires;

    idCreat = data.createur.id;
    if (data.candidat !== null) {
      idCand = data.candidat.id;
    } else {
      idCand = null;
    }

    if($scope.etatAnnonce==="Active" || $scope.etatAnnonce==="Optionnée") {
      //Affichage du bouton Prop que si Active
      //Affichage du bouton Cloturer que si Active ou si idU=idCreateur
      if($scope.etatAnnonce==="Active"){
        $scope.boutonProp=true;
        $scope.boutonCloturer=true;
      }else{
        $scope.boutonProp=false;
        if($scope.etatAnnonce==="Optionnée" && (idCreat!==null && idU!==idCreat.toString())){
          $scope.boutonCloturer=false;
        }else{
          $scope.boutonCloturer=true;
        }

      }

      if(idCand!==null && idU===idCand.toString()){
        /**Utilisateur = Candidat ==> Logo**/
        $scope.icone = true;
      }

      if(idCreat!==null && idU===idCreat.toString())
      {
        /**Utilisateur = Annonceur ==> Lieu + Prix proposé + Date création du candidat**/
        /** Récupération éléments Utilisateur candidat**/
        //GET
        if(idCand!==null){
          $scope.lieuAnnonce = data.candidat.city+" - "+data.candidat.country;
          $scope.dateCandidature = data.dateCandidat;
          if(data.prixCandidat===null){
            $scope.prixProposeAnnonce="Aucun prix";
          }else{
            $scope.prixProposeAnnonce = data.prixCandidat+" €";
          }

          $scope.annonceCoursUtilAnnonceur = true;
        }else{
          //Aucun candidat
          $scope.aucunCandidat=true;
        }


      }
    }else{
      //Annonce cloturee
      $scope.cloturee = true;

      if(idCand!==null && idU===idCand.toString()){
        /** Récupération éléments Utilisateur annonceur**/
        //GET
        if(idCreat!==null){
          $scope.clotureeAnnonceur = true;
        }
      }

      if(idCreat!==null && idU===idCreat.toString()){
        /** Récupération éléments Utilisateur candidat**/
        //GET
        if(idCand!==null){
          $scope.clotureeCandidat = true;
        }else{
          $scope.clotureeNoCandidat = true;
        }
      }
    }

    /** Affichage des commentaires de l'annonce **/
    var j = 0;
    var promises = [];
    // Pour chaque commentaire
    for(var i = 0; i < $scope.commentaires.length; i++) {
      // on fait un get sur l'id de l'utilisateur
      var promise = UtilisateurFactory.get({'idU' : $scope.commentaires[i].idU}).$promise.then(function(dataUtil) {
        // on met le pseudo au bon commentaire
        $scope.commentaires[j].pseudo = dataUtil.pseudo;
        j++;
      });
      // on ajoute la promise à la liste des promises à exécuter
      promises.push(promise);
    }
    // on exécute les promises
    $q.all(promises);
  });



  /** Commenter une annonce **/
  $scope.commenter = function() {

    // Création de la variable Commentaire
    var comm = new CommenterAnnonceFactory({
      idA : $scope.idAnnonce,
      idU: idU,
      texte: $scope.comment
    });

    // on fait un post pour créer le commentaire
    comm.$save(function success(){
      // raffraichir la page
      $window.location.reload();
    }, function error(){
      $window.alert("Echec lors de la création du commentaire !");
    });

  };
}]);
