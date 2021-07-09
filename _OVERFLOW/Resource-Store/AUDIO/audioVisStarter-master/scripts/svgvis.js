console.clear();
// import framework
import Vis from '/modules/Vis.js';

// setup
const visEl = document.querySelector('#visual');
const binSize = 128;
const elAmount = Math.floor(binSize/3); // Returned frequncies is a third

// get those elements
const allPaths = visEl.querySelectorAll('path');

// create a new vis -> pass in bin size and if you're using soundcloud you can pass in a track id here
const vis = new Vis(binSize);

// setup our draw loop: THIS IS WHERE THE MAGIC HAPPENS!!
vis.draw( () => {

	// instead of looping over our frequencies - let's loop over our paths, but _use_ our frequency vals
	allPaths.forEach((p, i) => {
		p.style.opacity = 1-(vis.frequencies[i]/255);
	})
	
} )


// ===================== CONTROLS edit here if you want to start/stop multiple vis
const controls = document.querySelector('#controls');

controls.querySelector('[data-control="play"]').addEventListener('click', function(e) {

	if (this.dataset.on === 'false') {
		this.dataset.on = "true";
    vis.start();
	} else {
    this.dataset.on = "false";
    vis.stop();
	}
   
})

// if toggle
// change audioData source
controls.querySelector('[data-control="input"]').addEventListener('click', function(e) {

	if (this.dataset.toggle === 'mic') {
		this.dataset.toggle = "music";
	} else {
    this.dataset.toggle = "mic";
	}
   
})