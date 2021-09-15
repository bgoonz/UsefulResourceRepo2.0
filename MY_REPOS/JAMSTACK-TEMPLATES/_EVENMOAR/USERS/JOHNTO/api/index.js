var data = {
  name: 'John Otander',
  title: 'Software Engineer',
  company: 'Clearbit',
  email: 'johnotander@gmail.com',
  gravatar_email: 'johnotander@gmail.com',
  twitter: '4lpine',
  github: 'johnotander',
  keybase: 'johno',
  url: 'http://johnotander.com',
  logoAsHtmlEntity: '&apE;',
  company_url: 'https://a10networks.com',
  avatar: 'https://gravatar.com/avatar/2e52ef263083c77e2a0a24454dc6f369.png',
  about: "I'm a web developer and designer living in Boise, Idaho.\nI don't like to limit myself to developing with particular tools or technologies, but I'm most experienced with JavaScript, Ruby, and CSS. I'm pretty devoted to making the web a better place: This means considering all users on all devices. This means showing empathy. This means lightweight, responsive websites that are mobile first.\nI love leveraging build tools and automating every process I can. I enjoy experimenting with new technology and incorporating it into my workflow when appropriate. I <3 open source and find great value in metrics, especially in terms of website performance.\nI also like skiing and soccer. A lot."
}

data.education = [{
    university: 'Boise State University',
    degree: 'Bachelor of Science in Computer Science',
    completed: 'May 2015',
    city: 'Boise',
    state: 'Idaho'
  }, {
    university: 'Montana State University',
    degree: 'Bachelor of Arts in Hispanic Studies',
    completed: 'May 2010',
    city: 'Bozeman',
    state: 'Montana'
}]

data.projects = {
  featured: [{
    name: 'Random A11y',
    description: 'Vote on random, accessible color combinations',
    url: 'http://randoma11y.com',
    github_url: 'https://github.com/johnotander/random-a11y'
  }, {
    name: 'Tachyons',
    description: 'Functional CSS for humans.',
    url: 'http://tachyons.io',
    github_url: 'https://github.com/tachyons-css',
  }, {
    name: 'CSS Stats',
    description: 'Webapp and node utilities to visualize various stats about your css.',
    url: 'http://cssstats.com',
    github_url: 'https://github.com/cssstats',
  }, {
    name: 'Pixyll',
    description: 'A simple, beautiful Jekyll theme that is mobile first.',
    url: 'http://pixyll.com',
    github_url: 'https://github.com/johnotander/pixyll',
  }, {
    name: 'Immutable CSS',
    description: 'A linter for immutable CSS.',
    url: 'https://github.com/johnotander/immutable-css',
    github_url: 'https://github.com/johnotander/immutable-css',
  }, {
    name: 'Furtive',
    description: 'A forward-thinking, lightweight, CSS microframework.',
    url: 'http://furtive.co',
    github_url: 'https://github.com/johnotander/furtive',
  }, {
    name: 'Scrutinize',
    description: 'Scrutinize a url by analyzing CSS, HTML, accessibility, images, pagespeed, etc.',
    url: 'https://github.com/johnotander/scrutinize',
    github_url: 'https://github.com/johnotander/scrutinize',
  }, {
    name: 'Ember Gravatar',
    description: 'An Ember component for gravatar image tags.',
    url: 'http://ember-cli-gravatar.divshot.io',
    github_url: 'https://github.com/johnotander/ember-cli-gravatar',
  }, {
    name: 'Grayscale',
    description: 'A grayscale color palette for prototyping the web.',
    url: 'http://www.g-r-a-y-s-c-a-l-e.com/',
    github_url: 'https://github.com/johnotander/gray',
  }, {
    name: 'Urls for Humans',
    description: 'Apply persistent, meaningful urls to your Rails app.',
    url: 'https://github.com/johnotander/urls_for_humans',
    github_url: 'https://github.com/johnotander/urls_for_humans',
  }, {
    name: 'Deleted',
    description: 'A safer delete experience.',
    url: 'http://johnotander.com/deleted/',
    github_url: 'https://github.com/johnotander/deleted',
  }, {
    name: 'Markdown CSS',
    description: 'A collection of CSS modules to make Markdown, or raw HTML, look beautiful.',
    url: 'http://markdowncss.github.io/',
    github_url: 'https://github.com/markdowncss',
  }]
}

module.writing = [{
  title: 'Notes from Emberconf 2015',
  subheading: 'A collection of notes I took at Emberconf 2015.',
  url: 'http://johnotander.com/emberconf2015-notes/'
}, {
  title: 'Convention Over Configuration',
  subheading: 'A thought piece on why I think convention over configuration is a good thing.',
  url: 'http://johnotander.com/ember/2015/02/03/convention-over-configuration/'
}, {
  title: 'Creating an Ember.js Addon with the Ember CLI',
  subheading: 'Thanks to the power of the Ember CLI, reusing code and functionality between apps has never been easier.',
  url: 'http://johnotander.com/ember/2014/12/14/creating-an-emberjs-addon-with-the-ember-cli/'
}, {
  title: 'Build Tasks with Gulp.js',
  subheading: 'Gulp.js is a streaming build system. Their API is lean, simple, and a delight to use. In this post I have outlined how Gulp works and how I use it in my everyday workflow.',
  url: 'http://johnotander.com/front-end-development/2014/08/08/build-tasks-with-gulpjs/'
}, {
  title: 'An Explanation of the Difference Between Mixins and Extends in Sass',
  subheading: 'The failure to use Sass mixins and extends correctly can result in bloated, inefficient CSS. So, I decided to dive into the differences, and illustrate the correct use cases for each.',
  url: 'http://johnotander.com/design/2014/07/25/an-explanation-of-the-difference-between-mixins-and-extends-in-sass/'
}]

module.exports = data
