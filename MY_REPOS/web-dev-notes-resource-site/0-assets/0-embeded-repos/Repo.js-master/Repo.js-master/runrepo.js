// require('../app')
require("../config/globals");
DEBUG = "*";
// enable debug library (https://github.com/visionmedia/debug)
require("debug").enable(DEBUG);
var Repo = require("../helpers/repo");

var log = require("debug")("runRepo");

var url = "https://github.com/bgoonz/WEB-DEV-NOTES.git";
var commit = "5333c8e7c81bf66fe83f88e62bc80315248df5f6";
var entry = "README.md";
// Repo.git.createNewRepo()
Repo.git.fork(url, commit, entry);
// Repo.git.createNewRepo()
// Repo.git.createBranch()
// Repo.git.pull()
// Repo.git.addAndCommit()
// Repo.git.push()
// Repo.git.mergeCleanly()

//var cred = Cred.userpassPlaintextNew(username, password);
