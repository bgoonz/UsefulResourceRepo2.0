// This is a more "pure" / accurate implementation of Maybe:
// But, is Maybe here a monad? It's not even a constructor of a monad,
// it's a namespace that holds methods that can make different kinds
// of monads.
var Maybe = { Just, Nothing, of: Just };

var identity = v => v;
// we moved the empty check from Maybe into prop()
var isEmpty = v => v == null;
var prop = k => o => isEmpty(o[k]) ? Nothing() : Maybe.of(o[k]);

var myObj = { something: { other: { and: 42 } } };
Maybe.of( myObj )
.chain( prop("something") )
.chain( prop("other") )
.chain( prop("and") )
.chain( identity );   // 42