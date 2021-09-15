'use strict';

var
    lab      = require('lab'),
    describe = lab.describe,
    it       = lab.it,
    before   = lab.before,
    after    = lab.after,
    demand   = require('must'),
    fs       = require('fs'),
    path     = require('path'),
    Request  = require('request'),
    Skimmer  = require('../skim.js'),
    util     = require('util')
    ;

var createTestClient = require('./client');

describe('skimming', function()
{
    function makeCouchURI()
    {
        if (process.env.WERCKER_COUCHDB_URL)
            return 'http://' + process.env.WERCKER_COUCHDB_URL + '/registry';
        else
            return 'http://admin:admin@localhost:15984/registry';
    }

    function createSkimmer(seq)
    {
        var opts =
        {
            client:        createTestClient(),
            source:        makeCouchURI(),
            registry:      'http://registry.example.com/',
            sequenceFile:  './test/couch-tmp/sequence',
            seq:           seq,
            inactivity_ms: 20000,
            delete:        true,
        };
        var skimmer = new Skimmer(opts);
        // skimmer.on('log', function(msg) { console.log('LOG: ' + msg); });
        return skimmer;
    }

    function verifyExpectedEvents(expected, callback)
    {
        function checkEvent()
        {
            var str = util.format.apply(util, arguments);
            //console.log('----> ' + str)
            expected.must.have.property(str);

            expected[str]--;
            if (expected[str] === 0)
                delete expected[str];

            if (Object.keys(expected).length === 0)
            {
                callback();
            }
        }

        function checkPut(change) { checkEvent('put %s', change.id); }

        var skimmer = createSkimmer();

        skimmer
        .on('put', checkPut)
        .on('rm', function(change) { checkEvent('rm %s', change.id); })
        .on('send', function(change, file) { checkEvent('sent %s', file); })
        .on('delete', function(change, file) { checkEvent('delete %s', file); })
        .on('attachment', function(change, file) { checkEvent('attachment %s', file); })
        .on('complete', function(change, results) { checkEvent('complete %s', change.id); })
        .on('error', function(err)
        {
            console.log('woah skimmer threw an error!');
            if (err.stackTrace)
                console.error(err.stackTrace());
            else
                console.error(err);
            // demand(err).not.exist();
        });

        return skimmer;
    }

    it('can publish a test package to couchdb', function(done)
    {
        var testPkg = require('./fixtures/test-package.json');
        var tf = path.resolve(__dirname, 'fixtures/test-package-0.0.0.tgz');
        var tgzData = fs.readFileSync(tf, 'base64');
        testPkg._attachments['test-package-0.0.0.tgz'].data = tgzData;
        testPkg._attachments['test-package-0.0.0.tgz'].stub = false;

        var opts =
        {
            uri:    makeCouchURI() + '/test-package',
            method: 'PUT',
            json:   testPkg,
        };

        Request(opts, function(err, response, body)
        {
            demand(err).not.exist();
            response.statusCode.must.equal(201);
            done();
        });
    });

    it('emits expected events on a first sync', { timeout: 20000 }, function(done)
    {
        var expected =
        {
            'put test-package' : 2,
            'attachment test-package/_attachments/test-package-0.0.0.tgz' : 1,
            'sent t/test-package/doc.json' : 2,
            'sent t/test-package/_attachments/test-package-0.0.0.tgz' : 1,
            'complete test-package': 2
        };

        function cleanup() { skimmer.destroy(); setTimeout(done, 1000); }
        var skimmer = verifyExpectedEvents(expected, cleanup);
        skimmer.start();
    });

    it('writes files with correct md5 sums', { timeout: 20000 }, function(done)
    {
        var client = createTestClient();
        var target = 't/test-package/_attachments/test-package-0.0.0.tgz';
        client.md5(target, function(err, res, data)
        {
            demand(err).not.exist();
            res.must.be.a.string();
            res.must.equal('370c275ddb2ea5b4291a6aa801da8bd8');
            client.close();
            done();
        });
    });

    it('removes the attachment from couch', { timeout: 10000 }, function(done)
    {
        Request.get(makeCouchURI() + '/test-package', {json: true}, function(err, response, body)
        {
            demand(err).not.exist();
            body.must.be.an.object();
            body.must.not.have.property('_attachments');
            done();
        });
    });

    it('does not recopy attachments it already has', { timeout: 20000 }, function(done)
    {
        var expected =
        {
            'put test-package' : 1,
            'sent t/test-package/doc.json' : 1,
            'complete test-package': 1
        };

        function cleanup() { skimmer.destroy(); setTimeout(done, 1000); }
        var skimmer = verifyExpectedEvents(expected, cleanup);
        skimmer.sequence = 0; // hack
        skimmer.start();
    });

    it('updates the sequence file', function(done)
    {
        fs.readFile('./test/couch-tmp/sequence', 'ascii', function(err, data)
        {
            demand(err).not.exist();
            var num = parseInt(data, 10);
            num.must.equal(2);
            done();
        });
    });

    function publishPackage(callback)
    {
        var testPkg = require('./fixtures/semver.json');
        var tf = path.resolve(__dirname, 'fixtures/test-package-0.0.0.tgz');
        var tgzData = fs.readFileSync(tf, 'base64');
        testPkg._attachments['semver-0.1.0.tgz'].data = tgzData;
        testPkg._attachments['semver-0.1.0.tgz'].stub = false;

        var opts =
        {
            uri:    makeCouchURI() + '/semver',
            method: 'PUT',
            json:   testPkg,
        };

        Request(opts, function(err, response, body)
        {
            demand(err).not.exist();
            response.statusCode.must.equal(201);
            callback();
        });
    }

    it('handles a live publish correctly', { timeout: 20000 }, function(done)
    {
        var client = createTestClient();
        var expected2 =
        {
            'put semver' : 2,
            'attachment semver/_attachments/semver-0.1.0.tgz' : 1,
            'sent s/semver/doc.json' : 2,
            'sent s/semver/_attachments/semver-0.1.0.tgz' : 1,
            'complete semver': 2,
        };

        function cleanup() { skimmer.destroy(); setTimeout(done, 1000); }

        var skimmer = verifyExpectedEvents(expected2, cleanup);
        skimmer.start();
        publishPackage(function()
        {
            // console.log('published a second package');
        });
    });

    it('updated the registry url properly', function(done)
    {
        Request.get(makeCouchURI() + '/semver', {json: true}, function(err, res, body)
        {
            var tarball = body.versions['0.1.0'].dist.tarball;
            tarball.must.be.a.string();
            tarball.must.match(/registry.example.com/);
            done();
        });
    });

    it('deletes files when delete is set', { timeout: 10000 }, function(done)
    {
        var client = createTestClient();
        var skimmer = createSkimmer();
        skimmer.on('delete', function(change, file)
        {
            change.must.be.an.object();
            change.id.must.equal('semver');

            client.stat('s/semver/_attachments/semver-0.1.0.tgz', function(err, response)
            {
                err.must.be.an.object();
                err.code.must.equal('ENOENT');
                cleanup();
            });
        });

        skimmer.start();

        function cleanup()
        {
            client.destroy();
            skimmer.destroy();
            setTimeout(done, 1000);
        }

        Request.get(makeCouchURI() + '/semver', {json: true}, function(err, res, body)
        {
            var opts =
            {
                uri: makeCouchURI() + '/semver',
                method: 'DELETE',
                json: true,
                qs: { rev: body._rev}
            };
            Request(opts, function(err, res, body)
            {
                demand(err).not.exist();
                res.statusCode.must.equal(200);
                body.must.be.an.object();
                body.must.have.property('ok');
                body.ok.must.be.true();
            });
        });

    });
});
