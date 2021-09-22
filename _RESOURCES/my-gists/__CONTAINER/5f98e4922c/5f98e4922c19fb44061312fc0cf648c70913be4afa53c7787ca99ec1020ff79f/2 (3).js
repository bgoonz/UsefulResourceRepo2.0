// is Nothing() a monad? Well, it's a monad constructor.
// Its instances are certainly monads.
function Nothing() {
  return { map: Nothing, chain: Nothing, ap: Nothing };
}