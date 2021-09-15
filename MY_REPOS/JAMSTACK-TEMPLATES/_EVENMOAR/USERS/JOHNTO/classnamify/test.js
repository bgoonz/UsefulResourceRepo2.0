const test = require('ava')
const toClassName = require('./')

const FIXTURE = '<div class="measure ph2 pv4">Hello, world!</div>'
const EXPECTED = '<div className="measure ph2 pv4">Hello, world!</div>'

test('class-to-class-name converts class attributes to className', t => {
  const result = toClassName(FIXTURE)

  t.is(result, EXPECTED)
})
