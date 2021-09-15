module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      'node': {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['Gruntfile.js', 'app/**/*.js', '!app/assets/**/*.js']
      },
      'browser': {
        options: {
          jshintrc: 'app/assets/js/.jshintrc'
        },
        src: ['app/assets/**/*.js']
      }
    },

    simplemocha: {
      all: {
        src: ['test/**/*.js', '!test/fixtures/**/*.js']
      }
    },

    less: {
      'default': {
        options: {
          paths: ['app/assets/less', 'public'],
          compress: true,
          yuicompress: true
        },
        files: {
          'public/assets/css/main.css': ['app/assets/less/main.less']
        }
      }
    },

    copy: {
      'default': {
        files: {
          'public/assets/': 'components/**/*'
        }
      }
    },

    requirejs: {
      'default': {
        options: {
          appDir: 'app/assets',
          baseUrl: '.',
          keepBuildDir: true,
          skipDirOptimize: true,
          mainConfigFile: 'app/assets/js/main.js',
          optimizeCss: 'none',
          modules: [
            {
              name: 'js/main'
            }
          ],
          dir: 'public/assets'
        }
      }
    },

    uglify: {
      'default': {
        files: {
          'public/assets/js/require.js' : 'components/requirejs/require.js'
        }
      }
    },

    md5: {
      'default': {
        files: {
          'public/assets/js/'  : ['public/assets/js/main.js', 'public/assets/js/require.js'],
          'public/assets/css/' : 'public/assets/css/main.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-md5');

  grunt.registerTask('default', ['jshint:node', 'jshint:browser', 'simplemocha', 'less', 'copy', 'requirejs', 'uglify', 'md5']);
  grunt.registerTask('test', ['jshint:node', 'jshint:browser', 'simplemocha']);
};