/*
  Heruistics for typical errors when doing a manual deploy.

  Like deploying the source for a Jekyll site, instead of the
  build output.
*/

/*
  List of files that we need to check for these heuristics.

  Map of file and action. The action can be:
    'check' - check if this file is present
    'read'  - read the content of this file
*/
export const files = {
  '_config.yml': 'check',
  'node_modules': 'check',
  'Gruntfile.js': 'check',
  'gulpfile.js': 'check',
  'package.json': 'check'
};

/*
  Takes an object of files that were found in the deploy folder and return a
  warning if any.

  Depending on the action for the files the value for a file should either be
  true if the action is a check, or the content of the file if the action was
  read.
*/
export function warning(files = {}) {
  for (var file in files) {
    let warning = existenseTests[file];
    if (warning) {
      return warning;
    }
  }
}

const existenseTests = {
  '_config.yml':

`It looks like this folder is a Jekyll site, but you're deploying the root
directory directly.
Unless this is what you intend to do, you might want to run **jekyll build** and
deploy the generated **_site** folder.`,

  'node_modules':

`It looks like there's a node_modules folder in the directory you're deploying.
Try to avoid deploying all your node dependencies since most of these will be
server-side libraries, and instead use a build tool to copy just the relevant
files into a folder that only has front-end libraries.`,

  'Gruntfile.js':

`It looks like this is a Grunt based project, but you're deploying the root
directory directly.
Unless this is what you intend to do, you might want to run **grunt build** and
deploy the **dist** folder.`,

  'gulpfile.js':

`It looks like this is a Gulp based project, but you're deploying the root
directory directly.
Unless this is what you intend to do, you might want to run **gulp build** and
deploy the **dist** folder.`,

  'package.json':

`This folder has a **package.json** file. Typically that means you want to
install dependencies via **npm install* and run a build tool, and then deploy
the resulting folder with static assets.`
};
