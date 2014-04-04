module.exports = function(grunt) {
    grunt.initConfig({	
	watch: {
	    bundles:{
		files: ['js/bundle.js', 'css/bundle.css'],
		options: {
		    livereload: true
		}
	    },

	    javascript: {
		files: ['js/*.js', '!js/bundle.js'],
		tasks: ['javascript'],
	    }, 


	    css: {
		files: ['css/*.css', '!css/bundle.css'],
		tasks: ['css'],
	    }, 


	    html: {
		files: ['*.html'],
		options: {
		    livereload:true
		}
	    }
	},

	connect: {
	    server: {
		options: {
		    port:8888,
		    host:'localhost',
		    base: './',
		}
	    }
	},


	open: {
	    server: {
		path: 'http://localhost:<%= connect.server.options.port %>'
	    }
	},

	cssmin: {
	    css: {
		files: {
		    'css/bundle.css': ['css/*.css', '!css/bundle.css']
		}
	    }
	},

	browserify: {
	    javascript: {
		options: {
		    debug:'true'
		},

		files: {
		    'js/bundle.js': ['js/index.js']
		}
	    }
	}
    });
    
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    

    grunt.registerTask('javascript', ['browserify']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('build', ['javascript', 'css']);
    grunt.registerTask('server', ['build', 'connect:server', 'open', 'watch']);
    grunt.registerTask('default', ['build']);
}