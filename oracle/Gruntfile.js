module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			stylus: {
				files: [
				'app/stylus/*.styl'
				],
				tasks: ['stylus']
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false,
					paths: ['stylus'],
					import: [
						'nib/*'
					]
				},
				files: {
					'<%= css_output_location %>/style.css': ['app/stylus/*.styl']
				}
			}
		},

		'css_output_location': 'app/css',

	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
