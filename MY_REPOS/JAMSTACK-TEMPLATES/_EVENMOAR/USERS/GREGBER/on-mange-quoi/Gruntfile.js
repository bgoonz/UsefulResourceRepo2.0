module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      'default': ['Gruntfile.js', 'app/**/*.js']
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

    requirejs: {
      'default': {
        options: {
          appDir: 'app/assets/js',
          baseUrl: '.',
          mainConfigFile: 'app/assets/js/main.js',
          paths: {
            'bootstrap'   : '../../../components/bootstrap/js',
            'backbone'    : '../../../components/backbone/backbone',
            'jquery'      : '../../../components/jquery/jquery',
            'lodash'      : '../../../components/lodash/dist/lodash.underscore',
            'text'        : '../../../components/requirejs-text/text',
            'handlebars'  : '../../../components/handlebars/handlebars'
          },
          modules: [
            {
              name: 'main'
            },
            {
              name: 'app/routes/home',
              exclude: [
                'main'
              ],
              include: [
                'app/routes/about'
              ]
            },
            {
              name: 'app/routes/food-meeting/new',
              exclude: [
                'main'
              ],
              include: [
                'app/routes/food-meeting/poll',
                'app/routes/food-meeting/register'
              ]
            },
          ],
          dir: 'public/assets/js',
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

    copy: {
      'default': {
        files: [
          {src: '**', dest: 'public/assets/tpl/', expand: true, cwd: 'app/assets/tpl/'},
          {src: '**', dest: 'public/assets/img/', expand: true, cwd: 'app/assets/img/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'less', 'requirejs', 'uglify', 'copy']);
};