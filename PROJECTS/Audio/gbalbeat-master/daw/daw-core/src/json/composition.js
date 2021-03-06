"use strict";

DAWCore.json.composition = ( env, id ) => {
	const tracks = {},
		sPB = env.def_stepsPerBeat,
		bPM = env.def_beatsPerMeasure;

	for ( let i = 0; i < env.def_nbTracks; ++i ) {
		tracks[ i ] = DAWCore.json.track( { order: i } );
	}
	return {
		id,
		name: "",
		bpm: env.def_bpm,
		stepsPerBeat: sPB,
		beatsPerMeasure: bPM,
		duration: bPM,
		loopA: false,
		loopB: false,
		synthOpened: "0",
		patternKeysOpened: "0",
		patternDrumsOpened: "1",
		patternBufferOpened: null,
		buffers: {
			0: { type: "audio/wav", duration: .1529, url: "kick-808.wav" },
			1: { type: "audio/wav", duration: .256, url: "clap-808.wav" },
			2: { type: "audio/wav", duration: .0357, url: "hihat-808.wav" },
			3: { type: "audio/wav", duration: .1151, url: "snare-808.wav" },
			4: { type: "audio/wav", duration: .7, url: "openhat-808.wav" },
		},
		patterns: {
			0: { order: 0, type: "keys", name: "keys", keys: "0", synth: "0", duration: bPM, },
			1: { order: 0, type: "drums", name: "drums", drums: "0", duration: bPM, },
			2: { order: 0, type: "buffer", dest: "1", buffer: "0", duration: 1, name: "kick" },
			3: { order: 1, type: "buffer", dest: "1", buffer: "1", duration: 1, name: "clap" },
			4: { order: 2, type: "buffer", dest: "1", buffer: "2", duration: 1, name: "hat" },
			6: { order: 3, type: "buffer", dest: "1", buffer: "4", duration: 1, name: "open hat" },
			5: { order: 4, type: "buffer", dest: "1", buffer: "3", duration: 1, name: "snare" },
		},
		channels: DAWCore.json.channels(),
		tracks,
		blocks: {
			0: DAWCore.json.block( { pattern: "0", track: "0", duration: bPM } ),
			1: DAWCore.json.block( { pattern: "1", track: "1", duration: bPM } ),
		},
		synths: { 0: DAWCore.json.synth( { dest: "2" } ) },
		drumrows: {
			0: DAWCore.json.drumrow( { order: 0, pattern: "2" } ),
			1: DAWCore.json.drumrow( { order: 1, pattern: "3" } ),
			2: DAWCore.json.drumrow( { order: 2, pattern: "4" } ),
			4: DAWCore.json.drumrow( { order: 3, pattern: "6" } ),
			3: DAWCore.json.drumrow( { order: 4, pattern: "5" } ),
		},
		drums: { 0: {} },
		keys: { 0: {} },
	};
};
