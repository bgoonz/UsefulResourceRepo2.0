require('cheatcode')
var x = 2
specialX = function(t){
  if(t > 12 * x) x+=2
  t *= 72 / 60 / 2 / x
  t += t * (8 + x) % 16 + x % t
  var a = amod(.25, .125, t, 1/6)
  return 0
  + oz.sine(t, 120 + oz.triangle(t, amod(0, .1, t, 1/2) * oz.triangle(t, 1/2))) * a
  + oz.sine(t, 360 + (amod(0, .1, t, 1/3) * oz.triangle(t, 1/3))) * a
}