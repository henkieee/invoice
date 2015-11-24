(function(){
  'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates
  angular.module('test', [ 'ngMaterial', 'ui.router'])
    .config(Routes);

  function Routes($stateProvider, $urlRouterProvider)
  {
    $urlRouterProvider.otherwise('/tab/dash');
    $stateProvider
      .state('view1', {
        url: "/view1",
        templateUrl: "./src/test/partials/view1.html",
        controller: function($scope) {
          $scope.test = 'It works!!!'
        }
      })
      .state('view2', {
        url: "/view2",
        templateUrl: "./src/test/partials/view2.html"
      })
      .state('view3', {
        url: "/view3",
        templateUrl: "./src/test/partials/view3.html"
      });
  }
})();
