"use strict";

class gswaKeysScheduler {
	constructor() {
		this.scheduler = new gswaScheduler();
		this._synth = null;
		this._startedKeys = new Map();
		Object.seal( this );

		this.scheduler.delayStopCallback = 4;
		this.scheduler.ondatastart = this._onstartKey.bind( this );
		this.scheduler.ondatastop = this._onstopKey.bind( this );
	}

	setContext( ctx ) {
		this.scheduler.currentTime = () => ctx.currentTime;
		this.scheduler.enableStreaming( !( ctx instanceof OfflineAudioContext ) );
	}
	setSynth( synth ) {
		this._synth = synth;
	}
	change( obj ) {
		this.scheduler.change( obj );
	}
	start( when, off, dur ) {
		this.scheduler.start( when, off, dur );
	}
	stop() {
		this.scheduler.stop();
	}

	_onstartKey( startedId, blcs, when, off, dur ) {
		this._startedKeys.set( startedId,
			this._synth.startKey( blcs, when, off, dur ) );
	}
	_onstopKey( startedId ) {
		this._synth.stopKey( this._startedKeys.get( startedId ) );
		this._startedKeys.delete( startedId );
	}
}

window.gswaKeysScheduler = gswaKeysScheduler;