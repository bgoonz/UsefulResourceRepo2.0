var fs = require('fs');
var path = require('path');

var json = require("../package.json");
var match = json.name.match(/^@runkit\/(.*)_(.*)$/);

// check if our module name actually makes sense, otherwise abort
if (!match) throw new Error("Unknown package structure!");

// check if we're actually inside a node_modules/@runkit folder, otherwise don't create symlinks
if (path.basename(path.dirname(process.cwd())) !== "@runkit" || path.basename(path.dirname(path.dirname(process.cwd()))) !== "node_modules") {
    console.log("Not installing as notebook: " + process.cwd());
    return;
}

console.log("creating notebook symlinks");

var userPath = path.join("..", match[1]);
var repoPath = path.join(userPath, match[2]);

mkdir(userPath);
mkdir(repoPath);

var branchMatch = json.version.match(/^0\.0\.0\-(.*)$/);

if (branchMatch) {
    var branchPath = path.join(repoPath, "branches");
    mkdir(branchPath);

    var versionPath = path.join(branchPath, branchMatch[1]);
    var relativePath = path.join("..", "..", "..", path.basename(process.cwd()));

    unlink(versionPath);
    fs.symlinkSync(relativePath, versionPath);
} else {
    var relativePath = path.join("..", "..", path.basename(process.cwd()));
    var latestPath = path.join(repoPath, "latest");
    var versionPath = path.join(repoPath, json.version);

    unlink(latestPath);
    fs.symlinkSync(relativePath, latestPath);

    unlink(versionPath);
    fs.symlinkSync(relativePath, versionPath);
}

function mkdir(p) {
    try {
        fs.mkdirSync(p);
    } catch (e) {}
}

function unlink(p) {
    try {
        fs.unlinkSync(p);
    } catch (e) {}
}