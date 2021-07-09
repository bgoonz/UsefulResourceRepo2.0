"use strict";

window.UIeffectsInit = function() {
	const win = UIwindows.window( "effects" );

	DOM.channelName.onclick = UIeffectsOnclickName;
	win.contentAppend( UIeffects.rootElement );
	UIeffects.setDAWCore( DAW );
}

window.UIeffectsRenameChan = function( name ) {
	DOM.channelName.textContent = name;
}

window.UIeffectsSelectChan = function( id ) {
	UIeffectsRenameChan( DAW.get.channel( id ).name );
	UIeffects.setDestFilter( id );
}

window.UIeffectsOnclickName = function() {
	const id = UImixer.getSelectedChannelId();

	if ( id !== "main" ) {
		gsuiPopup
			.prompt( "Rename channel", "", DOM.channelName.textContent, "Rename" )
			.then( name => DAW.callAction( "renameChannel", id, name ) );
	}
}
