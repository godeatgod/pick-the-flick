var angular = require("angularjs");

var API = "http://localhost:3000/";

var http;
var q;
var rootScope;

function getJson(url, data) {
    var d = q.defer();
    var h = data === undefined  ? http.get(url) : http.post(url, data) ;
    h.success(function(data) {
		d.resolve(data);
    });

    return d.promise;
}


function ApiService($http, $q, $rootScope) {
    http = $http;
    q = $q;
    rootScope = $rootScope;
}
ApiService.prototype = {
    
    user:function() {
	return getJson(API + "api/user");
    },
    
    categories:function() {
	return getJson(API + "api/categories");
    },

    
    flick:function(id) {
	return getJson(API + "api/flick/" + id);
    },
    
    category:function(id) {
	return getJson(API + "api/category/" + id);
    },

    hot:function(id) {
	return getJson(API + "api/hot");
    },


    tutorial:function() {
	return getJson(API + "api/tutorial");
    },

    movie:function(id) {
	return getJson(API + "http://www.omdbapi.com/?i=tt" + id);
    },


    suggest:function(title) {
	return getJson(API + "http://www.omdbapi.com/?s=" + title);
    },

    answer:function(id, answer) {
	var correct_cb;
	var wrong_cb;

	http.get(API + "api/answer/" + id + "/" + answer)
	    .success(function(data) {
		data = angular.fromJson(data);
		if (data.correct) {
		    if (correct_cb) correct_cb(data);
		} else {
		    if (wrong_cb) wrong_cb(data);
		}
	    });

	return {
	    correct:function(cb) {
		correct_cb = cb;
	    },
	    
	    wrong:function(cb) {
		wrong_cb = cb;
	    }
	}
    },

    submit:function(flick) {
	var complete_cb;
	http.post(API + "api/submit", flick)
	    .success(function(data) {
		data = angular.fromJson(data);		
		if (complete_cb) complete_cb(data);
	    });

	return {
	    complete:function(cb) {
		complete_cb = cb;
	    }
	}
    }
}



require("./app")
    .service("Api", ["$http", "$q", "$rootScope", ApiService]);