/* global module, require */

// Generated on 2014-05-08 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var modRewrite = require('connect-modrewrite');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint', 'resolveDependencies'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      templates: {
        files: ['<%= config.app %>/templates/**/*.hbs'],
        tasks: ['emberTemplates']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '.tmp/templates.js',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              // supports single page app URLs
              modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      testServer: {
        options: {
          open: false,
          port: 9001,
          livereload: false,
          keepalive: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      '1x_sprites': '<%= config.app %>/images/sprites-1x/*2x.png'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        includePaths: [
          'bower_components'
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 5 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        // trims initial '..' from '../bower_components/...'
        ignorePath: '..',
        src: ['<%= config.app %>/*.html'],
        exclude: [],
        overrides: {
          'dropzone': {
            main: [
              'downloads/css/basic.css',
              'downloads/css/dropzone.css',
              'downloads/dropzone.min.js'
            ]
          },
          'ember': {
            main: [
              'ember.js'
            ]
          },
          'foundation': {
            main: []
          },
          'cldr': {
            main: [
              'plurals.js'
            ]
          }
        }
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css'
            // '<%= config.dist %>/images/{,*/}*.*',
            // '<%= config.dist %>/styles/fonts/{,*/}*.*',
            // '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        // allows usemin to find '/bower_components/...' in index.html
        root: '.',
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    // imagemin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= config.app %>/images',
    //       src: '{,*/}*.{gif,jpeg,jpg,png}',
    //       dest: '<%= config.dist %>/images'
    //     }]
    //   }
    // },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/styles/main.css': [
    //                 '.tmp/styles/{,*/}*.css',
    //                 '<%= config.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    // },
    // uglify: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/scripts/scripts.js': [
    //                 '<%= config.dist %>/scripts/scripts.js'
    //             ]
    //         }
    //     }
    // },
    concat: {
      config: {
        src: [
          '<%= config.app %>/scripts/config/<%= process.env.WEB_ENV || "development" %>.js',
          '.tmp/mainWithoutConfig.js'
        ],
        dest: '.tmp/main.js'
      },
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif,jpeg,jpg,png}',
            '{,*/}*.{gif,jpeg,jpg,png}',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: [
          '{,*/}*.css',
          'fonts/*.woff'
        ]
      },
      '1x_sprites': {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/images/',
        src: [
          'sprites-1x/*2x.png'
        ],
        dest: 'sprites-1x/',
        rename: function (dest, src, opts) {
          var newPath = opts.cwd + dest + src.substring(src.lastIndexOf('/') + 1).replace('-2x', '');
          grunt.log.write(newPath + '\n');
          return newPath;
        }
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'emberTemplates',
        'resolveDependencies',
        'sass:server',
        'copy:styles'
      ],
      test: [
        'emberTemplates',
        'resolveDependencies',
        'sass:server',
        'copy:styles'
      ],
      dist: [
        'emberTemplates',
        'resolveDependencies',
        'sass',
        'copy:styles',
        // 'imagemin',
        'svgmin'
      ]
    },

    todo: {
      options: {
        marks: [
          {
            name: "FIX",
            pattern: /FIXME/,
            color: "red"
          },
          {
            name: "TODO",
            pattern: /TODO/,
            color: "yellow"
          },
          {
            name: "NOTE",
            pattern: /NOTE/,
            color: "blue"
          }
        ]
      },
      src: [
        '<%= config.app %>/styles/**/*.scss',
        '<%= config.app %>/scripts/**/*.js',
        '<%= config.app %>/templates/**/*.hbs',
        '<%= config.app %>/**/*.html'
      ]
    },

    // pre-compile Ember Handlebars templates
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: '<%= config.app %>/templates/',
          templateName: function(name) {
            return name.replace('_', '/');
          }
        },
        files: {
          ".tmp/templates.js": "<%= config.app %>/templates/**/*.hbs"
        }
      }
    },

    // sprockets for JS dependency management
    directives: {
      files: {
        src: ['<%= config.app %>/scripts/main.js'],
        dest: '.tmp/mainWithoutConfig.js'
      }
    },

    sprite: {
      '1x': {
        src: ['<%= config.app %>/images/sprites-1x/*.png'],
        destImg: '<%= config.app %>/images/spritesheet.png',
        destCSS: '<%= config.app %>/styles/_spritesheet.scss',
        algorithm: 'binary-tree',
        cssFormat: 'scss',
        padding: 1
      },
      '2x': {
        src: ['<%= config.app %>/images/sprites-2x/*.png'],
        destImg: '<%= config.app %>/images/spritesheet-2x.png',
        destCSS: '<%= config.app %>/styles/_spritesheet-2x.scss',
        algorithm: 'binary-tree',
        cssFormat: 'scss',
        padding: 2
      }
    },

    image_resize: {
      resize: {
        options: {
          width: '50%',
          height: '50%'
        },
        src: '<%= config.app %>/images/sprites-2x/*.png',
        dest: '<%= config.app %>/images/sprites-1x/',
      }
    },

    cdn: {
      options: {
        cdn: '"https://<%= process.env.FASTLY_CDN_URL" || "" %>',
        flatten: false
      },
      dist: {
        src: ['<%= config.dist %>/*.html', '<%= config.dist %>/styles/**/*.css']
      }
    }
  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('genSprites', [
    'image_resize',
    'copy:1x_sprites',
    'clean:1x_sprites',
    'sprite'
  ]);

  grunt.registerTask('resolveDependencies', [
    'directives',
    'concat:config'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat:generated',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'cdn:dist',
    'htmlmin',
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};