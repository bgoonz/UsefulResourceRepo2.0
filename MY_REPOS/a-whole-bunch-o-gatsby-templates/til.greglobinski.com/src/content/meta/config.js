const base = {
  name: 'Today I Learned',
  url: 'https://til.greglobinski.com',
};

const config = {
  /* meta tags */
  siteTitle: `${base.name} by greg lobinski`,
  siteTitlePostfix: ` - ${base.name} by greg lobinski`,
  siteDescription: `${
    base.name
  } is a place when I note down things I learned on a daily basis worth to remember.`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}`,
  headerSubTitle: 'by greg lobinski',

  /* url */
  siteUrl: base.url,
  // pathPrefix: '',

  // author
  authorName: 'greg lobinski',
};

module.exports = config;
