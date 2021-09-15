import test from 'ava'
import cssVariable from './'

test('css-variable', t => {
  t.plan(45)

  var variables = ['var(--foo-bar)', '--foo-bar', 'foo-bar', '$foo-bar', '@foo-bar']

  variables.forEach((variable) => {
    var cssVar = cssVariable(variable)
    t.same(cssVar.base(), 'foo-bar')
    t.same(cssVar.sass(), '$foo-bar')
    t.same(cssVar.scss(), '$foo-bar')
    t.same(cssVar.less(), '@foo-bar')
    t.same(cssVar.stylus(), 'foo-bar')
    t.same(cssVar.css(), '--foo-bar')
    t.same(cssVar.cssDecl(), '--foo-bar')
    t.same(cssVar.cssFunc(), 'var(--foo-bar)')
    t.same(cssVar.cssVal(), 'var(--foo-bar)')
  })
})

test('is-custom-property', t => {
  t.plan(3)

  t.ok(cssVariable('awesome-var').isCustomProperty('--foo'))
  t.ok(cssVariable('awesome-var').isCustomProperty('var(--foo)'))
  t.ok(!cssVariable('awesome-var').isCustomProperty('blah--blah'))
})

test('strip-custom-property-syntax', t => {
  t.plan(3)

  t.same(cssVariable('awesome-var').stripCustomPropertySyntax('--foo'), 'foo')
  t.same(cssVariable('awesome-var').stripCustomPropertySyntax('var(--foo)'), 'foo')
  t.same(cssVariable('awesome-var').stripCustomPropertySyntax('blah--blah'), 'blah--blah')
})

test('is-sass-variable', t => {
  t.plan(2)

  t.ok(cssVariable('awesome-var').isSassVariable('$foo'))
  t.ok(!cssVariable('awesome-var').isSassVariable('blah'))
})

test('strip-sass-syntax', t => {
  t.plan(2)

  t.same(cssVariable('awesome-var').stripSassSyntax('$foo'), 'foo')
  t.same(cssVariable('awesome-var').stripSassSyntax('blah'), 'blah')
})

test('is-less-variable', t => {
  t.plan(2)

  t.ok(cssVariable('awesome-var').isLessVariable('@foo'))
  t.ok(!cssVariable('awesome-var').isLessVariable('blah'))
})

test('strip-less-syntax', t => {
  t.plan(2)

  t.same(cssVariable('awesome-var').stripLessSyntax('@foo'), 'foo')
  t.same(cssVariable('awesome-var').stripLessSyntax('blah'), 'blah')
})
