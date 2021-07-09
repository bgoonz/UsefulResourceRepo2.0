"use strict";

function UIloading() {
	return new Promise(resolve => {
		const el = document.querySelector("#loading"),
			elTitle = document.querySelector("#gsTitle"),
			glitch = new TextGlitch(elTitle);

		el.classList.add("loaded");
		if (window.CSS && CSS.supports("clip-path: inset(0 1px 2px 3px)")) {
			glitch.on();
		}
		el.onclick = () => {
			glitch.off();
			el.classList.add("starting");
			setTimeout(resolve, 100);
		};
	});
}

function UIloaded() {
	const el = document.querySelector("#loading");

	el.classList.add("started");
	// setTimeout(() => el.remove(), 800);
	el.remove();



	document.getElementById("site_link").value = window.location;

	document.getElementById("copy_link").onclick = (function () {
		var copyText = document.getElementById("site_link");

		/* Select the text field */
		copyText.select();
		copyText.setSelectionRange(0, 99999); /* For mobile devices */

		/* Copy the text inside the text field */
		document.execCommand("copy");

		/* Alert the copied text */
		document.getElementById("copy_link").innerHTML = "copied!"
		setTimeout(function () {
			document.getElementById("copy_link").innerHTML = "copy link"
		}, 3000)
	})

	channel.join()
		.receive("ok", resp => { console.log("Joined successfully", resp) })
		.receive("error", resp => { console.log("Unable to join", resp) })

	WebMidi.enable(function (err) {

		if (err) {
			console.log("WebMidi could not be enabled.", err);
		} else {
			console.log("WebMidi enabled!");
			var input = WebMidi.inputs;

			var list = [];
			for (let index = 0; index < input.length; index++) {
				const o = input[index];
				list = list + "<option value='" + o.id + "'>" + o.manufacturer + " " + o.name + "</option>"
			}

			document.getElementById("midi_input").innerHTML = list;
		}

		document.getElementById("midi_input").onchange = function (e) {
			const id = e.currentTarget.value;
			window.midi_input = WebMidi.getInputById(id);


			window.midi_input.addListener('noteon', "all",
				function (e) {
					console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
				}
			);

			// Listen to pitch bend message on channel 3
			window.midi_input.addListener('pitchbend', 3,
				function (e) {
					console.log("Received 'pitchbend' message.", e);
				}
			);

			// Listen to control change message on all channels
			window.midi_input.addListener('controlchange', "all",
				function (e) {
					console.log("Received 'controlchange' message.", e);
				}
			);

			// Listen to NRPN message on all channels
			window.midi_input.addListener('nrpn', "all",
				function (e) {
					if (e.controller.type === 'entry') {
						console.log("Received 'nrpn' 'entry' message.", e);
					}
					if (e.controller.type === 'decrement') {
						console.log("Received 'nrpn' 'decrement' message.", e);
					}
					if (e.controller.type === 'increment') {
						console.log("Received 'nrpn' 'increment' message.", e);
					}
					console.log("message value: " + e.controller.value + ".", e);
				}
			);



		}

	}, true);


	

}


window.UIloading = UIloading;
window.UIloaded = UIloaded;