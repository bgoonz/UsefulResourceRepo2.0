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
    Skimmer  = require('../skim.js'),
    util     = require('util')
    ;

var createTestClient = require('./client');
var skimmer, mclient;

describe('constructor', function()
{
    it('requires an options object', function(done)
    {
        function shouldThrow() { return new Skimmer(); }
        shouldThrow.must.throw(/options object/);
        done();
    });

    it('requires a url in opts.db', function(done)
    {
        function shouldThrow() { return new Skimmer({ source: 'I am not a url' }); }
        shouldThrow.must.throw(/couch url/);
        done();
    });

    it('requires that a `sequenceFile` option be a string', function(done)
    {
        function shouldThrow() { return new Skimmer({ source: 'http://localhost:15984/registry', sequenceFile: 20 }); }
        shouldThrow.must.throw(/sequenceFile/);
        done();
    });

    it('requires a MultiFS client option', function(done)
    {
        function shouldThrow() { return new Skimmer({ source: 'http://localhost:15984/registry', sequenceFile: '.sequence' }); }
        shouldThrow.must.throw(/multi\-fs client/);
        done();
    });

    it('requires a number if opts.inactivity_ms is provided', function(done)
    {
        function shouldThrow() { return new Skimmer(
        {
            client:        createTestClient(),
            source:        'http://localhost:15984/registry',
            sequenceFile:  '.sequence',
            inactivity_ms: 'foo',
        }); }
        shouldThrow.must.throw(/inactivity_ms/);
        done();
    });

    it('requires a number if opts.seq is provided', function(done)
    {
        function shouldThrow() { return new Skimmer(
        {
            client:        createTestClient(),
            source:        'http://localhost:15984/registry',
            sequenceFile:  '.sequence',
            seq: 'foo',
        }); }
        shouldThrow.must.throw(/seq/);
        done();
    });

    it('requires a valid url if opts.registry is provided', function(done)
    {
        function shouldThrow() { return new Skimmer(
        {
            client:       createTestClient(),
            source:       'http://localhost:15984/registry',
            sequenceFile: '.sequence',
            registry:     'foo',
        }); }
        shouldThrow.must.throw(/valid url/);
        done();
    });

    it('requires a valid url if opts.skimdb is provided', function(done)
    {
        function shouldThrow() {
            return new Skimmer(
            {
                client:       createTestClient(),
                source:       'http://localhost:15984/registry',
                sequenceFile: '.sequence',
                skimdb:       'foo',
            });
        }
        shouldThrow.must.throw(/skimdb/);
        done();
    });
});
