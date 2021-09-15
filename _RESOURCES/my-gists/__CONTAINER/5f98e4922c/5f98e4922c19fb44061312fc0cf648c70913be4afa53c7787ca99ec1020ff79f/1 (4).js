// is Just(..) a monad? Well, it's a monad constructor.
// Its instances are certainly monads.
function Just(v) {
  return { map, chain, ap };
  function map(fn) {
    return Just(fn(v));
  }
  function chain(fn) {
    return fn(v);
  }
  function ap(monad) {
    monad.map(v);
  }
}