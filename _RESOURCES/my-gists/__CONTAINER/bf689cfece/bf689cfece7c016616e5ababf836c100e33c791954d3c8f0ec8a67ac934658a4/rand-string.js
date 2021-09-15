
const mask = (1<<6) - 1
const crypto = require('crypto')
function randString(l) {
  // let randomFills = 0
  // let moves = 0

  const b = Buffer.alloc(l * 2)
  const bl = b.length
  let ok = 0
  while (ok < l) {
    // randomFills++
    crypto.randomFillSync(b, ok)
    let done = false
    let v
    while ((v = b[ok], v >= 0x32 && v < 0x7f) && (ok < l || (done = true))) {
      ok++
    }
    if (done) break
  
    let bad = true
    let pivot
    for (let i = ok + 1; i < bl && (ok < l || (done = true)); i++) {
      v = b[i]
      let isGood = v >= 0x32 && v < 0x7f
      if (bad) {
        if (isGood) {
          pivot = i
          bad = false
        }
      } else {
        if (!isGood) {
          bad = true
          // moves++
          b.copyWithin(ok, pivot, i)
          ok += i - pivot
        }
      }
    }
    if (done) break
    if (!bad && pivot > l) {
      // moves++
      b.copyWithin(ok, pivot)
      ok += bl - pivot
    }
  }
  // console.log('randomFills', randomFills)
  // console.log('moves', moves)
  return b.toString('ascii', 0, l)
}
