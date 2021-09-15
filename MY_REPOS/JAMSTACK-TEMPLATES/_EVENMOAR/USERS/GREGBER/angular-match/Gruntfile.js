module.exports = function (grunt) {

  /**
   * Configuration.
   */

  grunt.initConfig({
    uglify: {
      default: {
        options: {
          preserveComments: 'some',
          sourceMap: 'angular-match.min.map',
          sourceMappingURL: 'angular-match.min.map'
        },
        files: {
          'angular-match.min.js': 'angular-match.js'
        }
      }
    }
  });

  /**
   * Tasks.
   */

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};