module.exports = function (grunt) {
  var serveStatic = require('serve-static');
  var path = require('path');
  var join = path.join;
  var fs = require('fs');
  var read = fs.readFileSync;

  var JS_DEV_PATH = 'js/tutorial-navigator/development/';
  var JS_BASE_PATH = 'js/tutorial-navigator/tutorial-navigator-';

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
      dev: {
        options: {
          watch: true,
          browserifyOptions: {
            extensions: ['.jsx'],
            alias: [
              "react:react", "React:react"
            ],
            transform: [
              ["babelify", { loose: "all"}], [ 'reactify' , {'es6': true}]
            ]
          }
        },
        src: ['index.js'],
        dest: 'build/tutorial-navigator.js'
      },
      build: {
        src: ['index.js'],
        dest: 'build/tutorial-navigator.js',
        options: {
          browserifyOptions: {
            extensions: ['.jsx'],
            transform: [
               [ 'reactify' , {'es6': true}]
            ]
          }
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
          { expand: true, flatten: true, src: 'build/feature-widget.js', dest: 'release/' },
        ]
      }
    },
    uglify: {
      build: {
        files: {
          'build/tutorial-navigator.min.js': ['build/tutorial-navigator.js'],
        }
      }
    },
    connect: {
      dev: {
        options: {
          keepalive: true,
          hostname: '*',
          port: 8990,
          middleware: function (connect, options) {
           return [
             serveStatic(__dirname),
             function full(req, res, next) {
                if (!/^\/full/.test(req.originalUrl)) return next();
                res.end(read(join(__dirname, 'example/full.html')));
                res.end(read(join(__dirname, 'example/full.html')));
              },
             function basic(req, res, next) {
               res.end(read(join(__dirname, 'example/index.html')));
             }
           ]
         }
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
          { action: 'delete', dest: JS_DEV_PATH + 'tutorial-navigator.js' }
        ]
      },
      publish_dev: {
        files: [
          {
            expand: true,
            cwd:    'release/',
            src:    ['**'],
            dest:   'js/tutorial-navigator/development'
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
          url: process.env.CDN_ROOT + '/' + JS_DEV_PATH + 'tutorial-navigator.js',
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
          url: process.env.CDN_ROOT + '/' + JS_BASE_PATH + major_version + '.min.js',
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

  grunt.registerTask('build',         ['clean:build', 'stylus', 'cssmin', 'browserify:build', 'uglify:build']);
  grunt.registerTask('dev',           ['clean:build', 'stylus', 'browserify:dev', 'connect:dev', 'watch' ]);
  grunt.registerTask('purge_cdn_dev', ['http:purge_js_dev']);
  grunt.registerTask('cdn_dev',       ['build', 'copy:release_dev', 'aws_s3:clean_dev', 'aws_s3:publish_dev', 'purge_cdn_dev']);
  grunt.registerTask('purge_cdn',     ['http:purge_js', 'http:purge_js_min', 'http:purge_major_js', 'http:purge_major_js_min', 'http:purge_minor_js', 'http:purge_minor_js_min']);
  grunt.registerTask('cdn',           ['build', 'copy:release', 'aws_s3:clean', 'aws_s3:publish', 'purge_cdn']);
  grunt.registerTask('default',       ['build']);
};
