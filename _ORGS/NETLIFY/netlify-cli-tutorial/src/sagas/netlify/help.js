import { addHistory } from '../../actions/base';

export function notFound() {
  return addHistory(
    '-bash: netlify: command not found',
    '',
    '__Make sure to run **npm install netlify-cli -g** first__'
  );
}

export function noConfig() {
  return addHistory(
    'no site configuration found',
    '',
    '__Netlify CLI creates a small .netlify file in your folder when you first do a deploy or configure a site.__',
    '__Some commands only works from a folder with a .netlify configuration file__',
    ''
  );
}

export const helpTexts = {
  usage: `
    Usage: netlify [options] [command]

      The premium hosting service for modern static websites

      Read more at [[https://www.netlify.com/docs/cli]]


    Commands:

      create [options]   Create a new site
      deploy [options]   Push a new deploy to netlify
      update [options]   Updates site attributes
      delete [options]   Delete site
      sites [options]    List your sites
      open [options]     Open site in the webui
      init               Configure continuous deployment

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -t --access-token <token>  Override the default Access Token
      -e --env <environment>     Specify an environment

`,
  create: `
  Usage: create [options]

  Create a new site

  Options:

    -h, --help                   output usage information
    -n --name <name>             Set <name>.netlify.com
    -d --custom-domain [domain]  Set the custom domain for the site
    -p --password [password]     Set the password for the site

`,
  deploy: `
  Usage: deploy [options]

  Push a new deploy to netlify

  Options:

    -h, --help         output usage information
    -s --site-id [id]  Deploy to site with <id>
    -p --path [path]   Path to a folder or zip file to deploy
    -d --draft         Deploy as a draft without publishing

`,
  update: `
  Usage: update [options]

  Updates site attributes

  Options:

    -h, --help                   output usage information
    -s --site-id [id]            The site to update
    -n --name [name]             Set <name>.netlify.com
    -d --custom-domain [domain]  Set the custom domain for the site
    -p --password [password]     Set the password for the site

`,
  init: `
  Usage: init [options]

  Configure continuous deployment

  Options:

    -h, --help  output usage information

`,
  delete: `
  Usage: delete [options]

  Delete site

  Options:

    -h, --help         output usage information
    -s --site-id [id]  The id of the site to delete
    -y --yes           Don't prompt for confirmation

`,
  sites: `
  Usage: sites [options]

  List your sites

  Options:

    -h, --help  output usage information
    -g --guest  List sites you have access to as a collaborator

`,
  open: `
  Usage: open [options]

  Open site in the webui

  Options:

    -h, --help         output usage information
    -s --site-id [id]  The id of the site to open

`,
};
