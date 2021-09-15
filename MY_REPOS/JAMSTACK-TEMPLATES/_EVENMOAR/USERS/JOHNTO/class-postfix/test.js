import test from 'ava'
import classPostfix from './'

test('class-postfix postfixes classes', t => {
  t.plan(2)

  t.is(classPostfix('.foo #baz', '-bar'), '.foo-bar #baz')
  t.is(classPostfix('.foo:hover #baz', '-bar'), '.foo-bar:hover #baz')
})
