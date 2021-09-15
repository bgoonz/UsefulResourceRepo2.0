require('cheatcode')
specialX = function(t){
  t *= 72 / 60 / 2 / 2
  t = t * 10 % 12 % t
  var a = amod(.25, .125, t, 1/6)
  return 0
  + oz.sine(t, 120 + oz.triangle(t, amod(0, .1, t, 1/2) * oz.triangle(t, 2))) * a
  + oz.sine(t, 360 + (amod(0, .1, t, 1/3) * oz.triangle(t, 3))) * a
}