setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
require('cheatcode')
synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
//t1.emit('stop')
//t2.emit('stop')
//gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function boop(_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    fleek = fq
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/8, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},0)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},48180)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/4, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},56618)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/8, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},58454)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},66632)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'triangle'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},138609)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},210966)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},227533)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.0051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},231205)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.051 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},234510)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, y))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},247972)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 4))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},253342)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 12))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},258815)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 24))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},268406)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'saw_i'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},275898)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},291220)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},296099)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},304399)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1/4, [,1,,1,], function(_t, b){  
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},337282)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  bpm = 74 / 4
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},344015)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},347529)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4 / 2
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},353260)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4 / 2 / 2
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},407759)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4 / 2
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},420443)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4 / 2 / 4
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},429844)
setTimeout(function(){// this is my 666th session using this live code thing I made
// I have previously run sessions as long as three days
// the most live code updates performed during one session is 455
// for this special occassion I am going to cheat
//require('cheatcode')
//synth.connect(master.destination)
// that is not the only cheat
// really, that isn't a cheat at all
// cuz i wrote all the cheatcode
// what i am about to do is cheat
bpm = 74 / 2
//timer=sync(bpm, master.sampleRate)
basefq = 54 * 2
t1.emit('stop')
t2.emit('stop')
gong.emit('stop')
t1 = timer.beat(1/2, [1,,1,], function(_t, b){  
  var bpm = 74
  var attack = [[0,1], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 128 * 4, bpm / 60 * 1/16 * 2]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 1200//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'square'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
      stringer.m = opts.m + (.251 * (Math.abs(oz.sine(t, y/2))))//amod(opts.m, .05, t, 1/16)
			//stringer.f = opts.f + (1 + oz.sine(t, 128))
      var x = (stringer.ring(t, amod(0, 12, t, 12), amod(Math.sqrt(12), 1.25, t, 1/4)))
    	return x 
    }
  }
  generator.set(_t, synth(1/21), zmod)
  generator.set(_t + bpm / 60 / 2, synth(1/70), zmod)
  generator.set(_t + bpm / 60 / 4, synth(1/64), zmod)
  generator.set(_t + bpm / 60 / 8, synth(1/33), zmod)
})


gongbeat = beatmath(8, [1,2,3,4,5])

gong = timer.beat(1/2, [[,1,,,,,],[,1,,,,,],[,1,,,,,],[,1,,,,,],[,,,,,1,]], function (_t, b, xxx, swing){
  
  var beat = b % 8
  var m = b % 128
  if(gongbeat(b)){
    var opts = {}
    opts.c = 1;
    opts.m = Math.PI / 3;
    opts.f = 54//
    opts.wave = 'square'
    var stringer = clang(opts)
    var fux = jdelay(480, .51, .2)
    var attack = [[0,0],[0,1], [1,1]]
    var release = [[1,1],[.24,1],[.25,0], [1,0]]
    var curves = [attack, release]
    var durs = [.020, .3670]
    var mods = {curves: curves, durations: durs}
    var lope = nvelope(curves, durs)
    var kx = Math.abs(Math.floor(amod(6, 1, _t, 1/3)))
    var fq = b % 8 % 5 === 0 ? (basefq * Math.sqrt(2)/2) * (kx / 5) : basefq
    
    var synth = function(t,s,i){
      var wave = ''
      return (oz.sine(t,fq) * lope(t - _t)
)
      return (stringer.ring(t, amod(0, Math.PI / 6, t, 16), Math.sqrt(2)/1.667))
    }
    var gen = generator.set(_t, synth, mods)
  }
})


t2 = timer.beat(1, [,1,,1,], function(_t, b){  
  var bpm = 74 / 4 / 2 / 2
  var attack = [[0,0], [0,1], [0,0], [0,1], [1,.667]]
  var release = [[0,.667], [-3,0], [1, 0]]
  var y = b % 2 == 1 ? 2 : 1/2
  var durations = [60 / bpm / 56, bpm / 60 * 1/8]//, bpm / 60 * y ]
  var opts = {}
  opts.c = Math.sqrt(2);
  opts.m = 2+b%4/Math.PI// Math.sqrt(Math.PI) / Math.sqrt(2);
  opts.f = 442/16/2//notes[b % 6].fq()//   (bf)// * Math.pow(2, 3/12)) 
  opts.wave = 'sine'
  var stringer = clang(opts)
  var zmod = {}
  zmod.curves = [attack, release];
  zmod.durations = durations;
  var mod = nvelope(zmod.curves, zmod.durations);
  var synth = function(y){
    return function(t){
			t += 1000
      stringer.m = opts.m + (.5 + ( .05 * oz.saw(t, y)))//amod(opts.m, .05, t, 1/16)
			stringer.f = opts.f + (.5 + oz.sine(t, y/4))
      var x = (stringer.ring(t, ( 2.15 + oz.saw(t, 4)), amod(Math.sqrt(12), 1.15, t, 4)))
    	return x 
    }
  }
  generator.set(_t, synth(0), zmod)
  generator.set(_t + .13, synth(3/2/2), zmod)
  generator.set(_t + .26, synth(3/2/2/2), zmod)
  generator.set(_t + .39, synth(3/2/2/2/2), zmod)
})
},432708)
