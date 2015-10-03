var pkg = require('./package');

var minorVersion = pkg.version.replace(/\.(\d)*$/, '');
var majorVersion = pkg.version.replace(/\.(\d)*\.(\d)*$/, '');
var path = require('path');
var join = path.join;
var fs = require('fs');
var read = fs.readFileSync;

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    connect: {
      dev: {
        options: {
          hostname: '*',
          port: 8989,
          middleware: function (connect, options) {
            return [
              connect.static(__dirname),
              function routing(req, res, next) {
                if (!/^\/routing/.test(req.originalUrl)) return next();
                res.end(read(join(__dirname, 'example/routing.html')));
              },
              function standalone(req, res, next) {
                if (!/^\/standalone/.test(req.originalUrl)) return next();
                res.end(read(join(__dirname, 'example/standalone.html')));
              },
              function basic(req, res, next) {
                res.end(read(join(__dirname, 'example/index.html')));
              }
            ]
          }
        }
      },
    },
    watch: {
      dev: {
        files: ['*', 'lib/**/*'],
        tasks: ["shell:component_install", "shell:component_build"]
      }
    },
    clean: [
      'release/'
    ],

    shell: {
      component_install: {
        command: './node_modules/.bin/component-install'
      },
      component_install_test: {
        command: './node_modules/.bin/component-install --dev'
      },
      component_build: {
        command: './node_modules/.bin/component-build --use component-stylus'
      },
      component_build_test: {
        command: './node_modules/.bin/component-build --dev --use component-stylus --out build'
      },
      component_build_release: {
        command: [
          './node_modules/.bin/component-build --use component-stylus --out release',
          './node_modules/.bin/component-build --use component-stylus,component-minify --out release --name build.min',
          './node_modules/.bin/component-build --use component-stylus --out release --standalone TutorialNavigator --name standalone',
          './node_modules/.bin/component-build --use component-stylus,component-minify --out release --standalone TutorialNavigator --name standalone.min'
        ].join(' && ')
      },
      component_test_phantom: {
        command: 'node ./node_modules/.bin/component-test phantom'
      },
      component_test_browser: {
        command: 'node ./node_modules/.bin/component-test browser'
      }
    },

    http: {
      purge: {
        options: {
          url: process.env.CDN_ROOT + '/tutorial-navigator/latest',
          method: 'DELETE'
        }
      },
      purge_version: {
        options: {
          url: process.env.CDN_ROOT + '/tutorial-navigator/' + pkg.version,
          method: 'DELETE'
        }
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
      clean: {
        files: [
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/build.css', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/build.js', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/build.min.css', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/build.min.js', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/standalone.css', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/standalone.js', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/standalone.min.css', },
          { action: 'delete', dest: 'tutorial-navigator/' + pkg.version + '/standalone.min.js', },
          { action: 'delete', dest: 'tutorial-navigator/latest/build.css', },
          { action: 'delete', dest: 'tutorial-navigator/latest/build.js', },
          { action: 'delete', dest: 'tutorial-navigator/latest/build.min.css', },
          { action: 'delete', dest: 'tutorial-navigator/latest/build.min.js', },
          { action: 'delete', dest: 'tutorial-navigator/latest/standalone.css', },
          { action: 'delete', dest: 'tutorial-navigator/latest/standalone.js', },
          { action: 'delete', dest: 'tutorial-navigator/latest/standalone.min.css', },
          { action: 'delete', dest: 'tutorial-navigator/latest/standalone.min.js', },
        ]
      },
      publish: {
        files: [
          {
            expand: true,
            cwd: 'release/',
            src: ['**'],
            dest: 'tutorial-navigator/' + pkg.version + '/'
          },
          {
            expand: true,
            cwd: 'release/',
            src: ['**'],
            dest: 'tutorial-navigator/latest/'
          },
        ]
      }
    }
  });

  grunt.registerTask('dev', ['shell:component_install', 'shell:component_build', 'connect', 'watch'])
  grunt.registerTask('build', ['clean', 'shell:component_install', 'shell:component_build_release']);
  grunt.registerTask('test', ['clean', 'shell:component_install_test', 'shell:component_build_test', 'shell:component_test_phantom']);
  grunt.registerTask('test:browser', ['clean', 'shell:component_install_test', 'shell:component_build_test', 'shell:component_test_browser']);
  grunt.registerTask('cdn', ['build', 'aws_s3', 'http']);
  grunt.registerTask('default', ['build']);
};
