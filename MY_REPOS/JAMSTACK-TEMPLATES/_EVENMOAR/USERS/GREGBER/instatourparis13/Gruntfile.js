module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        files: [
          {dest: 'public/views/', src: '**', cwd: 'client/views/', expand: true},
          {dest: 'public/img/', src: '**', cwd: 'client/img/', expand: true},
          {dest: 'public/fonts/', src: '**', cwd: 'bower_components/font-awesome/fonts/', expand: true}
        ]
      }
    },

    uglify: {
      build: {
        files: {
          'public/js/main.js': [
            'bower_components/hammerjs/dist/hammer.js',
            'bower_components/mousetrap/mousetrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angulartics/src/angulartics.js',
            'bower_components/angulartics/src/angulartics-google-analytics.js',
            'client/js/resources.js',
            'client/js/grid.js',
            'client/js/detail.js',
            'client/js/app.js'
          ]
        }
      }
    },

    less: {
      build: {
        options: {
          yuicompress: true,
        },
        files: {
          'public/css/main.css': 'client/less/main.less'
        }
      }
    },

    shell: {
      prune: {
        command: 'npm prune --production'
      }
    },

    watch: {
      scripts: {
        files: 'client/**/*',
        tasks: ['build'],
        options: {
          interrupt: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['copy', 'uglify', 'less']);
  grunt.registerTask('heroku', ['build', 'shell:prune']);
};