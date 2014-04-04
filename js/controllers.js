var angular = require("angularjs");
var modals = require("./modals");


require("./app")

    .controller("UserController", ["$scope", "Api", function($scope, api) {
	api.user().then(function(result) {
	    $scope.user = result;
	});
    }])


    .controller("CategoryController", ["$scope", "Api", function($scope, api) {
	api.categories().then(function(result) {
	    $scope.categoryList = result;
	});
    }])


    .controller("FlickController", ["$scope", "Api", function($scope, api) {	
	$scope.flick = {};

	$scope.submitAnswer = function() {
	    api.answer($scope.selectedFlick.id, $scope.answer)
		.correct(function(data) {
		    $scope.user.passedTutorial = true;
		    $scope.user.points = data.newPoints; 
		    modals.show("correct-answer");
		})
		.wrong(function(data) {
		    $scope.user.points = data.newPoints; 
		    modals.show("wrong-answer");
		});
	};

	$scope.submitRiddle = function() {
	    api.submit($scope.flick)
		.complete(function(data) {
		    $scope.user.points = data.newPoints; 
		    modals.show("flick-submitted");
		});
	};

	$scope.cancelAnswer = function() {
	    $scope.selectedFlick = false;
	};


	$scope.getPoster = function(id) {
	    var d = $q.defer();
	    return api.movie(id).then(function(result) {
		d.resolve(result.Poster);
	    });

	    return d.promise;
	};

	$scope.getFacebookImage = function(id) {
	    return "https://graph.facebook.com/" + id + "/picture";
	};

    }])


    .controller("GameController", ["$scope", "Api", function($scope, api) {
	$scope.user = {};
	$scope.selectedFlick = false;
	$scope.selectedCategory = false;


	$scope.selectFlick = function(id) {
	    api.flick(id).then(function(result) {
		$scope.selectedFlick = result;
	    });
	}

	$scope.selectCategory = function(id) {
	    api.category(id).then(function(result) {
		$scope.selectedCategory = result;
	    });
	}

	if ($scope.user && $scope.user.passedTutorial) {
	    api.hot().then(function(result) {
		$scope.selectedCategory = result;
	    });
	} else {
	    $scope.selectedFlick = api.tutorial();
	}

	$scope.refreshFlick = function() {
	};
    }])

    .controller("AutoCompleteController", 
		["$scope", "Api", 
		 function($scope, api) {
		     $scope.selectResult = function (res) {
			 $scope.result = res;
		     };

		     $scope.$watch("title", function() {
			 if ($scope.title && $scope.title.length > 3) {
			     api.suggest($scope.title).then(function(result) {
				 $scope.suggestions = result;
			     });
			 }
		     });
		     
		 }]);



