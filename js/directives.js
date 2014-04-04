var angular = require("angularjs");

require("./app")

    .directive("autoComplete", function() {
	return {
	    restrict:"E",
	    scope: {
		result: "=answer"
	    },
	    templateUrl: "autocomplete.html",
	}
    });

