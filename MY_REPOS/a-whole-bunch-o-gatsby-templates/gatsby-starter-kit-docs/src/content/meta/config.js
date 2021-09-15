const base = {
  name: 'Gatsby Starter Kit',
  url: 'https://github.com/greglobinski/gatsby-starter-kit-docs',
  author: 'greg lobinski',
  nick: 'greglobinski',
};

const config = {
  /* meta tags */
  siteTitle: `${base.name} - a set of starters for GatsbyJS`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `This is Docs for gatsby-starter-kit, a series of starters for GatsbyJS.`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}`,
  headerSubTitle: 'a set of starters for Gatsby.js',

  /* url */
  siteUrl: base.url,
  // pathPrefix: '',
};

module.exports = config;
