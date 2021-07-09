console.clear();
// import framework
import Vis from '/modules/Vis.js';

// setup
const visEl = document.querySelector('#visual');
const binSize = 128;
const elAmount = Math.floor(binSize/3); // Returned frequncies is a third

// make elements
for (let i=0; i<elAmount; i++) {
	// create an element
	const el = document.createElement('i');
	// append it
	visEl.appendChild(el);
}
// get those elements
const allEls = visEl.querySelectorAll('i');

// create a new vis
// params: binSize = size of frequency array returned
// soundcloudID: if you want to use a track from soundcloud pass in an id (as a string) here, otherwise mic is used:
// new Vis(binSize, '433074246');
const vis = new Vis(binSize);

// setup our draw loop: THIS IS WHERE THE MAGIC HAPPENS!!
vis.draw( () => {

	// console.log(vis.frequencies);
	vis.frequencies.forEach((f, i) => {
		allEls[i].style.width = (f+10)+'px';
		allEls[i].style.backgroundColor = `hsla(${i*5}, 50%, 50%, 1)`;
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
