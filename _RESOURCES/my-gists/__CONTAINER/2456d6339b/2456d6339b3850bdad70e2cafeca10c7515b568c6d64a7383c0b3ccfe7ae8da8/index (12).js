require('cheatcode')
var x = 2
ttt = false
specialX = function(t){
  if(t > 12 * x) x+=2   
  if(!ttt) ttt = t
//  t -= ttt || 0
  t *= 72 / 60 / 2 
  t = t * (5) % 12 % t
  var a = amod(.35, .15, t, 3)
  return 0
  + oz.sine(t, 120 + oz.triangle(t, amod(.5, .21, t, 1/4) * oz.triangle(t, 2))) * a
  + oz.sine(t, 360 + (amod(.5, .21, t, 1/6) * oz.triangle(t, 3))) * a
} 