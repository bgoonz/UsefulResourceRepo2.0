var st = $ui({
  bpm: 86
})
var bpm = st.bpm
timer = $.zerone(bpm, sampleRate)
//generator = new $.chrono()
//console.log(timer, st)
//t0.emit('stop')
t0 = timer.beat(3/4, [,1,1,1,1,1,1,[,,,1],], function(ti, b, off, swing){

  var amp = [[0,.67],[0,1], [1 ,2/4]]
  var dec = [[0, 2/4], [1,1], [1,0]]
  var dur = [1/64*2, 17/64*3/2]
  var d = dur.reduce(function(a, e){ return a + e}, 0)

  var env = $.env([amp, dec], dur)
  var o = {}
  o.c = Math.sqrt(2)
  o.m = Math.PI * 2
  o.i = 11
  o.f = b % 2 === 0 ? 55 : 111 // / 4: 444 / 8
  o.wave = 'triangle'
  var buzz = $.meffisto(o)
  var synth = function(t, s, i){
//    var tt = t
//    t *= 86 / 60
    buzz.i = wmod_(9, 2, t, -3/4)
//    buzz.m = amod_(Math.PI, 1/8, t, -3/4)
    return (buzz.ring(t, $.amod(0, Math.PI / 8, t, buzz.f/2), Math.sqrt(2))) //* env(t % d)

    function tri (x) { return tri_(x,t) }
    function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  
    function amod_(c, r, t, f){ return c + r * ((Math.log((1.0001 + sin(f, t)) * 50) / Math.log(10))/2-2) }
    function wmod_(c, r, t, f){ return c + Math.floor(r * ((Math.log((1.0001 + sin(f, t)) * 50) / Math.log(10))/2-2)) }
    function amod(c, r, f){ return c + r * ((Math.log((1.0001 + sin(f)) * 50) / Math.log(10))/2-2) }
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
    function sin_ (x, t) { return Math.sin(2 * Math.PI * t * x) }
  }
  generator.set(ti, synth, {curves: [amp, dec], durations: dur})
})

var music = function(t, s, i){
  timer.tick(t)
  return generator.tick(t, s, i)
}

return function(t, s, i){
  return music(t, s, i)
}
