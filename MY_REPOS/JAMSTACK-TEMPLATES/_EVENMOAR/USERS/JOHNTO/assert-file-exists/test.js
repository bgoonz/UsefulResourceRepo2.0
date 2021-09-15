import test from 'ava'
import assertFileExists from './'

test('when the file exists', t => {
  t.notThrows(() => assertFileExists('readme.md', 'readme.md must exist'))
})

test('when the file does not exist', t => {
  t.throws(() => assertFileExists('foo'))
})

test('when the file exists and is relative', t => {
  t.notThrows(() => assertFileExists('../assert-file-exists/test.js'))
})

test('when skipError is set it does not error', t => {
  t.notThrows(() => assertFileExists('foo', { skipError: true }))
})

test('when skipError is set it returns true when the file exists', t => {
  t.true(assertFileExists('test.js', { skipError: true }))
})

test('when skipError is set it returns false when the file does not exist', t => {
  t.false(assertFileExists('foo', { skipError: true }))
})
