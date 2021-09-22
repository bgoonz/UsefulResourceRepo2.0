var TOML = require('toml');

/*
  Heruistics for continuous deployment setups.

  Lets you get possible configurations for a set of files, and lets you get
  warnings about typical setup errors like a Jekyll site without a Gemfile.
*/

/*
  List of files that we need to check for these heuristics.

  Map of file and action. The action can be:
    'check' - check if this file is present
    'read'  - read the content of this file
*/
export const files = {
  '_config.yml': 'check',
  'netlify.toml': 'read',
  'Gemfile': 'read',
  'package.json': 'read',
  'app.coffee': 'check',
  'requirements.txt': 'read',
  'yarn.lock': 'check'
};

/*
  Warn if something looks wrong with this continuous deployment setup.

  Takes an object of files that were found in the deploy folder and return a
  warning if any.

  Depending on the action for the files the value for a file should either be
  true if the action is a check, or the content of the file if the action was
  read.
*/
export function warning(files = {}) {
  for (var i in warningTests) {
    var result = warningTests[i](files);
    if (result) {
      return result;
    }
  }
}

/*
  Try to guess the settings for this continuous deployment setup.

  Takes an object of files that were found in the deploy folder and return a
  warning if any.

  Depending on the action for the files the value for a file should either be
  true if the action is a check, or the content of the file if the action was
  read.
*/
export function settings(files = {}) {
  for (var i in settingsTests) {
    var result = settingsTests[i](files);
    if (result) {
      return result;
    }
  }
}

function netlifyTomlSettings(files) {
  if (!files['netlify.toml']) { return; }

  const config = TOML.parse(files['netlify.toml']);
  if (config) {
    const settings = {};
    if (config.build) {
      settings["cmd"] = config.build.command;
      settings["dir"] = config.build.publish;
    }

    if (config.template) {
      settings["template"] = config.template;
    }
    return settings;
  }
}

const gems = {
  jekyll: {cmd: 'jekyll build', dir: '_site/'},
  middleman: {cmd: 'middleman build', dir: 'build/'},
  nanoc: {cmd: 'nanoc', dir: 'output/'}
};

function gemfileSettings(files) {
  if (!files['Gemfile']) { return; }

  for (var i in gems) {
    var regexp = new RegExp(`('${i}'|"${i}")`);
    if (regexp.test(files['Gemfile'])) {
      return gems[i];
    }
  }
}

const packages = {
  brunch: {cmd: "brunch build", dir: "public/"},
  assemble: {cmd: "grunt build", dir: "dist/"},
  'ember-cli': {cmd: "ember build -e production", dir: "dist/"},
  hexo: {cmd: "hexo generate", dir: "public/"},
  metalsmith: {cmd: "metalsmith", dir: "build/"},
  roots: {cmd: "roots compile", dir: "public/"},
  docpad: {cmd: "docpad generate", dir: "out/"},
  wintersmith: {cmd: "wintersmith build", dir: "build/"},
  gatsby: {cmd: "gatsby build", dir: "public/"},
  harp: {cmd: "harp compile", dir: "www/"},
  grunt: {cmd: "grunt build", dir: "dist/"},
  gulp: {cmd: "gulp build", dir: "dist/"}
}

function packageSettings(files) {
  if (!files['package.json']) { return; }
  var data, dependencies, devDependencies;
  try {
    data = JSON.parse(files['package.json']);
  } catch(e) {
    return;
  }

  var runCommand = files['yarn.lock'] ? 'yarn' : 'npm run';

  dependencies = data.dependencies || {};
  devDependencies = data.devDependencies || {};

  if (devDependencies["react-scripts"] || dependencies["react-scripts"]) {
    return {cmd: `${runCommand} build`, dir: "build/"};
  }

  if (packages.scripts && packages.scripts.build) {
    return {cmd: `${runCommand} build`, dir: "dist/"};
  }

  for (var i in packages) {
    if (dependencies[i] || devDependencies[i]) {
      return packages[i];
    }
  }
}

const requirements = {
  mkdocs: {cmd: "mkdocs build", dir: "site/"},
  pelican: {cmd: "pelican content", dir: "output/"},
  cactus: {cmd: "cactus build", dir: ".build/"}
};

function requirementsSettings(files) {
  if (!files['requirements.txt']) { return; }

  for (var i in requirements) {
    var regexp = new RegExp(`^${i}(==)?`);
    if (regexp.test(files['requirements.txt'])) {
      return requirements[i];
    }
  }
}

const settingsTests = [netlifyTomlSettings, gemfileSettings, requirementsSettings, packageSettings];


function jekyllWarnings(files) {
  if (!files['_config.yml']) { return; }
  if (!files['Gemfile']) { return messages['jekyll with no gemfile']; }
  if (!files['Gemfile'].match(/('jekyll'|"jekyll")/)) { return messages['jekyll not in gemfile']; }
}

function packageWarnings(files) {
  var data;
  if (!files['package.json']) { return; }

  try { data = JSON.parse(files['package.json']); } catch(e) { return messages['error parsing package.json']; }

  if (files['app.coffee'] && !(
    (data.dependencies && data.dependencies.roots) ||
    (data.devDependencies && data.devDependencies.roots)
  )) {
    return messages['roots not in package.json'];
  }
}

const warningTests = [jekyllWarnings, packageWarnings];

const messages = {
  'jekyll with no gemfile':

`It looks like this a **Jekyll** site, but you don't have a **Gemfile**.
Add a Gemfile with Jekyll to make netlify install the right version of Jekyll
before running your build.`,

  'jekyll not in gemfile':

`It looks like this is a **Jekyll** site, but your **Gemfile** doesn't list
Jekyll as a dependency. Make sure you add **gem "jekyll"** to your Gemfile
and then run **bundle install**`,

  'roots not in package.json':

`It looks like this is a **Roots** project, but you don't have roots
as a dependency in your **package.json**.
Run **npm install roots --save** to make sure netlify installs roots
as a dependency before running your build.`,

  'error parsing package.json':

`You have a malformed package.json in your folder. This will most likely lead to a
broken build on netlify when attempting to install your npm dependencies.`
}
