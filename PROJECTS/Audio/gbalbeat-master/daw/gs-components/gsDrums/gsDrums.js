"use strict";

class GSDrums {
	constructor() {
		const uiDrums = document.createElement( "gsui-drums" ),
			uiDrumrows = uiDrums.drumrows,
			dataDrums = new DAWCore.controllers.drums( {
				dataCallbacks: {
					addDrum: ( id, drum ) => uiDrums.addDrum( id, drum ),
					addDrumcut: ( id, drumcut ) => uiDrums.addDrumcut( id, drumcut ),
					changeDrum: ( id, prop, val ) => uiDrums.changeDrum( id, prop, val ),
					removeDrum: id => uiDrums.removeDrum( id ),
					removeDrumcut: id => uiDrums.removeDrumcut( id ),
				},
			} ),
			dataDrumrows = new DAWCore.controllers.drumrows( {
				dataCallbacks: {
					addDrumrow: id => {
						uiDrumrows.add( id, uiDrums.createDrumrow( id ) );
						this._setPropFilter( id, "gain" );
					},
					removeDrumrow: id => uiDrumrows.remove( id ),
					changeDrumrow: ( id, prop, val ) => {
						switch ( prop ) {
							default:
								uiDrumrows.change( id, prop, val );
								break;
							case "pattern":
								uiDrumrows.change( id, prop, this._svgManager.createSVG( val ) );
							break;
							case "duration": {
								const patId = this._dawcore.get.drumrow( id ).pattern,
									bufId = this._dawcore.get.pattern( patId ).buffer;

								uiDrumrows.change( id, prop, this._dawcore.get.buffer( bufId ).duration );
							} break;
						}
					},
				},
			} );

		this.rootElement = uiDrums;
		this.timeline = uiDrums.timeline;
		this._uiDrumrows = uiDrumrows;
		this._dataDrums = dataDrums;
		this._dataDrumrows = dataDrumrows;
		this._dawcore =
		this._drumsId =
		this._patternId =
		this._svgManager = null;
		Object.seal( this );

		GSUI.listenEvents( this.rootElement, {
			gsuiDrumrows: {
				change: d => { this._dawcore.callAction( ...d.args ); },
				propFilter: d => { this._setPropFilter( ...d.args ); },
				propFilters: d => { this._setAllPropFilters( ...d.args ); },
				liveStopDrum: d => { this._dawcore.drums.stopLiveDrum( ...d.args ); },
				liveStartDrum: d => { this._dawcore.drums.startLiveDrum( ...d.args ); },
				liveChangeDrumrow: d => { this._dawcore.drums.changeLiveDrumrow( ...d.args ); },
			},
			gsuiDrums: {
				change: d => {
					const [ act, ...args ] = d.args;

					this._dawcore.callAction( act, this._patternId, ...args );
				},
			},
			gsuiTimeline: {
				changeCurrentTime: d => {
					this._dawcore.drums.setCurrentTime( d.args[ 0 ] );
				},
				changeLoop: d => {
					const [ a, b ] = d.args;

					a !== false
						? this._dawcore.drums.setLoop( a, b )
						: this._dawcore.drums.clearLoop();
				},
			},
			gsuiSliderGroup: {
				change: d => {
					this._dawcore.callAction( "changeDrumsProps", this._patternId, ...d.args );
				},
				input: d => {
					this._uiDrumrows.setDrumPropValue( d.args[ 0 ], d.args[ 2 ], d.args[ 3 ] );
				},
				inputEnd: d => {
					this._uiDrumrows.removeDrumPropValue( ...d.args );
				},
			},
		} );
		this.rootElement.toggleShadow( true );
	}

	// .........................................................................
	setDAWCore( core ) {
		this._dawcore = core;
	}
	selectPattern( id ) {
		if ( id !== this._patternId ) {
			this._patternId = id;
			this._drumsId = null;
			this._dataDrums.clear();
			this.rootElement.toggleShadow( !id );
			if ( id ) {
				const pat = this._dawcore.get.pattern( id ),
					drums = this._dawcore.get.drums( pat.drums );

				this._drumsId = pat.drums;
				this._dataDrums.change( drums );
			}
		}
	}
	setWaveforms( svgManager ) {
		this._svgManager = svgManager;
	}
	onstartdrum( rowId ) {
		this._uiDrumrows.playRow( rowId );
	}
	onstopdrumrow( rowId ) {
		this._uiDrumrows.stopRow( rowId );
	}
	change( obj ) {
		const drmObj = obj.drums && obj.drums[ this._drumsId ];

		this._dataDrumrows.change( obj );
		if ( obj.drumrows ) {
			this.rootElement.drumrows.reorderDrumrows( obj.drumrows );
		}
		if ( "beatsPerMeasure" in obj || "stepsPerBeat" in obj ) {
			const bPM = obj.beatsPerMeasure || this._dawcore.get.beatsPerMeasure(),
				sPB = obj.stepsPerBeat || this._dawcore.get.stepsPerBeat();

			this.rootElement.timeDivision( bPM, sPB );
		}
		if ( drmObj ) {
			this._dataDrums.change( drmObj );
		}
		if ( "patternDrumsOpened" in obj ) {
			this.selectPattern( obj.patternDrumsOpened );
		}
	}
	clear() {
		this.selectPattern( null );
		this._dataDrumrows.clear();
	}

	// .........................................................................
	_setPropFilter( rowId, prop ) {
		const propValues = Object.entries( this._dawcore.get.drums( this._drumsId ) )
				.filter( ( [, drm ] ) => drm.row === rowId && "gain" in drm )
				.map( ( [ id, drm ] ) => [ id, drm[ prop ] ] );

		this._uiDrumrows.setPropFilter( rowId, prop );
		this.rootElement.setPropValues( rowId, prop, propValues );
	}
	_setAllPropFilters( prop ) {
		Object.keys( this._dawcore.get.drumrows() )
			.forEach( id => this._setPropFilter( id, prop ) );
	}
}

Object.freeze( GSDrums );

window.GSDrums = GSDrums;
