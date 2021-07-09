"use strict";

class GSPatternroll {
	constructor() {
		const uiPatternroll = GSUI.createElement( "gsui-patternroll" ),
			dataTracks = new DAWCore.controllers.tracks( {
				dataCallbacks: {
					addTrack: id => uiPatternroll.addTrack( id ),
					removeTrack: id => uiPatternroll.removeTrack( id ),
					toggleTrack: ( id, b ) => uiPatternroll.toggleTrack( id, b ),
					renameTrack: ( id, s ) => uiPatternroll.renameTrack( id, s ),
					reorderTrack: ( id, n ) => uiPatternroll.reorderTrack( id, n ),
				}
			} ),
			dataBlocks = new DAWCore.controllers.blocks( {
				dataCallbacks: {
					addBlock: ( id, blc ) => uiPatternroll.addBlock( id, blc ),
					removeBlock: id => uiPatternroll.removeBlock( id ),
					changeBlockProp: ( id, prop, val ) => uiPatternroll.changeBlockProp( id, prop, val ),
					updateBlockViewBox: ( id, blc ) => uiPatternroll.updateBlockViewBox( id, blc ),
				},
			} );

		this.rootElement = uiPatternroll;
		this.timeline = uiPatternroll.timeline;
		this._dataTracks = dataTracks;
		this._dataBlocks = dataBlocks;
		this._dawcore =
		this._svgForms = null;
		Object.seal( this );

		uiPatternroll.setData( dataBlocks.data );
		uiPatternroll.setCallbacks( {
			onchange: this._onchange.bind( this ),
			onaddBlock: this._onaddBlock.bind( this ),
			oneditBlock: this._oneditBlock.bind( this ),
		} );
		this.rootElement.addEventListener( "gsuiEvents", this._ongsuiEvents.bind( this ) );
	}

	// .........................................................................
	setDAWCore( core ) {
		this._dawcore = core;
	}
	setSVGForms( svgForms ) {
		this._svgForms = svgForms;
	}
	change( obj ) {
		this._dataTracks.change( obj );
		this._dataBlocks.change( obj );
		if ( "loopA" in obj || "loopB" in obj ) {
			this.rootElement.loop(
				this._dawcore.get.loopA(),
				this._dawcore.get.loopB() );
		}
		if ( "beatsPerMeasure" in obj || "stepsPerBeat" in obj ) {
			this.rootElement.timeDivision(
				this._dawcore.get.beatsPerMeasure(),
				this._dawcore.get.stepsPerBeat() );
		}
	}
	clear() {
		this._dataBlocks.clear();
		this._dataTracks.clear();
	}

	// .........................................................................
	_ongsuiEvents( e ) {
		const d = e.detail;

		// console.log(e);

		switch ( d.component ) {
			case "gsuiTracklist":
				this._dawcore.callAction( d.eventName, ...d.args );
				break;
			case "gsuiTimeline":
				switch ( d.eventName ) {
					case "changeLoop":
						this._dawcore.callAction( "changeLoop", ...d.args );
						break;
					case "changeCurrentTime":
						this._dawcore.composition.setCurrentTime( d.args[ 0 ] );
						break;
				}
				break;
		}
		e.stopPropagation();
	}

	// .........................................................................
	_onchange( obj, ...args ) {
		switch ( obj ) { // tmp
			case "add": this._dawcore.callAction( "addBlock", ...args ); break;
			case "move": this._dawcore.callAction( "moveBlocks", ...args ); break;
			case "cropEnd": this._dawcore.callAction( "cropEndBlocks", ...args ); break;
			case "cropStart": this._dawcore.callAction( "cropStartBlocks", ...args ); break;
			case "duplicate": this._dawcore.callAction( "duplicateSelectedBlocks", ...args ); break;
			case "deletion": this._dawcore.callAction( "removeBlocks", ...args ); break;
			case "selection": this._dawcore.callAction( "selectBlocks", ...args ); break;
			case "unselection": this._dawcore.callAction( "unselectAllBlocks", ...args ); break;
			case "unselectionOne": this._dawcore.callAction( "unselectBlock", ...args ); break;
		}
	}
	_oneditBlock( _id, obj, blc ) {
		if ( blc._gsuiSVGform ) {
			const pat = this._dawcore.get.pattern( obj.pattern );

			this._svgForms[ pat.type ].setSVGViewbox( blc._gsuiSVGform, obj.offset, obj.duration, this._dawcore.get.bpm() / 60 );
		}
	}
	_onaddBlock( id, obj, blc ) {
		const pat = this._dawcore.get.pattern( obj.pattern ),
			SVGs = this._svgForms[ pat.type ],
			svg = SVGs.createSVG( obj.pattern );

		blc._gsuiSVGform = svg;
		blc.children[ 3 ].append( svg );
		SVGs.setSVGViewbox( svg, obj.offset, obj.duration, this._dawcore.get.bpm() / 60 );
		blc.ondblclick = () => this._dawcore.callAction( "openPattern", obj.pattern );
		blc.querySelector( ".gsuiPatternroll-block-name" ).textContent = pat.name;
	}
}

Object.freeze( GSPatternroll );

window.GSPatternroll = GSPatternroll;