'use strict';

//var app = angular.module('myApp',['ui.router', 'ngCookies']);

angular.module('myApp',['ui.router', 'ngCookies'])
.config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      username: ''
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html',
      username: 'visitor'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      username: 'visitor'
    });

  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl',
      username: 'visitor'
    });

  $urlRouterProvider.otherwise('/home');

  // intercept the response, check if authenticated.
  $httpProvider.interceptors.push(function($q, $location){
    return {
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403){
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });
}])

.run(['$rootScope', '$state', 'AuthSrv', function ($rootScope, $state, AuthSrv) {

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    if ( !AuthSrv.isAuthorized(toState.username) ){
      event.preventDefault();
      $state.go('login');
    }
  });
}]);

