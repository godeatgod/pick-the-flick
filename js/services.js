var angular = require("angularjs");

var API = "http://staging.duckygo.com:3000/";

var http;
var q;
var timeout;
var token;
var headers;


function getJson(url, data) {
    var d = q.defer();
    var h = data === undefined  ? http.get(url, headers) : http.post(url, data, headers) ;
    h.success(function(data) {
	timeout(function() {
	    d.resolve(data);
	});
    });

    return d.promise;
}


function ApiService($http, $q, $location, $timeout) {
    token = $location.search().token;
    if (token === undefined) {
	window.location = API + "auth/facebook";
    }

    timeout = $timeout;

    headers = {headers: {'Authorization': 'Bearer ' + token}};
    http = $http;
    q = $q;
}
ApiService.prototype = {

    login:function() {
	return getJson(API + "api/login");
    },
    
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
	return getJson(API + "api/movie/" + id);
    },


    suggest:function(title) {
	return getJson(API + "api/suggest/" + title);
    },

    answer:function(id, answer) {
	var correct_cb;
	var wrong_cb;

	http.get(API + "api/answer/" + id + "/" + answer, headers)
	    .success(function(data) {
		data = angular.fromJson(data);
		if (data.correct) {
		    if (correct_cb) correct_cb(data);
		} else {
		    if (wrong_cb) wrong_cb(data);
		}
	    });

	var self = {
	    correct:function(cb) {
		correct_cb = cb;
		return self;
	    },
	    
	    wrong:function(cb) {
		wrong_cb = cb;
		return self;
	    }
	}

	return self;
    },

    submit:function(flick) {
	var complete_cb;
	http.post(API + "api/submit", flick, headers)
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
    .service("Api", ["$http", "$q", "$location", "$timeout", ApiService]);