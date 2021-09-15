import test from 'ava'
import compdoc from './'

const html = `
  <h1 class="purple bg-gray">
    Hello, world!
  </h1>
`

const css = `
  .purple { color: purple; }
  .green { color: green; }
  .bg-gray { background-color: gray; }
  .other-classes { /* ... */ }
`

const description = `
  This is an example component. This description text
  is written as markdown, and converted to html! _Neat_.
`

test('selects relevant css', async t => {
  t.plan(2)

  const results = await compdoc('foo', { html, css, description })

  t.regex(results.css, /purple/)
  t.notRegex(results.css, /green/)
})

test('adds cssstats', async t => {
  t.plan(1)

  const results = await compdoc('foo', { html, css, description })

  t.is(results.stats.selectors.total, 2)
})

test('adds color combos', async t => {
  t.plan(1)

  const results = await compdoc('foo', { html, css, description })

  t.is(results.colorCombos.length, 1)
})

test('returns the html', async t => {
  t.plan(1)

  const results = await compdoc('foo', { html, css, description })

  t.is(results.html, html)
})
