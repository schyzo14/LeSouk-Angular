'use strict';

/**
 * @ngdoc function
 * @name leSoukApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSoukApp
 */
angular.module('leSoukApp')
  .controller('MainCtrl', ['$scope', '$cookies', 'Connexion', '$location',
	function ($scope, $cookies,Connexion,$location) {

		$scope.data = {};
        //Si connecté affichage de la page de garde sinon retour sur la page de connexion
	   if($cookies.get('idU')!==undefined){
           $location.path('/compte');
       }else{
           $location.path('/');
       }
	}
]);
