'use strict';

module.exports = function (grunt) {
  // Init config
  grunt.initConfig({
    // Default package
    pkg : grunt.file.readJSON('package.json'),

    // Uglify content
    uglify : {
      api : {
        files : [ {
          expand : true,
          cwd    : 'src/',
          src    : '**/*.js',
          dest   : 'dist/'
        } ]
      }
    },

    // Unit test
    mochacli : {
      options : {
        reporter       : 'spec',
        'inline-diffs' : false,
        'no-exit'      : true,
        force          : false,
        'check-leaks'  : true,
        bail           : false
      },
      all : [ 'test/*.js' ]
    },

    // Hint our app
    yoctohint : {
      json : [
        'package.json'
      ],
      node : [
        'Gruntfile.js', 'src/*/*/*/*.js'
      ],
      options : {
        compatibility : true
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('yocto-hint');

  // Register tasks
  grunt.registerTask('hint', 'yoctohint');
  grunt.registerTask('test', 'mochacli');
  grunt.registerTask('build', [ 'hint', 'uglify' ]);
  grunt.registerTask('default', [ 'build', 'test' ]);
};
