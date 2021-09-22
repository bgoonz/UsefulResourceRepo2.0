var
    mkdirp = require('mkdirp'),
    path = require('path');

if (!process.env.SSH_AUTH_SOCK)
{
    console.error('not ok - only ssh-agent authentication is supported');
    process.exit(1);
}

var devbase = path.resolve(__dirname, 'skimdev');
mkdirp.sync(devbase);

module.exports =
[
    { type: 'fs', path: devbase + '/0' },
    'ssh://localhost:' + devbase + '/1',
];
