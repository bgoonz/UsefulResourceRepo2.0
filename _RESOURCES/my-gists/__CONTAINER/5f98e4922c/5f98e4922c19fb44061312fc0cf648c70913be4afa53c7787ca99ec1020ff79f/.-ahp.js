const { executionAsyncId, createHook } = require('async_hooks')

const {writeSync} = require('fs')
const {format} = require('util')
const err = (...msg) => writeSync(2, format(...msg) + '\n')
const log = (...msg) => writeSync(1, format(...msg) + '\n')

const hook = createHook({
  init (eid, type) {
    // err('INIT', eid, type)
  },
  before () {
    //err('BEFORE', executionAsyncId())
  },
  after () {
    //err('AFTER', executionAsyncId())
  },
  destroy () {
    //err('DESTROY', executionAsyncId())
  },
  promiseResolve () {
    //err('PROMISE RESOLVE', executionAsyncId())
  },
})
//const hook = createHook({})
hook.enable()

let i = 0
log('TAP version 13')

const testPoint = (type, {message, expect, actual}) => {
  const ok = actual === expect ? 'ok' : 'not ok'
  log(`${ok} ${++i} - ${message}`)
  if (ok !== 'ok')
    log(`    ---
    found: ${actual}
    wanted: ${expect}
    type: ${type}
    ...`)
}

process.on('beforeExit', () => log(`1..${i}`))

process.on('unhandledRejection', ({message, expect}) => {
  const actual = executionAsyncId()
  testPoint('unhandledRejection', {message, expect, actual})
})

process.on('uncaughtException', ({message, expect}) => {
  const actual = executionAsyncId()
  testPoint('uncaughtException', {message, expect, actual})
})


new Promise((resolve, reject) => {
  reject({message: 'new Promise(reject)', expect: executionAsyncId()})
})

new Promise((resolve, reject) => {
  const expect = executionAsyncId()
  setTimeout(() => {
    reject({message: 'new Promise(setTimeout(reject))', expect})
  })
})

setTimeout(() => {
  new Promise((resolve, reject) => {
    const expect = executionAsyncId()
    setTimeout(() => {
      reject({message: 'setTimeout(new Promise(setTimeout(reject)))', expect})
    })
  })
})

new Promise((resolve, reject) => {
  throw({message: 'new Promise(throw)', expect: executionAsyncId()})
})

new Promise((resolve, reject) => {
  setTimeout(() => {
    throw({message: 'new Promise(setTimeout(throw))', expect: executionAsyncId()})
  })
})

setTimeout(() => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      throw({message: 'setTimeout(new Promise(setTimeout(throw)))', expect: executionAsyncId()})
    })
  })
})

Promise.resolve().then(() => new Promise((resolve, reject) => {
  reject({message:'Promise.resolve.then(new Promise(reject))', expect: executionAsyncId()})
}))

Promise.resolve().then(() => new Promise((resolve, reject) => {
  const expect = executionAsyncId()
  setTimeout(() => {
    reject({message:'Promise.resolve.then(new Promise(setTimeout(reject)))', expect})
  })
}))

setTimeout(() => {
  Promise.resolve().then(() => new Promise((resolve, reject) => {
    const expect = executionAsyncId()
    setTimeout(() => {
      reject({message: 'setTimeout(Promise.resolve.then(new Promise(setTimeout(reject))))', expect})
    })
  }))
})

Promise.resolve().then(() => new Promise((resolve, reject) => {
  throw({message: 'Promise.resolve.then(new Promise(throw))', expect: executionAsyncId()})
}))

Promise.resolve().then(() => new Promise((resolve, reject) => {
  setTimeout(() => {
    throw({message: 'Promise.resolve.then(new Promise(setTimeout(throw)))', expect: executionAsyncId()})
  })
}))

setTimeout(() => {
  Promise.resolve().then(() => new Promise((resolve, reject) => {
    setTimeout(() => {
      throw({message: 'setTimeout(Promise.resolve.then(new Promise(setTimeout(throw))))', expect: executionAsyncId()})
    })
  }))
})
