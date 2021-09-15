var Force = { Skywalker, RegularFolk, of: Skywalker };

function Skywalker(v) {
  return { map, chain, ap };
  function map(fn) {
    return Skywalker(fn(v));
  }
  function chain(fn) {
    return fn(v);
  }
  function ap(monad) {
    monad.map(v);
  }
}

function RegularFolk() {
  return { map: RegularFolk, chain: RegularFolk, ap: RegularFolk };
}