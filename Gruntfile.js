module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    dustjs: {
      compile: {
        files: {
          "public/javascripts/templates.js": ["public/templates/*.dust"]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-dustjs');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'dustjs']);

};