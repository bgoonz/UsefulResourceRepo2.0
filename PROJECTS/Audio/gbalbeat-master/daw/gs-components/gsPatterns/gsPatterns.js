"use strict";

class GSPatterns {
	constructor() {
		const uiPatterns = GSUI.createElement( "gsui-patterns" ),
			svgForms = Object.freeze( {
				keys: new gsuiKeysforms(),
				drums: new gsuiDrumsforms(),
				buffer: new gsuiWaveforms(),
				bufferHD: new gsuiWaveforms(),
			} );

		uiPatterns.onpatternDataTransfer = elPat => {
			const id = elPat.dataset.id;

			return `${ id }:${ this._dawcore.get.pattern( id ).duration }`;
		};
		uiPatterns.onchange = ( act, ...args ) => {
			if ( act in DAWCore.actions ) {
				this._dawcore.callAction( act, ...args );
			} else {
				// lg( "GSPatterns.onchange", act, ...args );
				console.log(`GSPatterns.onchange`)
				console.log(act);
				console.log(args);
			}
		};
		this.data = Object.freeze( {
			synths: {},
			patterns: {},
			channels: {},
		} );
		this.rootElement = uiPatterns;
		this.svgForms = svgForms;
		this._buffers = {};
		this._dawcore = null;
		this._uiPatterns = uiPatterns;
		this._synthsCrud = DAWCore.utils.createUpdateDelete.bind( null, this.data.synths,
			this._createSynth.bind( this ),
			this._updateSynth.bind( this ),
			this._deleteSynth.bind( this ) );
		this._patternsCrud = DAWCore.utils.createUpdateDelete.bind( null, this.data.patterns,
			this._createPattern.bind( this ),
			this._updatePattern.bind( this ),
			this._deletePattern.bind( this ) );
		this._channelsCrud = DAWCore.utils.createUpdateDelete.bind( null, this.data.channels,
			this._createChannel.bind( this ),
			this._updateChannel.bind( this ),
			this._deleteChannel.bind( this ) );
		Object.seal( this );

		svgForms.bufferHD.hdMode( true );
		svgForms.bufferHD.setDefaultViewbox( 260, 48 );
	}

	// .........................................................................
	setDAWCore( core ) {
		this._dawcore = core;
	}
	clear() {
		Object.keys( this.data.patterns ).forEach( this._deletePattern, this );
		Object.keys( this.data.synths ).forEach( this._deleteSynth, this );
		Object.keys( this._buffers ).forEach( id => delete this._buffers[ id ] );
		this.svgForms.keys.empty();
		this.svgForms.drums.empty();
		this.svgForms.buffer.empty();
		this.svgForms.bufferHD.empty();
	}
	bufferLoaded( buffers ) {
		const pats = Object.entries( this._dawcore.get.patterns() ),
			bufToPat = pats.reduce( ( map, [ id, pat ] ) => {
				map[ pat.buffer ] = id;
				return map;
			}, {} );

		Object.entries( buffers ).forEach( ( [ idBuf, buf ] ) => {
			this._buffers[ idBuf ] = buf;
			this.svgForms.buffer.update( bufToPat[ idBuf ], buf.buffer );
			this.svgForms.bufferHD.update( bufToPat[ idBuf ], buf.buffer );
		} );
	}
	change( obj ) {
		this._synthsCrud( obj.synths );
		this._patternsCrud( obj.patterns );
		this._channelsCrud( obj.channels );
		if ( obj.keys || obj.drums || obj.drumrows || obj.patterns ) {
			Object.entries( this._dawcore.get.patterns() ).forEach( ( [ id, pat ] ) => {
				if (
					( pat.type === "drums" && ( obj.drumrows || obj.drums?.[ pat.drums ] || obj.patterns?.[ id ]?.duration ) ) ||
					( pat.type === "keys" && ( obj.keys?.[ pat.keys ] || obj.patterns?.[ id ]?.duration ) )
				) {
					this._updatePatternContent( id );
				}
			} );
		}
		if ( obj.patterns ) {
			this._uiPatterns.reorderPatterns( obj.patterns );
		}
		if ( "synthOpened" in obj ) {
			this._uiPatterns.selectSynth( obj.synthOpened );
		}
		if ( "patternDrumsOpened" in obj ) {
			this._uiPatterns.selectPattern( "drums", obj.patternDrumsOpened );
		}
		if ( "patternKeysOpened" in obj ) {
			this._uiPatterns.selectPattern( "keys", obj.patternKeysOpened );
		}
	}

	// .........................................................................
	_updatePatternContent( id ) {
		const get = this._dawcore.get,
			pat = get.pattern( id ),
			elPat = this._uiPatterns._getPattern( id );

		if ( elPat ) {
			const type = pat.type;

			if ( type === "keys" ) {
				this.svgForms.keys.update( id, get.keys( pat.keys ), pat.duration );
			} else if ( type === "drums" ) {
				this.svgForms.drums.update( id, get.drums( pat.drums ), get.drumrows(), pat.duration, get.stepsPerBeat() );
			} else if ( type === "buffer" ) {
				const buf = this._buffers[ pat.buffer ];

				if ( buf ) {
					this.svgForms.buffer.update( id, buf.buffer );
					this.svgForms.bufferHD.update( id, buf.buffer );
				}
			}
			if ( type !== "buffer" ) {
				this.svgForms[ type ].setSVGViewbox( elPat.querySelector( "svg" ), 0, pat.duration );
			}
		}
	}

	// .........................................................................
	_createSynth( id, obj ) {
		this.data.synths[ id ] = DAWCore.utils.jsonCopy( obj );
		this._uiPatterns.addSynth( id );
		this._updateSynth( id, obj );
	}
	_updateSynth( id, obj ) {
		console.log(`id: ${id}`)
		console.log(obj);
		const dat = this.data.synths[ id ];

		Object.entries( obj ).forEach( ( [ prop, val ] ) => {
			dat[ prop ] = val;
			this._uiPatterns.changeSynth( id, prop, val );
		} );
		if ( "dest" in obj ) {
			this._uiPatterns.changeSynth( id, "destName", this._dawcore.get.channel( obj.dest ).name );
		}
	}
	_deleteSynth( id ) {
		delete this.data.synths[ id ];
		this._uiPatterns.deleteSynth( id );
	}

	// .........................................................................
	_createPattern( id, obj ) {
		const isBuf = obj.type === "buffer",
			SVG = this.svgForms[ isBuf ? "bufferHD" : obj.type ];

		this.data.patterns[ id ] = DAWCore.utils.jsonCopy( obj );
		SVG.add( id );
		if ( isBuf ) {
			const buf = this._buffers[ obj.buffer ];

			this.svgForms.buffer.add( id );
			if ( buf ) {
				this.svgForms.buffer.update( id, buf.buffer );
				SVG.update( id, buf.buffer );
			}
		}
		this._uiPatterns.addPattern( id, obj );
		this._updatePattern( id, obj );
		this._uiPatterns.appendPatternSVG( id, SVG.createSVG( id ) );
	}
	_updatePattern( id, obj ) {
		const dat = this.data.patterns[ id ];

		Object.entries( obj ).forEach( ( [ prop, val ] ) => {
			dat[ prop ] = val;
			this._uiPatterns.changePattern( id, prop, val );
		} );
		if ( "dest" in obj ) {
			this._uiPatterns.changePattern( id, "destName", this._dawcore.get.channel( obj.dest ).name );
		}
	}
	_deletePattern( id ) {
		const pat = this.data.patterns[ id ];

		delete this.data.patterns[ id ];
		this.svgForms[ pat.type ].delete( id );
		if ( pat.type === "buffer" ) {
			this.svgForms.bufferHD.delete( id );
		}
		this._uiPatterns.deletePattern( id );
	}

	// .........................................................................
	_createChannel( id, obj ) {
		this.data.channels[ id ] = obj.name;
		this._uiPatterns.addChannel( id, obj.name );
	}
	_updateChannel( id, obj ) {
		if ( "name" in obj ) {
			this._uiPatterns.updateChannel( id, obj.name );
		}
	}
	_deleteChannel( id ) {
		delete this.data.channels[ id ];
		this._uiPatterns.deleteChannel( id );
	}
}

Object.freeze( GSPatterns );

window.GSPatterns = GSPatterns;