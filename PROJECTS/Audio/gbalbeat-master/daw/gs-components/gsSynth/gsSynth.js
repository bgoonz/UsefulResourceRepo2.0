"use strict";

class GSSynth {
	constructor() {
		const uiSynth = document.createElement( "gsui-synthesizer" ),
			dataSynth = new DAWCore.controllers.synth( {
				dataCallbacks: {
					addOsc: ( id, osc ) => uiSynth.addOscillator( id, osc ),
					removeOsc: id => uiSynth.removeOscillator( id ),
					changeEnvProp: ( k, v ) => GSUI.setAttribute( uiSynth.env, k, v ),
					changeLFOProp: ( k, v ) => GSUI.setAttribute( uiSynth.lfo, k, v ),
					changeOscProp: ( id, k, v ) => GSUI.setAttribute( uiSynth.getOscillator( id ), k, v ),
					updateEnvWave: () => uiSynth.env.updateWave(),
					updateLFOWave: () => uiSynth.lfo.updateWave(),
					updateOscWave: id => uiSynth.getOscillator( id ).updateWave(),
				},
			} );

		this.rootElement = uiSynth;
		this._dataSynth = dataSynth;
		this._dawcore =
		this._synthId = null;
		Object.seal( this );

		uiSynth.addEventListener( "gsuiEvents", e => {
			const d = e.detail,
				a = d.args,
				id = this._synthId,
				dc = this._dawcore;

			// console.log(e);

			switch ( d.component ) {
				case "gsuiEnvelope":
					switch ( d.eventName ) {
						case "toggle": dc.callAction( "toggleEnv", id ); break;
						case "change": dc.callAction( "changeEnv", id, ...a ); break;
						// case "liveChange": dc.liveChangeSynth( id, { env: { [ a[ 0 ] ]: a[ 1 ] } } ); break;
					}
					break;
				case "gsuiLFO":
					switch ( d.eventName ) {
						case "toggle": dc.callAction( "toggleLFO", id ); break;
						case "change": dc.callAction( "changeLFO", id, ...a ); break;
						case "liveChange": dc.liveChangeSynth( id, { lfo: { [ a[ 0 ] ]: a[ 1 ] } } ); break;
					}
					break;
				case "gsuiSynthesizer":
					switch ( d.eventName ) {
						case "addOscillator": dc.callAction( "addOscillator", id ); break;
						case "reorderOscillator": dc.callAction( "reorderOscillator", id, a[ 0 ] ); break;
					}
					break;
				case "gsuiOscillator": {
					const oscId = e.target.dataset.id;

					switch ( d.eventName ) {
						case "remove": dc.callAction( "removeOscillator", id, oscId ); break;
						case "change": dc.callAction( "changeOscillator", id, oscId, ...a ); break;
						case "liveChange": dc.liveChangeSynth( id, { oscillators: { [ oscId ]: { [ a[ 0 ] ]: a[ 1 ] } } } ); break;
					}
				} break;
			}
			e.stopPropagation();
		} );
	}

	// .........................................................................
	setDAWCore( core ) {
		this._dawcore = core;
	}
	setWaveList( arr ) {
		this.rootElement.setWaveList( arr );
	}
	selectSynth( id ) {
		if ( id !== this._synthId ) {
			this._synthId = id;
			this._dataSynth.clear();
			if ( id ) {
				this._dataSynth.change( this._dawcore.get.synth( id ) );
			}
		}
	}
	change( obj ) {
		const synObj = obj.synths && obj.synths[ this._synthId ],
			get = this._dawcore.get;

		if ( "beatsPerMeasure" in obj || "stepsPerBeat" in obj ) {
			GSUI.setAttribute( this.rootElement.env, "timedivision", `${ get.beatsPerMeasure() }/${ get.stepsPerBeat() }` );
			GSUI.setAttribute( this.rootElement.lfo, "timedivision", `${ get.beatsPerMeasure() }/${ get.stepsPerBeat() }` );
		}
		if ( synObj ) {
			this._dataSynth.change( synObj );
			if ( synObj.oscillators ) {
				this.rootElement.reorderOscillators( synObj.oscillators );
			}
		}
		if ( "synthOpened" in obj ) {
			this.selectSynth( obj.synthOpened );
		}
	}
	clear() {
		this._dataSynth.clear();
	}
}

Object.freeze( GSSynth );

window.GSSynth = GSSynth;