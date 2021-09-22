var createGame = require('voxel-engine')

function sphereWorld(x, y, z) {
  // return the index of the material you want to show up
  // 0 is air
	if (x*x + y*y + z*z > 15*15) return 0
  return 3	
}

var game = createGame({
  generate: sphereWorld,
  startingPosition: [0, 1000, 0], // x, y, z
  materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt', 'obsidian', 'bedrock']
})

// rotate camera to look straight down
game.controls.pitchObject.rotation.x = -1.5

var container = document.body
game.appendTo(container)
// have the game take over your mouse pointer when you click on it
game.setupPointerLock(container)