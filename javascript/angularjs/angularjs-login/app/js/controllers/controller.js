'use strict';

var c = angular.module('myApp');

c.controller('LoginCtrl', ['$scope', '$location','AuthSrv', function($scope, $location, AuthSrv){
	console.log('loginctrl');

	$scope.login = function(){
		AuthSrv.login({
			username: $scope.user.username,
			password: $scope.user.password
		},
		function(res){
			$location.path('/');
		},
		function(res){
			
		});
	};

}]);

c.controller('RegisterCtrl', ['$scope', function($scope){
	
}]);
