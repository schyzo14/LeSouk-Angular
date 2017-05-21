angular.module('leSoukApp')
  .service('Connexion', ['$cookies', function($cookies) {
    var user = $cookies.get('idP');
    return {
      getUser : function() {
        return user;
      },
      setUser : function(newU) {
        user = newU;
      },
      isConnected : function() {
        return !!user;
      }
    }
  }]);