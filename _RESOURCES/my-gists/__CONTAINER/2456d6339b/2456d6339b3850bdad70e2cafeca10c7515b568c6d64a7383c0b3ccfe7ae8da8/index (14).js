var baboon = require("baboon-image")
var lena = require('lena')
var savePixels = require("save-pixels")
var cwise = require('cwise')
var ops = require('ndarray-ops')

var shift = cwise({
  args: ['array', 'array', {offset: [-100, 0], array: 0}],
  body: function(a, b, c){
    a = c
  }
})

var shifted = shift(baboon, lena)
var pix = savePixels(baboon, 'canvas')
document.body.appendChild(pix)


