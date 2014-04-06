var angular = require("angularjs");
var modals = require("./modals");


require("./app")

    .controller("UserController", ["$scope", "Api", function($scope, api) {
	api.user().then(function(result) {
	    $scope.selected.user = result;
	    if (result && result.passedTutorial) {
		api.hot().then(function(result) {
		    $scope.selected.category = result;
		});
	    } else {
		api.tutorial().then(function(data) {
		    $scope.selected.flick = data;
		});
	    }
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
	    api.answer($scope.selected.flick._id, $scope.selected.flick.answer)
		.correct(function(data) {
		    $scope.selected.user.passedTutorial = true;
		    $scope.selected.user.points = data.newPoints; 
		    $scope.showModal("Correct", data.message);
		    $scope.selected.flick = false;
		})
		.wrong(function(data) {
		    $scope.selected.user.points = data.newPoints; 
		    $scope.showModal("Wrong", data.message);
		    $scope.selected.flick = false;
		});
	};

	$scope.submitRiddle = function() {
	    api.submit($scope.flick)
		.complete(function(data) {
		    $scope.selected.user.points = data.newPoints; 
		    $scope.flick = {};
		    $scope.selectFlick(data._id);
		    $scope.showModal("Submitted", data.message);
		});
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


    .controller("GameController", ["$scope", "Api", function($scope, api, $location) {
	$scope.selected = {};
	
	$scope.showModal = function(title, message) {
	    $scope.selected.modal = {title:title, message:message};
	}

	$scope.closeModal = function() {
	    $scope.selected.modal = undefined;
	}


	$scope.selectFlick = function(id) {
	    api.flick(id).then(function(result) {
		$scope.selected.flick = result;
		$scope.selected.category = false;
	    });
	}

	$scope.selectCategory = function(id) {
	    api.category(id).then(function(result) {
		$scope.selected.category = result;
		$scope.selected.flick = false;
	    });
	}


	$scope.cancelFlick = function() {
	    $scope.selected.flick = false;
	};


	$scope.refreshFlick = function() {
	};

	



    }]);


