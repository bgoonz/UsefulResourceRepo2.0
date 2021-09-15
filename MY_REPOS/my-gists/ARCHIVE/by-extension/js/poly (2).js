var st = $ui({
  tempo: 72 / 60,
  tmod: 10,
  pi: 2,
  c: 1,
  fq: 18,
  swing: 1/18,
  speed: 1,
  beat: 16,
  amod: 9,
  sn: 4
})

var scales = ['dorian', 'phrygian', 'phrygian']
var scale = scales[Math.floor(st.c % scales.length)]
console.log(scale)
var v = [[0,0], [1/128, 1]]
var d = [[1/128, 1], [1/3, 0], [2/3, 1], [1, 0]]
var env = $.env([v, d], [1/8, 24/16])

var p = {}
p.m = st.pi
p.c = st.c
p.f = st.fq * st.tmod // st.tempo
p.wave = 'sine'
 
var bell = $.meffisto(p)
teoria = $.teoria, clang = $.meffisto, nvelope = $.env, oz = $.oz, amod = $.amod, generator = new $.chrono()
notes = teoria.note('db3').scale('dorian').notes()
bpm = 36
timer = $.jsync(bpm, sampleRate)

if(typeof t0 === 'undefined'){
//t0.emit('stop')
t0 = timer.on(1/st.beat, function(ti, b, off, swing){
  if(b % 2 === 0){
  	swing(st.swing * st.tempo / 60)
  }
  else if(b % 2 === 1){
    swing(st.swing * st.tempo / 60 * st.swing * Math.random() * st.swing)  	
  }
  else swing(0)
  if(b === 12 * 4) notes = teoria.note('db3').scale(scale).notes()
  if(b === 12 * 8) notes = teoria.note('db4').scale(scale).notes()
  if(b === 12 * 16) notes = teoria.note('db5').scale(scale).notes()
  var attack = [[0,0],[0,.667], [0,.67], [0,0], [0,.67], [1,.667]]
  var release = [[0,.667], [0,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [1/16, 60 / bpm / 2 / 4]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);

  opts.m = st.c // Math.sqrt(Math.PI) / Math.sqrt(2);
	var ch = [0, 2, 0, 4, 0, 6, 1, 3, 5, 0, 2, 4]
  opts.f = notes[ch[b % 12]].fq() / 1// 4//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);

  var synth = function(t){
    var x = (stringer.ring(t, amod(1/2, 3/9, t, 24*st.c), $.amod(Math.sqrt(st.pi), st.pi / 4, t, 8)))
    return x// oz.sine(t, x / opts.f)
  }
  generator.set(ti, synth, zmod)
})
}
delay = $.jdelay(Math.floor(sampleRate * st.tempo / 60 * 3 / 2 / 2 / 2 / 2), .667, 1)

delay2 = $.jdelay(Math.floor(sampleRate * st.tempo / 60 / 2), .887, 1/2)

var sn = snare()

var music = function(t,s,i){
  timer.tick(t)
  return generator.tick(t, s, i)
}
return function(t,s, i){
  //t *= st.speed
  var s = sn(t * st.sn * 2 % 1/$.amod(st.amod, st.amod * 4/5, t, 3/2*bpm/60) * bpm / 60) / 16
  bell.f = st.fq * st.tmod
  return s +  delay2(delay(music(t, s, i))) //+ oz.sine(t, 199)
  //+ bell.ring(t % 2, $.amod(0, Math.PI, t, 128*8), $.amod(st.c, 2, t, 12)) * env(t % 2)
}

function snare () {
  var low0 = lowpass(30);
  var low1 = lowpass(80);
  var low2 = lowpass(20);
  return function (t) {
    return low0(snare(180, t))*5
      + low1(snare(40, t+1/60))*10
      + low2(snare(80, t+1/30))*5
    ;
    function snare (n, o) {
      var scalar = Math.max(0, 0.95 - (o * n) / ((o * n) + 1));
      return sin(sin(sin(137)*139)*4217) * scalar;
    }
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
  };
  function lowpass (n) {
    var value = 0;
    return function (x) { return value += (x - value) / n }
  }
}