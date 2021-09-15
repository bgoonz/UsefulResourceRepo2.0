/*jslint node:true */

module.exports = function (grunt) {
    var exec = require('child_process').spawn,
        path = require('path');

    grunt.registerMultiTask('shifter', 'Run shifter', function () {
        var done = this.async(),
            args = [],
            shifter;

        args.push('--walk');

        if (this.data.dest) {
            args.push('--build-dir');
            args.push(path.relative(this.data.src, this.data.dest));
        }

        if (this.data.lint === false) {
            args.push('--no-lint');
        }
        
        if(this.data.lint === 'config') {
            args.push('--lint', 'config');
        }
        
        if(this.data.version) {
            args.push('--replace-version=' + this.data.version);
        }
        
        if (grunt.option('verbose')) {
            args.push('--lint-stderr'); // print lint errors
        }

        shifter = exec('shifter', args, {
            cwd: this.data.src,
            stdio: 'inherit',
            env: process.env
        });
        
        shifter.on('exit', function (code) {
            if (code) {
                grunt.fail.fatal('Shifter failed with code: ' + code);
            } else {
                grunt.log.ok('Shifter build complete.');
                done();
            }
        });

    });
};