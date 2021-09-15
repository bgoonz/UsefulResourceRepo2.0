import test from 'ava'
import classRepeat from './'

test('class-repeat repeats classes', t => {
  t.plan(6)

  t.deepEqual(classRepeat('.foo.bar'), '.foo.foo.bar.bar')
  t.deepEqual(classRepeat('.foo:hover'), '.foo.foo:hover')
  t.deepEqual(classRepeat('.foo::before'), '.foo.foo::before')
  t.deepEqual(classRepeat('.foo .bar.baz'), '.foo.foo .bar.bar.baz.baz')
  t.deepEqual(classRepeat('input.foo-bar.baz > .pizazz'), 'input.foo-bar.foo-bar.baz.baz > .pizazz.pizazz')
  t.deepEqual(classRepeat('.foo', { repeat: 4 }), '.foo.foo.foo.foo')
})
