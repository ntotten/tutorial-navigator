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
        dest: "build/build.js"
      }
    },
    clean: {
      dev: ["build/"]
    },
    connect: {
      dev: {
        options: {
          hostname: "*",
          base: [".", "example"],
          port: 8989
        }
      },
    },
    stylus: {
        build: {
          options: {
              compress: false // temp
            },
          src: ["css/tutorial-navigator.styl", "css/carousel.styl"],
          dest: "build/build.css"
        }
    },
    watch: {
        stylus: {
          files: ["css/tutorial-navigator.styl", "css/carousel.styl"],
          tasks: ["stylus:build"]
        }
      },
  });

  grunt.registerTask("dev", ["clean:dev", "stylus", "browserify:dev", "connect:dev", "watch", ]);
};
