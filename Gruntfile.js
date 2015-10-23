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
    browserify: {
      options: {
        browserifyOptions: {
          extensions: ['.jsx'],
          transform: [
             [ 'reactify' , {"es6": true}]
          ]
        }
      },
      dev: {
        options: {
          watch: true,
        },
        src: ["lib/tutorial-navigator.jsx"],
        dest: "build/tutorial-navigator.js"
      },
      build: {
        src: ["lib/tutorial-navigator.jsx"],
        dest: "build/tutorial-navigator.js"
      },
    },
    clean: {
      dev: ["build/"]
    },
    connect: {
      dev: {
        options: {
          hostname: "*",
          base: [".", "example"],
          port: 8990
        }
      },
    },
    stylus: {
        build: {
          options: {
              compress: false // temp
            },
          src: ["css/tutorial-navigator.styl", "css/carousel.styl"],
          dest: "build/tutorial-navigator.css"
        }
    },
    watch: {
        stylus: {
          files: ["css/tutorial-navigator.styl", "css/carousel.styl"],
          tasks: ["stylus:build"]
        }
      },
    uglify: {
      build: {
        src: "build/tutorial-navigator.js",
        dest: "build/tutorial-navigator.min.js"
      }
    }
  });

  grunt.registerTask("dev", ["clean:dev", "stylus", "browserify:dev", "connect:dev", "watch", ]);
  grunt.registerTask('build', ['clean', "stylus", "browserify:dev", "uglify:build"]);
  grunt.registerTask('test', ['clean']);
  grunt.registerTask('test:browser', ['clean']);
  grunt.registerTask('cdn', ['build', 'aws_s3', 'http']);
  grunt.registerTask('default', ['build']);
};
