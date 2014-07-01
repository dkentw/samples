'use strict';

var d = angular.module('myApp');

d.directive('foo', [function(){
    return function(scope, elm, attr){
      elm.text(scope.fooName + ' directive');
    };
}]);
