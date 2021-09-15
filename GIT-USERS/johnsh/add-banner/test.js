'use strict';

const banner = require('./');
const assert = require('assert');

describe('banner', function() {
  let FILEPATH = 'test-target.js';

  context('without options (using defaults)', function() {
    let year =  new Date().getFullYear();
    let expectation = '/*!\n * add-banner <https://github.com/jonschlinkert/add-banner>\n *\n * Copyright (c) ' + year + ' Jon Schlinkert, contributors.\n * Licensed under the MIT license.\n */\n';
    it('expected to populate banner', function() {
      assert.equal(banner(FILEPATH), expectation);
    });
  });

  context('with specific options', function() {

    let options = {
      name: 'addbanner',
      author: 'J. Schlinkert (https://github.com/jonschlinkert)',
      homepage: 'https://github.com/jonschlinkert/addbanner',
      template: 'banner.tmpl',
      year: '2017',
      license: 'GPL-3'
    };

    let expectation = '/*!\n * addbanner <https://github.com/jonschlinkert/addbanner>\n *\n * Copyright (c) 2017 J. Schlinkert, contributors.\n * Licensed under the GPL-3 license.\n */\n';

    it('expected to populate banner', function() {
      assert.equal(banner(FILEPATH, options), expectation);
    });
  });
});
