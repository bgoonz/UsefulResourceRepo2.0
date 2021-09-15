#!/usr/bin/env node

var path = require('path');
var YUI = require('yui').YUI;

var Y = YUI({
    useSync: true,
    modules: {
        'promise-each': {
            fullpath: path.join(__dirname, 'promise-each.js'),
            requires: ['promise']
        }
    }
}).use('promise-each');

Y.Promise.each(['foo', 'bar', Y.when('teapot'), 'baz'], function (val, idx) {
    if (idx === 1) {
        throw new Error('BOOM at index 1');
    }
    console.log('"%s" at index %d', val, idx);
})
    .then(function (result) {
        console.log('result', result);
    })
    .catch(function (ex) {
        console.error(ex);
    });
