var st = $ui({
  tempo: 72 / 60,
  tmod: 10,
  pi: Math.PI / 2,
  c: 1,
  fq: 289 / 10
})

var v = [[0, .67], [0,.25], [1,0]]
var env = $.env([v], [1])

var p = {}
p.m = st.pi
p.c = st.c
p.f = st.fq * st.tmod
p.wave = 'sine'
 
var bell = $.meffisto(p)

console.log(bell)

return function(t){
  t *= st.tempo
  return bell.ring(t % 1, $.amod(0, 1/3, t, st.fq / 10), st.c) * env(t % 1)
}
