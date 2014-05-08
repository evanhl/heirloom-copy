'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      options: {
        nospawn: true
      },
      sass: {
        files: ['app/scss/*.scss'],
        tasks: ['sass']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'app/*.html',
          'app/styles/{,*/}*.css',
          'app/scripts/{,*/}*.js',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'app'),
              lrSnippet
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    sass: {
      dev: {
        files: [{
          src: ['app/scss/*.scss'],
          dest: 'app/styles/main.css'
        }]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'sass',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('default', ['server']);  
};
