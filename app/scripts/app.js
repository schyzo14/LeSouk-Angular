'use strict';

/**
 * @ngdoc overview
 * @name leSoukApp
 * @description
 * # leSoukApp
 *
 * Main module of the application.
 */
angular
  .module('leSoukApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
	  .when('/compte', {
        templateUrl: 'views/pageDeGarde.html',
        controller: 'PageDeGardeCtrl',
        controllerAs: 'pageDeGarde',
        access: {
          isFreeAccess : false
        }
      })
      .when('/detailAnnonce/:idA', {
        templateUrl: 'views/detailAnnonce.html',
        controller: 'detailAnnonceCtrl',
        controllerAs: 'detailAnnonce',
        access: {
          isFreeAccess : false
        }
      })
      .when('/propositionAchat/:idA', {
        templateUrl: 'views/propositionAchat.html',
        controller: 'propositionAchatCtrl',
        controllerAs: 'propositionAchat',
        access: {
          isFreeAccess : false
        }
      })
      .when('/seDeconnecter', {
        templateUrl: 'views/seDeconnecter.html',
        controller: 'SeDeconnecterCtrl',
        controllerAs: 'SeDeconnecter',
        access: {
          isFreeAccess : false
        }
      })
      .when('/cloturerAnnonce/:idA', {
        templateUrl: 'views/cloturerAnnonce.html',
        controller: 'cloturerAnnonceCtrl',
        controllerAs: 'cloturerAnnonce',
        access: {
          isFreeAccess : false
        }
      })
      .when('/creerAnnonce/', {
        templateUrl: 'views/creerAnnonce.html',
        controller: 'creerAnnonceCtrl',
        controllerAs: 'creerAnnonce',
        access: {
          isFreeAccess : false
        }
      })
      .when('/recherche/:search', {
        templateUrl: 'views/recherche.html',
        controller: 'RechercheCtrl',
        controllerAs: 'recherche',
        access: {
          isFreeAccess : false
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, $cookies) {
    $rootScope.$on('$routeChangeStart', function (currRoute, prevRoute) {
        if (prevRoute.access != undefined) {
        // if route requires auth and user is not logged in
        if (!prevRoute.access.isFreeAccess && ($cookies.get('idU') == null)) {
          // redirects to index
          $location.path('/');
        }
      }
    });
  });
