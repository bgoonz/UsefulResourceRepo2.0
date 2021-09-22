// This is how Maybe(..) is usually implemented.
// But Maybe(..) here doesn't construct pure/valid monad instances,
// since its map() does a value-type check, which is a no-no.
function Maybe(v) {
  return { map, chain, ap };
  function map(fn) {
    if (v == null) return Nothing();
    return Just(fn(v));
  }
  function chain(fn) {
    return fn(v);
  }
  function ap(monad) {
    return monad.map(v);
  }
}

var identity = v => v;
var prop = k => o => o[k];

var myObj = { something: { other: { and: 42 } } };
Maybe( myObj )
.map( prop("something") )
.map( prop("other") )
.map( prop("and") )
.chain( identity );   // 42