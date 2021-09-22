var url = require('..')
var test = require('tap').test

test('oss-license-name-to-url', function (t) {
  t.equal(url('apache 2'), 'http://opensource.org/licenses/Apache-2.0')
  t.equal(url('apache-2'), 'http://opensource.org/licenses/Apache-2.0')
  t.equal(url('bsd'), 'http://opensource.org/licenses/BSD-2-Clause')
  t.equal(url('x11'), 'http://opensource.org/licenses/MIT')
  t.equal(url('X11'), 'http://opensource.org/licenses/MIT')
  t.equal(url('cc0-1.0'), 'http://creativecommons.org/publicdomain/zero/1.0/')
  t.equal(url('CC0'), 'http://creativecommons.org/publicdomain/zero/1.0/')
  t.equal(url('WTFPLv2'), 'http://www.wtfpl.net/about/')
  t.equal(url('LGPLv3'), 'http://opensource.org/licenses/LGPL-3.0')
  t.equal(url('not-a-real-license'), null)
  t.end()
})
