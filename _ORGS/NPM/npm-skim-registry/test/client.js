var
    MultiFS = require('multi-fs'),
    path    = require('path')
    ;

var base = path.resolve(__dirname, 'tmp/registry-testing');

var cwd = process.cwd()
var locshort = base
if (cwd && base.indexOf(cwd) === 0)
    locshort = base.substr(cwd.length).replace(/^\/+/, '');

var home = process.env.HOME;
var homeshort = base;
if (home && base.indexOf(home) === 0)
    homeshort = base.substr(home.length).replace(/^\/+/, '');

var targets =
[
    { type: 'fs', path: base + '/0' },
];

var createClient = module.exports = function createClient()
{
    return new MultiFS(targets);
};
