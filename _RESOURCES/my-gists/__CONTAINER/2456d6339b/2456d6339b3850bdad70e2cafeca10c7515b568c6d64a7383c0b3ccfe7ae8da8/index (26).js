master = new webkitAudioContext
jsynth = require('jsynth')
nvelope = require('jmod')
sync = require('jsynth-sync')
oz = require('oscillators')
jdelay = require('jdelay')
sine = oz.sine
saw = oz.saw
sr = master.sampleRate
bf = 444

delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .367)
delay2 = jdelay(Math.floor(sr * (60 / 72)  * 2, .99, .867))

attack = [[0,-.5], [0,6], [1,2]]
release = [[1,2], [1,0], [1, 0]]
durations = [.05, .2]

zamod = {}
zamod.curves = [attack, release];
zamod.durations = durations;

generators = [];
generators0 = [];
generators1 = [];
generators2 = [];

timer = sync(72 / 3, 44100)

t = timer.on(1/16, function(ti, b){
  var zod = zamod
  zod.durations[0] = .02
  zod.durations[1] = .07
var mod = nvelope(zod);
  var synth = function(t){
    return (oz.sine(t, (888 * 2) * (16 - b%12)) + oz.sine(t, .667 * (Math.pow(888 * 2, 5/12)) * (16 - b%12))) * mod.envelope(t - ti)
  }
  if(b%12){
    generators.push(synth)
	  if(b>2) generators.shift()
  }
})

t0 = timer.on(2, function(ti, b){
var mod = nvelope(zamod);
  var synth = function(t){
    return sine(t, 888) * mod.envelope(t - ti)
  }
  generators0.push(synth)
  if(b>2) generators0.shift()
})

t1 = timer.on(2, function(ti, b){
  var zod = zamod
  zod.durations[0] = .2 
  zod.durations[1] = (60 / 72 / 3) - .2
  var mod = nvelope(zod);
 //   b = (b * 1.667)

  var synth = function(t){
    return (oz.square(t, 222) * mod.envelope(t - ti))
  }
  generators1.push(synth)
  if(b>2) generators1.shift()
})


t2 = timer.on(1/4, function(ti, b){
  var mod = nvelope(zamod); 
  var fqs = [444, 444 * 3 / 2, 444, 444 / 3 * 2, 444, 444 * 2 / 3, 444 * 3 / 2, 444 * 2, 444 * 2, 444 * 4]
  var f = fqs[(b%fqs.length)]
  if(!(b%16)%3) f*=2
  var synth = function(t){
    return (saw(t, f) * mod.envelope(t - ti))
  }
  generators2.push(synth)
  if(b>2) generators2.shift()
})

synth = function(t){
  timer.tick.call(timer, t)
  var s = 0
  s +=  generators.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators0.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators1.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators2.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)  
  return delay(s)
}

dsp = jsynth(master, synth)
dsp.connect(master.destination)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 8, .767, .367)
},116408)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 32, .767, .367)
},126041)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 3, .767, .367)
},129910)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .367)
},151438)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 3, .767, .367)
},164597)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .367)
},172243)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .367)
},181128)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .367)
},196162)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .367)
},211233)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2 / 2, .767, .367)
},221393)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2 / 2, .767, .667)
},236627)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .667)
},251123)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2 / 2, .767, .667)
},261533)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .667)
},716381)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .167)
},730901)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .167)
},736639)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .167)
},831451)
setTimeout(function(){synth = function(t){
  timer.tick.call(timer, t)
  var s = 0
  t += Math.floor(sr * 60 / 72 / 3) / 4
  s +=  generators.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators0.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators1.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators2.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)  
  return delay(s)
}},847395)
setTimeout(function(){synth = function(t){
  timer.tick.call(timer, t)
  var s = 0
  t += Math.floor(sr * 60 / 72 / 3) / 2
  s +=  generators.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators0.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators1.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators2.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)  
  return delay(s)
}},850080)
setTimeout(function(){synth = function(t){
  timer.tick.call(timer, t)
  var s = 0
  t += Math.floor(sr * 60 / 72 / 3) / 8
  s +=  generators.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators0.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators1.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)
  s +=  generators2.reduce(function(p,e,i,d){
    return p + e(t)
  }, 0)  
  return delay(s)
}},869729)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .567)
},875988)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},881536)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},886894)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},896578)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},901185)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},906414)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .567)
},911835)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},916556)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .567)
},921245)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},926017)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .567)
},1026036)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .767)
},1041826)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .967)
},1055356)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .767)
},1059150)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .567)
},1070844)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .567)
},1090867)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .767, .567)
},1111697)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .967)
},1119729)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .567)
},1141039)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .567)
},1155965)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .967)
},1201360)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 2, .867, .967)
},1210935)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 2, .867, .567)
},1213676)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 2, .867, .567)
},1216519)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 2, .867, .567)
},1321098)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .867, .567)
},1328152)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .867, .267)
},1341292)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .867, .267)
},1349335)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .867, .467)
},1360526)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .667, .567)
},2621140)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72, .667, .967)
},2634785)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 2, .667, .967)
},2639258)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 8, .667, .967)
},2646422)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 8, .367, .967)
},2649106)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 8, .167, .967)
},2652110)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .167, .967)
},2666662)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .167, 1.467)
},2682974)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .167, 1.167)
},2691692)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .267, 1.167)
},2766731)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 3) + sr * 60 / 72 / 16, .267, 1.167)
},2792353)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 3) + sr * 60 / 72 / 3 / 16, .267, 1.167)
},2802327)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 6) + sr * 60 / 72 / 16, .267, 1.167)
},2807215)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 16, .267, 1.167)
},2813039)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72)) + sr * 60 / 72 / 16, .267, 1.167)
},2818053)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .267, 1.167)
},2921185)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .667, 1.167 / 2)
},3001275)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .767, .45)
},3041507)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .867, .75)
},3110844)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .167, .95)
},3126141)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .967, .95)
},3138640)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .767, .95)
},3200983)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2 / 2, .167, .25)
},3236736)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95)
},3281288)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) * 10
},3287365)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) 
},3293607)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) * 10
},3295817)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95)
},3304753)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) * 10
},3306839)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) 
},3312273)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) * 10
},3315078)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95)
},3319272)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95) * 2
},3321520)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .002, .95)
},3346662)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 10, .002, .95)
},3359163)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 8, .002, .95)
},3366457)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 8, .902, .95)
},3380512)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 4, .902, .75)
},3392159)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 6, .902, .75)
},3403652)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 * 2, .902, .75)
},3427486)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 64, .302, .75)
},3462208)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 128, .302, .75)
},3477472)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 128, .602, .75)
},3497001)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72)) + sr * 60 / 72 / 16 / 128, .602, .75)
},3515565)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) * 2) + sr * 60 / 72 / 16 / 128, .602, .75)
},3568885)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72)) + sr * 60 / 72 / 16 / 128, .602, .75)
},3587226)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72)) + sr * 60 / 72 / 16, .602, .75)
},3596601)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72)) + sr * 60 / 72 / 16 / 2, .602, .75)
},3607600)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 16, .602, .75)
},3665859)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 16 * 2, .602, .75)
},3672040)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 16 * 3, .602, .75)
},3678522)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 3, .602, .75)
},3681722)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 3/ 16, .602, .75)
},3690513)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 3/ 2, .602, .75)
},3694389)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 4) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3698096)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3699274)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 3) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3705564)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 6) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3711570)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3772156)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3777034)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 * 3 / 2) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3781169)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3802329)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3835949)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3867373)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3/ 2 / 2, .602, .75)
},3904745)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .602, .55)
},3954902)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2 / 2, .602, .55)
},3980012)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .702, .65)
},3980519)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .702, .65)
},3980544)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .702, .65)
},3980573)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16 / 2, .702, .65)
},3998546)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999047)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999078)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999108)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999139)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999169)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999203)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999245)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999263)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999292)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999330)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999353)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999384)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},3999425)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .702, .95)
},4042806)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3 / 2 / 2, .502, .55)
},4066072)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3 / 2 / 2, .502, .95)
},4086134)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3 / 3) + sr * 60 / 72 / 3 / 2 / 2, .502, .95)
},4097219)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .502, .95)
},4132282)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
},4182556)
setTimeout(function(){delay = function(s){return s}//jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
},9027243)
setTimeout(function(){delay = function(s){return 0}//jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
},64982111)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
},65088399)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .902, .75)
},65149133)
setTimeout(function(){delay = function(){return 0}// jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .902, .75)
},103717234)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .902, .75)
},103724679)
setTimeout(function(){delay = function(s){return 0}//jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
},106932706)
setTimeout(function(){delay = jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .902, .75)
},175027323)
setTimeout(function(){dsp.connect(master.destination)},175041554)
