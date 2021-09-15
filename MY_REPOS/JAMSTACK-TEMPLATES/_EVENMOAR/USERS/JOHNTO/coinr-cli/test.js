import test from 'ava'
import cp from 'child_process'

test.cb('handles list of currencies', t => {
  t.plan(2)

  cp.execFile('./index.js', (err, stdout, stderr) => {
    t.true(stdout.includes('Changes:'))
    t.true(stdout.includes('-----'))
    t.end()
  })
})

test.cb('handles a specific currency', t => {
  t.plan(1)

  cp.execFile('./index.js', ['ethereum'], (err, stdout, stderr) => {
    t.true(stdout.includes('ETH'))
    t.end()
  })
})
