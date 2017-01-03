'use strict';

var gruntModule = function(grunt) {
  grunt.loadNpmTasks('grunt-swagger-docs');
  

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    'swagger-docs':  {
            dev:{
                src: ['app.js', 'public/swagger/schemas/*.js', 'models/*.js', 'controllers/*Controller.js'],
                dest: 'public/swagger/swagger.json'
      }
    }
  });


  grunt.registerTask('swagger', ['swagger-docs']);
 
};

module.exports = gruntModule;
