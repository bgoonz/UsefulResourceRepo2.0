"use strict";

class GSMixer {
	constructor() {
		const uiMixer = new gsuiMixer( {
				oninput: this._oninput.bind( this ),
				onchange: this._onchange.bind( this ),
				onselectChan: this._onselectChan.bind( this ),
			} ),
			ctrlMixer = new DAWCore.controllers.mixer( {
				dataCallbacks: {
					addChannel: ( id, chan ) => uiMixer.addChannel( id, chan ),
					removeChannel: id => uiMixer.removeChannel( id ),
					renameChannel: ( id, name ) => uiMixer.renameChannel( id, name ),
					redirectChannel: ( id, dest ) => uiMixer.redirectChannel( id, dest ),
					toggleChannel: ( id, b ) => uiMixer.toggleChannel( id, b ),
					reorderChannel: ( id, n ) => uiMixer.reorderChannel( id, n ),
					changePanChannel: ( id, val ) => uiMixer.changePanChannel( id, val ),
					changeGainChannel: ( id, val ) => uiMixer.changeGainChannel( id, val ),
				},
			} );

		this.rootElement = uiMixer.rootElement;
		this.onselectChan = null;
		this._uiMixer = uiMixer;
		this._ctrlMixer = ctrlMixer;
		this._dawcore = null;
		Object.seal( this );
	}

	// .........................................................................
	setDAWCore( core ) {
		this._dawcore = core;
	}
	clear() {
		this._ctrlMixer.clear();
	}
	change( obj ) {
		this._ctrlMixer.change( obj );
		if ( obj.channels ) {
			this._uiMixer.reorderChannels( obj.channels );
		}
	}
	resize() {
		this._uiMixer.resized();
	}
	resizing() {
		this._uiMixer.resized();
	}
	attached() {
		this._uiMixer.attached();
	}
	updateAudioData( chanId, ldata, rdata ) {
		this._uiMixer.updateAudioData( chanId, ldata, rdata );
	}
	selectChannel( id ) {
		this._uiMixer.selectChannel( id );
	}
	getSelectedChannelId() {
		return this._uiMixer.getSelectedChannelId();
	}

	// .........................................................................
	_oninput( id, prop, val ) {
		this._dawcore.liveChangeChannel( id, prop, val );
	}
	_onchange( act, ...args ) {
		this._dawcore.callAction( act, ...args );
	}
	_onselectChan( id ) {
		if ( this.onselectChan ) {
			this.onselectChan( id );
		}
	}
}

Object.freeze( GSMixer );

window.GSMixer = GSMixer;