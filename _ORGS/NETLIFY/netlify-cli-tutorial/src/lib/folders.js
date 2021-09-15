export const staticSite = {
  v1: {'index.html': '<h1>Hello, World!</h1>'}
};

export const jekyllSite = {
  v1: {
    '_config.yml': '---\n\ntitle: Hello, Jekyll World!\n',
    '_layouts': {
      'default.html': '<!DOCTYPE html>\n<html>\n<body>\n  <h1>{{ site.title }}</h1>\n\n  {{ content }}\n</body>\n</html>'
    },
    'index.html': '---\nlayout: default\n---\n\n<p>This is a jekyll-site</p>'
  },
  _site: {
    'index.html': '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello, Jekyll World!</h1>\n\n  <p>This is a jekyll-site</p>\n</body>\n</html>'
  }
};


export const README =  `
# Netlify\'s CLI Tutorial

This is an interactive demonstration of some of the netlify CLI features.

You'll see help messages in __a different color__ and you can click on any
__**highlighted block**__ to copy those words to the prompt.

If you go through the whole tutorial, you'll learn how to:

* Do a manual deploy of a site folder
* Manage environments
* Password protect your staging site
* Set up continuous deployment
* Name your site
* Configure a custom domain

## Run into a bug?

Great! Help us squash it! Open an issue or fork this tutorial and send us a
pull request:

https://github.com/netlify/netlify-cli-tutorial

`;

export const root = {
  'static-site': staticSite.v1,
  'jekyll-site': jekyllSite.v1,
  'README': README
};
