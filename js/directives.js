var angular = require("angularjs");

require("./app")

    .directive("autoComplete", function() {
	return {
	    restrict:"E",
	    scope: {
		result: "="
	    },
	    controller:	["$scope", "Api", 
		 function($scope, api) {
		     $scope.selectResult = function (movie) {
			 $scope.result = movie.id;
			 $scope.title = movie.name;
		     };

		     $scope.$watch("title", function() {
			 if ($scope.title && $scope.title.length >= 2 && $scope.title.length < 6) {
			     api.suggest($scope.title).then(function(result) {
				 $scope.suggestions = result;
			     });
			 }
		     });
		     
		 }],
	    templateUrl: "autocomplete.html",
	}
    });

