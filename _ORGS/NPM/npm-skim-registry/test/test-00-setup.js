'use strict';

var
    lab      = require('lab'),
    describe = lab.describe,
    it       = lab.it,
    before   = lab.before,
    demand   = require('must'),
    fs       = require('fs'),
    mkdirp   = require('mkdirp'),
    path     = require('path'),
    spawn    = require('child_process').spawn,
    Request  = require('request')
    ;

describe('setup', function()
{
    it('can create test destination directories', function(done)
    {
        var fix = path.join(__dirname, 'tmp', 'registry-testing');
        mkdirp(path.join(fix, '0'), function(err)
        {
            demand(err).not.exist();
            mkdirp(path.join(fix, '1'), function(err)
            {
                demand(err).not.exist();
                done();
            });
        });
    });

    // run with the cwd of the main program.
    var cwd = path.dirname(__dirname);

    var conf = path.resolve(__dirname, 'fixtures', 'couch.ini');
    var pidfile = path.resolve(__dirname, 'couch-tmp', 'pid');
    var logfile = path.resolve(__dirname, 'couch-tmp', 'couch.log');
    var started = /Apache CouchDB has started on http:\/\/127\.0\.0\.1:15984\/\n$/;

    it('can set up couch tmp directory', function(done)
    {
        fs.mkdirSync(path.join(__dirname, 'couch-tmp'));
        done();
    });

    it('can start couch as a zombie child', { timeout: 25000 }, function(done)
    {
        if (process.env.WERCKER_COUCHDB_HOST)
            return done(); // couch already running

        var fd = fs.openSync(pidfile, 'wx');
        try { fs.unlinkSync(logfile); } catch (er) {}
        var child = spawn('couchdb', ['-a', conf], {
            detached: true,
            stdio: 'ignore',
            cwd: cwd
        });
        child.unref();

        child.pid.must.be.truthy();
        fs.writeSync(fd, child.pid + '\n');
        fs.closeSync(fd);

        // wait for it to create a log, give it 15 seconds
        var start = Date.now();

        fs.readFile(logfile, function R(err, log)
        {
            log = log ? log.toString() : '';
            if (!err && !log.match(started))
                err = new Error('not started yet');
            if (err)
            {
                if (Date.now() - start < 25000)
                    return setTimeout(function () { fs.readFile(logfile, R) }, 1000);
                else
                    demand(err).be.falsy();
            }
            done();
        });
    });

    it('can create a registry db', function(done)
    {
        if (process.env.WERCKER_COUCHDB_HOST)
            return done(); // db already created

        Request.put('http://admin:admin@localhost:15984/registry/', function(err, res, body)
        {
            res.statusCode.must.equal(201);
            done();
        });
    });

});
