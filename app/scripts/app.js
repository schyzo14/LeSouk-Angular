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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/detailAnnonce/:idA', {
        templateUrl: 'views/detailAnnonce.html',
        controller: 'detailAnnonceCtrl',
        controllerAs: 'detailAnnonce'
      })
      .when('/propositionAchat/:idA', {
        templateUrl: 'views/propositionAchat.html',
        controller: 'propositionAchatCtrl',
        controllerAs: 'propositionAchat'
      })
      .when('/seDeconnecter', {
        templateUrl: 'views/seDeconnecter.html',
        controller: 'SeDeconnecterCtrl',
        controllerAs: 'SeDeconnecter'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function ($rootScope, $location, $cookies) {
    $rootScope.$on('$routeChangeStart', function (currRoute, prevRoute) {
      if (prevRoute.access != undefined) {
        // if route requires auth and user is not logged in
        if (!prevRoute.access.isFreeAccess && ($cookies.get('idP') == null)) {
          // redirects to index
          $location.path('/');
        }
      }
    })
  });
