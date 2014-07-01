'use strict';

/* Services */

var s = angular.module('myApp');

s.factory('AuthSrv', function($http, $cookieStore){

		var currentUser = $cookieStore.get('user') || { username: '' };

		return {
			register: function(userinfo, successFunc, errorFunc){
				//TODO
			},
			login: function(userinfo, successFunc, errorFunc){
				currentUser.username = userinfo.username;

				console.log(currentUser);

				// $http.post('/login', userinfo).success(function(res){
				// 	angular.extend(currentUser, res);
				// 	successFunc();
				// }).error(errorFunc);
			},
			logout: function(userinfo, successFunc, errorFunc){
				$http.post('/logout')
					.success(function(){
						currentUser = { username: ''};
					})
					.error(errorFunc);
			},
			isAuthorized: function(username) {
				return ( username !== '' || currentUser.username !== '');
			},
			userinfo: currentUser
		};
});
