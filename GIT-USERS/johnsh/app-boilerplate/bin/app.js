#!/usr/bin/env node

'use strict';

/**
 * Borrowed from gulp, MIT License (MIT)
 * Copyright (c) 2014-2015 Fractal <contact@wearefractal.com>
 */

var fs = require('fs');
var path = require('path');
var archy = require('archy');
var chalk = require('chalk');
var tildify = require('tildify');
var verbLog = require('verb-log');
var Liftoff = require('liftoff');
var v8flags = require('v8flags');
var resolve = require('resolve');
var prettyTime = require('pretty-hrtime');
var argv = require('minimist')(process.argv.slice(2));

/**
 * Local dependencies
 */

var completion = require('../lib/utils/completion');
var taskTree = require('../lib/utils/task-tree');
var pkg = require('../package');

// store a reference to the current CWD
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'app',
  completions: completion,
  extensions: { '.js': null, '.coffee': 'coffee-script/register' },
  v8flags: v8flags
});

// exit with 0 or 1
var failed = false;
process.once('exit', function(code) {
  if (code === 0 && failed) {
    exit(1);
  }
});

/**
 * flags
 */

var versionFlag = argv.v || argv.version;
var tasksFlag = argv.T || argv.tasks;
var tasks = argv._;
var toRun = tasks.length ? tasks : ['default'];

var simpleTasksFlag = argv['tasks-simple'];
var shouldLog = !argv.silent && !simpleTasksFlag;

if (!shouldLog) {
  verbLog = function(){};
}

cli.on('require', function(name) {
  verbLog('Requiring external module', chalk.magenta(name));
});

cli.on('requireFail', function(name) {
  verbLog(chalk.red('Failed to load external module'), chalk.magenta(name));
});

cli.on('respawn', function (flags, child) {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  verbLog('Node flags detected:', nodeFlags);
  verbLog('Respawned to PID:', pid);
});

cli.launch({
  cwd: argv.cwd,
  configPath: argv.appfile,
  require: argv.require,
  completion: argv.completion
}, run);


// the actual logic
function run(env) {
  console.log(); // empty line
  var appfile = env.configPath;

  if (versionFlag && tasks.length === 0) {
    verbLog('CLI version', pkg.version);
    if (env.modulePackage && typeof env.modulePackage.version !== 'undefined') {
      verbLog('Local version', env.modulePackage.version);
    }
  }

  // `node_modules/app`
  if (!appfile || !env.modulePath || !fs.existsSync(env.modulePath)) {
    /* deps: app */
    try {
      env.modulePath = resolve.sync('app');
    } catch(err) {
      env.modulePath = path.join(__dirname, '../index.js');
    }
  }

  // chdir before requiring `appfile.js` to allow users to chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    verbLog('working directory changed to', tildify(env.cwd));
  }

  // require app
  var appInst = require(env.modulePath);
  appInst.extend('argv', argv);

  if (!argv._.length && argv['no-task']) {
    exit(0);
  }

  // `appfile.js`
  if (!appfile) {
    appfile = path.join(__dirname, '..', 'appfile.js');
    env.configBase = path.dirname(env.configBase);
    require(appfile)(appInst);
    appInst.emit('loaded');
  } else {
    // this is what actually loads up the appfile
    require(appfile);
    appInst.emit('loaded');
  }

  verbLog('using appfile', tildify(appfile));
  logEvents(appInst);

  process.nextTick(function () {
    if (simpleTasksFlag) {
      return logTasksSimple(env, appInst);
    }
    if (tasksFlag) {
      return logTasks(env, appInst);
    }
    appInst.run.apply(appInst, toRun);
  });
}


function logTasks(env, localApp) {
  var tree = taskTree(localApp.tasks);
  tree.label = 'Tasks for ' + tildify(env.configPath);
  archy(tree).split('\n').forEach(function (v) {
    if (v.trim().length === 0) {
      return;
    }
    verbLog(v);
  });
}

function logTasksSimple(env, localApp) {
  var keys = Object.keys(localApp.tasks);
  console.log(keys.join('\n').trim());
}

// format orchestrator errors
function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}

// wire up logging events
function logEvents(appInst) {
  appInst.on('err', function () {
    failed = true;
  });

  appInst.on('task_start', function (e) {
    verbLog('starting', '\'' + chalk.cyan(e.task) + '\'');
  });

  appInst.on('task_stop', function (e) {
    var time = prettyTime(e.hrDuration);
    verbLog('finished', '\'' + chalk.cyan(e.task) + '\'', 'after', chalk.magenta(time));
  });

  appInst.on('task_err', function (e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    verbLog(chalk.cyan(e.task), chalk.red('errored after'), chalk.magenta(time));
    verbLog(msg);
  });

  appInst.on('task_not_found', function (err) {
    verbLog(chalk.red('task \'' + err.task + '\' is not in your appfile'));
    verbLog('please check the documentation for proper appfile formatting');
    exit(1);
  });
}


// fix stdout truncation on windows
function exit(code) {
  if (process.platform === 'win32' && process.stdout.bufferSize) {
    process.stdout.once('drain', function() {
      process.exit(code);
    });
    return;
  }
  process.exit(code);
}
