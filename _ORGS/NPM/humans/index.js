var gravatar = require('gravatar')
var humans = module.exports = require('./humans.json')

Object.keys(humans).forEach(function(name){
  var human = humans[name]
  human.avatar = gravatar.url(human.email, {size: '512', default: 'retro'}, true)
})
