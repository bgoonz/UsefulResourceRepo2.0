const base = {
  name: 'BaseStarter',
  url: 'https://gatsby-starter-base.greglobinski.com',
  author: 'greg lobinski',
  nick: 'greglobinski',
};

const config = {
  // meta tags
  siteTitle: `${base.name} - a no-style GatsbyJS starter`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `This is a long description about ${base.name} for SEO`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  // url
  siteUrl: base.url,
  pathPrefix: '',

  // site header
  headerTitle: 'BaseStarter',
  headerSubTitle: 'no-style GatsbyJS starter',

  // manifest.json
  manifestName: 'BaseStarter - a GatsbyJS starter',
  manifestShortName: 'BaseStarter',
  manifestStartUrl: '/index.html',
  manifestBackgroundColor: 'white',
  manifestThemeColor: '#666',
  manifestDisplay: 'standalone',

  // author
  authorName: base.author,
  authorTwitterAccount: base.nick,
  authorSocialLinks: [
    { name: 'github', url: `https://github.com/${base.nick}` },
    { name: 'twitter', url: `https://twitter.com/${base.nick}` },
    { name: 'facebook', url: `http://facebook.com/${base.nick}` },
  ],

  // copyright
  copyrightNote: `Created by ${base.author}, licensed under MIT`,
};

module.exports = config;
