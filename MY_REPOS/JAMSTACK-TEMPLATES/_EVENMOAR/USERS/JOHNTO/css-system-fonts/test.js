import test from 'ava'
import cssSystemFonts from './'

const systemFonts = ['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar']

test('contains fonts', t => {
  t.plan(1)

  t.same(cssSystemFonts(), systemFonts)
})
