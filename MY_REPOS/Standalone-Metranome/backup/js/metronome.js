/* globals Mousetrap */
/* exported Metronome */

var Metronome = {
	interval: null, // used to store the result of setInterval() while ticking

	beat: 0, // beat counter, reset to 1 on downbeats

	groups: [], // if the time signature is asymmetric, this will contain each group. otherwise it will contain only one element: beats per measure

	strongBeats: [], // strong beats discovered by parsing the time input will be appended to this

	taps: [], // will contain times when the tap button was clicked (shift()ed every tap after the second one)

	context: (function () { // audio context in which to create and use the tick tone generator
		var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
		if (contextClass) {
			return new contextClass();
		} else {
			console.warn('AudioContext not supported');
		}
	})(),

	tuner: false, // keeps track of the oscillator used for the tuning tone generator (false while tuner is off)

	debug: true, // enable console logging

	settings: {
		tempo: 120,
		time: 0,
		duration: 0.02,
		frequencies: {
			downbeat: 2500,
			strong: 2000,
			weak: 1500,
			tuner: 440
		}
	},

	inputs: {
		tempo: document.getElementById('tempo'),
		time: document.getElementById('time'),
		duration: document.getElementById('duration'),
		frequencies: {
			downbeat: document.getElementById('frequency-downbeat'),
			strong: document.getElementById('frequency-strong'),
			weak: document.getElementById('frequency-weak'),
			tuner: document.getElementById('frequency-tuner')
		}
	},

	tick: function () {
		var osc = Metronome.context.createOscillator();
		var finalBeat = Metronome.groups.reduce(function (a, b) {
			return a + b;
		});

		if (Metronome.settings.time !== '0' && Metronome.beat >= finalBeat) { // downbeat
			Metronome.beat = 1;
		} else {
			Metronome.beat += 1;
		}

		// determine & set beat type: downbeat, strong beat, or weak beat
		if ((Metronome.settings.time !== '0') && (Metronome.beat === 1)) {
			osc.frequency.value = Metronome.settings.frequencies.downbeat;
			document.getElementById('metronome').className = 'downbeat';
		} else if ((Metronome.settings.time !== '0') && (Metronome.strongBeats.indexOf(Metronome.beat) > -1)) {
			osc.frequency.value = Metronome.settings.frequencies.strong;
			document.getElementById('metronome').className = 'strong';
		} else {
			osc.frequency.value = Metronome.settings.frequencies.weak;
			document.getElementById('metronome').className = 'weak';
		}

		// visual tick
		document.getElementById('visual-target').innerHTML = Metronome.beat;

		// audio tick
		osc.connect(Metronome.context.destination);
		osc.start(Metronome.context.currentTime);
		osc.stop(Metronome.context.currentTime + Metronome.settings.duration);

		if (Metronome.debug) {
			console.log('tick');
		}
	},

	start: function () {
		// ios does not play html5 audio on a page unless first triggered by a user interaction event like this
		var osc = Metronome.context.createOscillator();
		osc.connect(Metronome.context.destination);
		osc.start(Metronome.context.currentTime);
		osc.stop(Metronome.context.currentTime);

		if (Metronome.interval !== null) {
			window.clearInterval(Metronome.interval);
		}
		Metronome.interval = window.setInterval(Metronome.tick, (60 / Metronome.settings.tempo) * 1000);
		document.getElementById('start').style.display = 'none';
		document.getElementById('stop').style.display = '';
	},

	stop: function () {
		window.clearInterval(Metronome.interval);
		Metronome.interval = null;
		Metronome.beat = 0;
		document.getElementById('visual-target').innerHTML = '&nbsp;';
		document.getElementById('start').style.display = '';
		document.getElementById('stop').style.display = 'none';
	},

	startTuner: function () {
		document.getElementById('start-tuner').style.display = 'none';
		document.getElementById('stop-tuner').style.display = '';
		Metronome.tuner = Metronome.context.createOscillator();
		Metronome.tuner.frequency.value = Metronome.settings.frequencies.tuner;
		Metronome.tuner.connect(Metronome.context.destination);
		Metronome.tuner.start();
		return false;
	},

	stopTuner: function () {
		document.getElementById('start-tuner').style.display = '';
		document.getElementById('stop-tuner').style.display = 'none';
		Metronome.tuner.stop();
		Metronome.tuner = false;
		return false;
	},

	handleTap: function () {
		Metronome.taps.push(Metronome.context.currentTime);

		if (Metronome.taps.length > 2) {
			Metronome.taps.shift();
		}

		if (Metronome.taps.length > 1) {
			Metronome.inputs.tempo.value = Math.floor(60 / (Metronome.taps[1] - Metronome.taps[0]));
		}

		Metronome.save();

		if (Metronome.debug) {
			console.log('taps: ', Metronome.taps);
		}
	},

	randomizeInputValue: function (input) {
		var getRandomInt = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		switch (input) {
			case Metronome.inputs.tempo:
				Metronome.inputs.tempo.value = getRandomInt(60, 600);
				break;
			case Metronome.inputs.time:
				Metronome.inputs.time.value = (function () {
					var groups = [];
					for (var i = 0; i < getRandomInt(0, 3); i += 1) {
						groups.push(getRandomInt(2, 4));
					}
					return groups.join('+');
				})();
				break;
		}

		Metronome.save();
	},

	parseTime: function () {
		Metronome.inputs.time.value = Metronome.inputs.time.value.replace(/[^1-9\+]/g, ''); // remove characters which are not numbers or '+'
		Metronome.inputs.time.value = Metronome.inputs.time.value.replace(/\++/g, '+'); // remove extraneous instances of '+'

		if (!(/^\+/).test(Metronome.inputs.time.value) && !(/\+$/).test(Metronome.inputs.time.value)) { // ignore input beginning or ending with '+'
			Metronome.settings.time = Metronome.inputs.time.value || '0';
			Metronome.groups = Metronome.settings.time.split('+');
			Metronome.strongBeats = [1];

			Metronome.groups.forEach(function (group, i) {
				Metronome.groups[i] = parseInt(group);

				// stop 1 shy of the end since final beat & downbeat are one and the same
				if (i < Metronome.groups.length - 1) {
					if (Metronome.strongBeats.length) {
						Metronome.strongBeats.push(Metronome.groups[i] + Metronome.strongBeats[Metronome.strongBeats.length - 1]);
					} else {
						Metronome.strongBeats.push(Metronome.groups[i]);
					}
				}
			});

			if (Metronome.debug) {
				console.log('time', Metronome.settings.time);
				console.log('groups', Metronome.groups);
				console.log('strong beats', Metronome.strongBeats);
			}
		}
	},

	parseTempo: function () {
		if (parseInt(Metronome.inputs.tempo.value) > 0) {
			Metronome.inputs.tempo.value = Metronome.settings.tempo = parseInt(Metronome.inputs.tempo.value);
			if (Metronome.interval) {
				Metronome.start();
			}
		} else {
			if (Metronome.debug) {
				console.warn('tempo must be positive');
			}
		}
		if (Metronome.debug) {
			console.log('tempo', Metronome.settings.tempo);
		}
	},

	parseFrequencies: function () {
		Metronome.settings.frequencies.downbeat = parseInt(Metronome.inputs.frequencies.downbeat.value);
		Metronome.settings.frequencies.strong = parseInt(Metronome.inputs.frequencies.strong.value);
		Metronome.settings.frequencies.weak = parseInt(Metronome.inputs.frequencies.weak.value);
		Metronome.settings.frequencies.tuner = parseInt(Metronome.inputs.frequencies.tuner.value);

		if (Metronome.tuner) {
			Metronome.stopTuner();
			Metronome.startTuner();
		}
	},

	addTempo: function(addend) {
		Metronome.inputs.tempo.value = parseInt(parseInt(Metronome.inputs.tempo.value) + addend);
		Metronome.save();
	},

	multiplyTempo: function(multiplier) {
		Metronome.inputs.tempo.value = parseInt(parseInt(Metronome.inputs.tempo.value) * multiplier);
		Metronome.save();
	},

	multiplyTime: function(multiplier) {
		if (document.getElementById('multiply_time').checked) {
			Metronome.inputs.time.value = (function () {
				Metronome.groups.forEach(function (group, i) {
					var result = parseInt(parseFloat(group) * multiplier);
					Metronome.groups[i] = ( result >= 1 ) ? result : Metronome.groups[i];
				});
				return Metronome.groups.join('+');
			})();
			Metronome.save();
		}
	},

	bindControls: function () {
		var eachRecursive = function (obj, callback) {
			for (var k in obj) {
				if(obj.hasOwnProperty(k)) {
					if (obj[k].constructor === Object) { // true for Object literals, not HTMLElements
						eachRecursive(obj[k], callback);
					} else {
						callback(obj[k]);
					}
				}
			}
		};

		eachRecursive(Metronome.inputs, function (input) {
			input.onkeyup = Metronome.save; // for typing directly into the input
			input.onchange = Metronome.save; // for type=number controls & mobile
		});

		Mousetrap.bindGlobal('.', function (e) {
			e.preventDefault();
			Metronome.handleTap();
		});
		Mousetrap.bindGlobal('t', function (e) {
			e.preventDefault();
			Metronome.inputs.tempo.focus();
		});
		Mousetrap.bindGlobal('b', function (e) {
			e.preventDefault();
			Metronome.inputs.time.focus();
		});
		Mousetrap.bindGlobal('space', function (e) { // start if stopped; stop if started
			e.preventDefault();
			if (Metronome.interval) {
				Metronome.stop();
			} else {
				Metronome.start();
			}
		});
		Mousetrap.bindGlobal('u', function (e) { // start if stopped; stop if started
			e.preventDefault();
			if (Metronome.tuner) {
				Metronome.stopTuner();
			} else {
				Metronome.startTuner();
			}
		});
		Mousetrap.bindGlobal('down', function () {
			if (document.activeElement.tagName !== 'INPUT') {
				Metronome.addTempo(-1);
				Metronome.save();
			}
		});
		Mousetrap.bindGlobal('up', function () {
			if (document.activeElement.tagName !== 'INPUT') {
				Metronome.addTempo(1);
				Metronome.save();
			}
		});
		Mousetrap.bindGlobal('left', function () {
			if (document.activeElement.tagName !== 'INPUT') {
				Metronome.addTempo(-10);
				Metronome.save();
			}
		});
		Mousetrap.bindGlobal('right', function () {
			if (document.activeElement.tagName !== 'INPUT') {
				Metronome.addTempo(10);
				Metronome.save();
			}
		});
		Mousetrap.bindGlobal('n', function () {
			Metronome.multiplyTempo(1/2);
			Metronome.multiplyTime(1/2);
		});
		Mousetrap.bindGlobal('m', function () {
			Metronome.multiplyTempo(2);
			Metronome.multiplyTime(2);
		});
		Mousetrap.bindGlobal('j', function () {
			Metronome.multiplyTempo(1/3);
			Metronome.multiplyTime(1/3);
		});
		Mousetrap.bindGlobal('k', function () {
			Metronome.multiplyTempo(3);
			Metronome.multiplyTime(3);
		});

		// start/stop
		document.getElementById('start').onclick = Metronome.start;
		document.getElementById('stop').onclick = Metronome.stop;

		// tempo manipulation
		document.getElementById('third').onclick = function () {
			Mousetrap.trigger('j');
		};
		document.getElementById('halve').onclick = function () {
			Mousetrap.trigger('n');
		};
		document.getElementById('minus10').onclick = function () {
			Mousetrap.trigger('left');
		};
		document.getElementById('plus10').onclick = function () {
			Mousetrap.trigger('right');
		};
		document.getElementById('minus1').onclick = function () {
			Mousetrap.trigger('down');
		};
		document.getElementById('plus1').onclick = function () {
			Mousetrap.trigger('up');
		};
		document.getElementById('double').onclick = function () {
			Mousetrap.trigger('m');
		};
		document.getElementById('triple').onclick = function () {
			Mousetrap.trigger('k');
		};

		// tap tempo
		document.getElementById('tap').onclick = Metronome.handleTap;

		// small window popout
		document.getElementById('popout').onclick = function () {
			Metronome.stop();
			window.open('index.html', '_blank', 'width=320,height=400,resizable=no,scrollbars=no,menubar=no,location=no,status=no,toolbar=no');
		};

		// randomize
		document.getElementById('randomize-tempo').onclick = function () {
			Metronome.randomizeInputValue(Metronome.inputs.tempo);
		};
		document.getElementById('randomize-time').onclick = function () {
			Metronome.randomizeInputValue(Metronome.inputs.time);
		};
		document.getElementById('randomize-both').onclick = function () {
			Metronome.randomizeInputValue(Metronome.inputs.tempo);
			Metronome.randomizeInputValue(Metronome.inputs.time);
		};

		// tuner start/stop
		document.getElementById('start-tuner').onclick = Metronome.startTuner;
		document.getElementById('stop-tuner').onclick = Metronome.stopTuner;

		// reset to defaults
		document.getElementById('reset').onclick = Metronome.reset;
	},

	save: function () {
		Metronome.parseTempo();
		Metronome.parseTime();
		Metronome.parseFrequencies();
		Metronome.settings.duration = parseFloat(Metronome.inputs.duration.value);

		localStorage.setItem('Metronome.settings', JSON.stringify(Metronome.settings));

		if (Metronome.debug) {
			console.log('saved', Metronome.settings);
		}
	},

	load: function () {
		var savedSettings = JSON.parse(localStorage.getItem('Metronome.settings'));

		if (savedSettings) {
			for (var i in savedSettings) {
				if(Metronome.settings.hasOwnProperty(i)) {
					Metronome.settings[i] = savedSettings[i];
				}
			}
		}

		Metronome.inputs.tempo.value = Metronome.settings.tempo;
		Metronome.inputs.time.value = Metronome.settings.time;

		Metronome.inputs.duration.value = Metronome.settings.duration;

		Metronome.inputs.frequencies.downbeat.value = Metronome.settings.frequencies.downbeat;
		Metronome.inputs.frequencies.strong.value = Metronome.settings.frequencies.strong;
		Metronome.inputs.frequencies.weak.value = Metronome.settings.frequencies.weak;
		Metronome.inputs.frequencies.tuner.value = Metronome.settings.frequencies.tuner;

		Metronome.parseTempo();
		Metronome.parseTime();
		Metronome.parseFrequencies();
		Metronome.settings.duration = parseFloat(Metronome.inputs.duration.value);

		if (Metronome.debug) {
			console.log('loaded', Metronome.settings);
		}
	},

	reset: function () {
		localStorage.removeItem('Metronome.settings');
		location.reload();
		return false;
	},

	init: function () {
		Metronome.bindControls();
		Metronome.load();
	}
};
