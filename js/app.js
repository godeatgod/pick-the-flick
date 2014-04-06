var angular = require("angularjs");

module.exports = angular.module('PickTheFlick', [])
    .config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
    }]);

