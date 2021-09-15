import test from 'ava'
import isPresent from 'is-present'

import coinr from './'

test('grabs ethereum data', async t => {
  const res = await coinr('ethereum')
  t.is(res.id, 'ethereum')
})

test('grabs all currencies', async t => {
  const res = await coinr()
  t.true(isPresent(res))
})
