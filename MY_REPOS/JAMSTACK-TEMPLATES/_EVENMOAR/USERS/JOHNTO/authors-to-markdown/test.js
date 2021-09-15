import test from 'ava'
import authorsToMarkdown from './'

test('authors-to-markdown does something awesome', t => {
  t.plan(1)
  const tachyonsPkg = require('./node_modules/tachyons/package.json')

  t.same(
    authorsToMarkdown(tachyonsPkg),
`- mrmrs
- [adam morse](mailto:hi@mrmrs.cc)
- [robert forloine](http://sndsgn.com)
- [david potsiadlo](http://davidpots.com)
- [tyler benziger](http://tybenz.com)
- [john otander](http://johnotander.com)
`
  )
})
