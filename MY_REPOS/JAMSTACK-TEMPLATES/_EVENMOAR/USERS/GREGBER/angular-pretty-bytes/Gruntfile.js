module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            default: {
                options: {
                    preserveComments: 'some',
                    sourceMap: 'angular-pretty-bytes.min.map',
                    sourceMappingURL: 'angular-pretty-bytes.min.map'
                },
                files: {
                    'angular-pretty-bytes.min.js': 'angular-pretty-bytes.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};