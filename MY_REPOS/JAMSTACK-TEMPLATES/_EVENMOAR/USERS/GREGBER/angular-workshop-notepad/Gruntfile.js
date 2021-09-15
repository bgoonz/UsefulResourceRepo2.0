module.exports = function (grunt) {
  grunt.initConfig({
    supervisor: {
      target: {
        script: 'server',
        options: {
          ignore: ['.']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-supervisor');

  grunt.registerTask('default', ['supervisor']);
};