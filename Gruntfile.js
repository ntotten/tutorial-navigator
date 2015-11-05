module.exports = function (grunt) {
  var path = require('path');
  var join = path.join;
  var fs = require('fs');
  var read = fs.readFileSync;

  var JS_DEV_PATH = 'tutorial-navigator/development';
  var JS_BASE_PATH = 'tutorial-navigator/tutorial-navigator-';

  var pkg = require('./package');
  var path = require('path');

  var minor_version = pkg.version.replace(/\.(\d)*$/, '');
  var major_version = pkg.version.replace(/\.(\d)*\.(\d)*$/, '');

  function  rename_release (v) {
    return function (d, f) {
      var dest = path.join(d, f.replace(/(\.min)?\.js$/, '-'+ v + '$1.js'));
      return dest;
    };
  }

  function node_bin (bin) {
    return path.join('node_modules', '.bin', bin);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      sample: {
        options: {
          watch: true,
          browserifyOptions: {
            extensions: ['.jsx'],
            standalone: 'TutorialNavigator',
            transform: [
               ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          }
        },
        src: ['src/app.js', 'example/src/example.js'],
        dest: 'example/lib/sample.js'
      },
      build: {
        src: ['src/app.js'],
        dest: 'build/tutorial-navigator.standalone.js',
        options: {
          browserifyOptions: {
            extensions: ['.jsx'],
            standalone: 'TutorialNavigator',
            transform: [
               ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          }
        }
      },
      noConflict:{
        src: ['src/app.js'],
        dest: 'build/tutorial-navigator.standalone.noconflict.js',
        options: {
          browserifyOptions: {
            extensions: ['.jsx'],
            standalone: 'TutorialNavigator',
            transform: [
               ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          },
          exclude : ['react' ]
        }
      }
    },
    clean: {
      build: ['build/']
    },
    copy: {
      release: {
        files: [
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(pkg.version) },
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(minor_version) },
          { expand: true, flatten: true, src: 'build/*', dest: 'release/', rename: rename_release(major_version) }
        ]
      },
      release_dev: {
        files: [
          { expand: true, flatten: true, src: 'build/*', dest: 'release/' },
        ]
      }
    },
    uglify: {
      noConflict: {
        files: {
          'build/tutorial-navigator.standalone.noconflict.min.js': ['build/tutorial-navigator.standalone.noconflict.js'],
        }
      },
      build: {
        files: {
          'build/tutorial-navigator.standalone.min.js': ['build/tutorial-navigator.standalone.js'],
        }
      }
    },
    connect: {
      dev: {
        options: {
          keepalive: true,
          hostname: '*',
          port: 8990,
          base: ['.', 'example', 'vendor/react']
        }
      },
    },
    stylus: {
        dev: {
          options: {
            compress: false
          },
          src: ['css/tutorial-navigator.styl', 'css/carousel.styl'],
          dest: 'build/tutorial-navigator.css'
        }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/tutorial-navigator.min.css': ['build/tutorial-navigator.css']
        }
      }
    },
    watch: {
      stylus: {
        files: ['css/tutorial-navigator.styl', 'css/carousel.styl'],
        tasks: ['stylus:build']
      }
    },
    aws_s3: {
      options: {
        accessKeyId:     process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        bucket:          process.env.S3_BUCKET,
        region:          process.env.S3_REGION,
        uploadConcurrency: 5,
        params: {
          CacheControl: 'public, max-age=300'
        },
        // debug: true <<< use this option to test changes
      },
      clean_dev: {
        files: [
          { action: 'delete', dest: JS_DEV_PATH + '/tutorial-navigator.css' },
          { action: 'delete', dest: JS_DEV_PATH + '/tutorial-navigator.min.css' },
          { action: 'delete', dest: JS_DEV_PATH + '/tutorial-navigator.standalone.js' },
          { action: 'delete', dest: JS_DEV_PATH + '/tutorial-navigator.standalone.min.js' }
        ]
      },
      publish_dev: {
        files: [
          {
            expand: true,
            cwd:    'release/',
            src:    ['**'],
            dest:   JS_DEV_PATH
          }
        ]
      },
      clean: {
        files: [
          { action: 'delete', dest: JS_BASE_PATH + pkg.version + '.js' },
          { action: 'delete', dest: JS_BASE_PATH + pkg.version + '.min.js' },
          { action: 'delete', dest: JS_BASE_PATH + major_version + '.js' },
          { action: 'delete', dest: JS_BASE_PATH + major_version + '.min.js' },
          { action: 'delete', dest: JS_BASE_PATH + minor_version + '.js' },
          { action: 'delete', dest: JS_BASE_PATH + minor_version + '.min.js' }
        ]
      },
      publish: {
        files: [
          {
            expand: true,
            cwd:    'release/',
            src:    ['**'],
            dest:   'js/tutorial-navigator/'
          }
        ]
      }
    },
    http: {
      purge_js_dev: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_DEV_PATH + '/',
          method: 'DELETE'
        }
      },
      purge_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + pkg.version + '.js',
          method: 'DELETE'
        }
      },
      purge_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + pkg.version + '.min.js',
          method: 'DELETE'
        }
      },
      purge_major_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + major_version + '.js',
          method: 'DELETE'
        }
      },
      purge_major_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH +  major_version + '.min.js',
          method: 'DELETE'
        }
      },
      purge_minor_js: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + minor_version + '.js',
          method: 'DELETE'
        }
      },
      purge_minor_js_min: {
        options: {
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + minor_version + '.min.js',
          method: 'DELETE'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-http');

  grunt.registerTask('build-both',            ['clean:build', 'stylus', 'cssmin', 'browserify:build', 'browserify:noConflict', 'uglify:build', 'uglify:noConflict' ]);
  grunt.registerTask('build-no-conflict',     ['clean:build', 'stylus', 'cssmin', 'browserify:noConflict', 'uglify:noConflict' ]);
  grunt.registerTask('build',                 ['clean:build', 'stylus', 'cssmin', 'browserify:build', 'uglify:build' ]);
  grunt.registerTask('dev-no-conflict',       ['clean:build', 'stylus', 'browserify:noConflict', 'browserify:sample', 'connect:dev', 'watch' ]);
  grunt.registerTask('dev',                   ['clean:build', 'stylus', 'browserify:build', 'browserify:sample', 'connect:dev', 'watch' ]);
  grunt.registerTask('purge_cdn_dev',         ['http:purge_js_dev']);
  grunt.registerTask('cdn_dev',               ['build', 'copy:release_dev', 'aws_s3:clean_dev', 'aws_s3:publish_dev', 'purge_cdn_dev']);
  grunt.registerTask('purge_cdn',             ['http:purge_js', 'http:purge_js_min', 'http:purge_major_js', 'http:purge_major_js_min', 'http:purge_minor_js', 'http:purge_minor_js_min']);
  grunt.registerTask('cdn',                   ['build', 'copy:release', 'aws_s3:clean', 'aws_s3:publish', 'purge_cdn']);
  grunt.registerTask('default',               ['build']);
};
