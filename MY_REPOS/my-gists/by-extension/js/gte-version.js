#!/usr/bin/env node

/**
Git Tag Extended Version

A method to derive Maven/Nexus-compatible versions from git tags.

    npm i bluebird
    ./gte-version.js

**/

module.exports = promisedVersion;

var Promise = require('bluebird');
var execSync = Promise.promisify(require('child_process').exec);

// Utilities ----------------------------------------------------------------

function trimStdout(stdout) {
    return String(stdout).trim();
}

function getOutput(command) {
    return execSync(command).spread(trimStdout);
}

function cleanBranchName(stdout) {
    return stdout.replace(/\//g, '_');
}

function parseLongDescribe(stdout) {
    var meta = {};

    // v1.0-6608-g09e4ce6
    var splat = stdout.split('-');

    var commit = splat.pop()
        .substr(1); // removes 'g' prefix

    meta.commit = commit;

    var countSinceTag = splat.pop();

    var tagged = splat.pop()
        .substr(1)  // removes 'v' prefix
        .split('.');

    meta.major = tagged[0];
    meta.minor = tagged[1];
    // ignores 'patch', if present

    return meta;
}

// Promises -----------------------------------------------------------------

function getBranchName() {
    return getOutput('git symbolic-ref --short HEAD').then(cleanBranchName);
}

function getVersionMeta() {
    return getOutput('git describe --long --match v*').then(parseLongDescribe);
}

function getRevCount() {
    return getOutput('git rev-list --count HEAD');
}

function finish(branchName, versionMeta, revCount) {
    var version,
        major = 0,
        minor = 0,
        micro = revCount,
        qualifier = [branchName, versionMeta.commit].join('.');

    if ((/(master|release|hotfix)/i).test(branchName)) {
        major = versionMeta.major;
        minor = versionMeta.minor;
    }

    version = [major, minor, micro].join('.');
    version += '-' + qualifier;

    return version;
}

// Main ---------------------------------------------------------------------

function promisedVersion() {
    return Promise.join(getBranchName(), getVersionMeta(), getRevCount(), finish);
}

if (require.main === module) {
    promisedVersion().then(console.log);
}
