var pkg = require('./package.json');

module.exports = function (grunt) {

  /**
   * Initialize config.
   */

  grunt.initConfig({
    shipit: {
      options: {
        // Project will be build in this directory.
        workspace: '/tmp/hello-world-workspace',

        // Project will be deployed in this directory.
        deployTo: '/usr/src/hello-world',

        // Repository url.
        repositoryUrl: pkg.repository.url,

        // This files will not be transfered.
        ignores: ['.git', 'node_modules'],

        // Number of release to keep (for rollback).
        keepReleases: 3
      },

      // Staging environment.
      staging: {
        servers: ['my-remote-server.com']
      }
    }
  });

  /**
   * Load shipit task.
   */

  grunt.loadNpmTasks('grunt-shipit');

  /**
   * Start project on the remote server.
   */

  grunt.registerTask('start', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('cd ' + current + ' && npm start', done);
  });

  /**
   * Run start task after deployment.
   */

  grunt.shipit.on('published', function () {
    grunt.task.run(['start']);
  });
};