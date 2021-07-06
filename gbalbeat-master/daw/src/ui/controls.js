"use strict";

const UIclock = GSUI.createElement( "gsui-clock" );

window.UIcontrolsInit = function() {
	const sliderGain = DOM.headGain.querySelector( "gsui-slider" ),
		sliderTime = DOM.headCurrentTime.querySelector( "gsui-slider" );

	DOM.sliderTime = sliderTime;
	DOM.play.onclick = UIcontrolsClickPlay;
	DOM.stop.onclick = UIcontrolsClickStop;
	DOM.reset.onclick = UIcontrolsClickReset;
	DOM.headTempo.onclick = UIcontrolsClickTempo;
	DOM.playToggle.onclick = UIcontrolsClickPlayToggle;
	DOM.tempoBPMTap.onclick = UIcontrolsBPMTap;
	DOM.headCmpInfo.onclick = UIcontrolsClickCmp;
	DOM.headCmpSave.onclick = UIcompositionClickSave;
	DOM.cmpsBtn.onmousedown =
	DOM.undoMore.onmousedown = UIcontrolsDropdownBtnClick;
	sliderGain.oninput = v => DAW.destination.setGain( v );
	sliderGain.setValue( DAW.destination.getGain() );
	sliderTime.oninput = UIcontrolsSliderTime_oninput;
	sliderTime.onchange = UIcontrolsSliderTime_onchange;
	sliderTime.oninputend = UIcontrolsSliderTime_oninputend;
	sliderTime.oninputstart = UIcontrolsSliderTime_inputstart;
	UIclock.classList.add( "btnGroup", "btnMarge" );
	DOM.headPlay.after( UIclock );
	UIclock.onchangeDisplay = mode => localStorage.setItem( "gsuiClock.display", mode );
	GSUI.setAttribute( UIclock, "mode", localStorage.getItem( "gsuiClock.display" ) || "second" );
}

window.UIcontrolsSliderTime_inputstart = function( beat ) {
	DAW.cb.clockUpdate = null;
	UIclock.setTime( beat );
	window.channel.push("new:msg", {set_time: true, beat: beat, room: window.room})
}
window.UIcontrolsSliderTime_oninputend = function( _beat ) {
	DAW.cb.clockUpdate = UIcontrolsClockUpdate;
}
window.UIcontrolsSliderTime_oninput = function( beat ) {
	const beatRound = UIcontrolsGetFocusedGrid().timeline.previewCurrentTime( beat );

	UIclock.setTime( beatRound );
	window.channel.push("new:msg", {set_time: true, beat: beatRound, room: window.room})
}
window.UIcontrolsSliderTime_onchange = function() {
	const beat = UIcontrolsGetFocusedGrid().timeline.previewCurrentTime( false );

	DAW.getFocusedObject().setCurrentTime( beat );
}

window.UIcontrolsBPMTap = function() {
	DOM.tempoBPM.value = Math.floor( gswaBPMTap.tap() );
}

window.UIcontrolsClockUpdate = function( beat ) {
	UIclock.setTime( beat );
	window.channel.push("new:msg", {set_time: true, beat: beat, room: window.room})
}

window.UIcontrolsCurrentTime = function( beat, focused ) {
	UIcontrolsGetFocusedGrid( focused ).currentTime( beat );
	DOM.sliderTime.setValue( beat );
}

window.UIcontrolsClickCmp = function() {
	gsuiPopup.prompt( "Composition's title", "", DAW.get.name(), "Rename" )
		.then( name => DAW.callAction( "renameComposition", name ) );
}

window.UIcontrolsClickPlay = function() {
	DAW.togglePlay();
}

window.UIcontrolsClickPlayToggle = function() {
	var mode = DAW.getFocusedName() === "composition"
		if (mode == true )
			DAW.pianorollFocus( "-f" )
		else
			DAW.compositionFocus( "-f" );
	window.channel.push("new:msg", {composition_mode: mode, id: window.id, room: window.room});
}

window.UIcontrolsClickStop = function() {
	channel.push("new:msg", {stop: true, id: window.id, room: window.room});
	DAW.stop();
	switch ( document.activeElement ) {
		case UIdrums.rootElement: DAW.drumsFocus( "-f" ); break;
		case UIpianoroll.rootElement: DAW.pianorollFocus( "-f" ); break;
		case UIpatternroll.rootElement: DAW.compositionFocus( "-f" ); break;
	}
}

window.UIcontrolsClickReset = function() {
	DAW.resetAudioContext();
}

window.UIcontrolsGetFocusedGrid = function( focStr = DAW.getFocusedName() ) {
	return ( focStr === "composition"
		? UIpatternroll
		: focStr === "drums"
			? UIdrums
			: UIpianoroll ).rootElement;
}

window.UIcontrolsFocusOn = function( focStr, b ) {
	if ( b ) {
		const focObj = DAW.getFocusedObject(),
			beat = focObj.getCurrentTime(),
			duration = ( focObj === DAW.composition ? focObj.cmp : focObj ).duration,
			grid = UIcontrolsGetFocusedGrid( focStr ),
			onCmp = focStr === "composition";

		DOM.playToggle.dataset.dir = onCmp ? "up" : "down";
		DOM.sliderTime.setAttribute( "max", duration || DAW.get.beatsPerMeasure() );
		DOM.sliderTime.setValue( beat );
		UIdrums.rootElement.classList.toggle( "selected", focStr === "drums" );
		UIpianoroll.rootElement.classList.toggle( "selected", focStr === "pianoroll" );
		UIpatternroll.rootElement.classList.toggle( "selected", onCmp );
		grid.focus();
	}
}

window.UIcontrolsDropdownBtnClick = function( e ) {
	const foc = document.activeElement,
		tar = e.currentTarget;

	if ( foc === tar || foc === tar.nextElementSibling ) {
		e.preventDefault();
		foc.blur();
	}
}

window.UIcontrolsClickTempo = function() {
	DOM.tempoBeatsPM.value = DAW.get.beatsPerMeasure();
	DOM.tempoStepsPB.value = DAW.get.stepsPerBeat();
	DOM.tempoBPM.value = DAW.get.bpm();
	gswaBPMTap.reset();
	gsuiPopup.custom( {
		title: "Tempo",
		element: DOM.tempoPopupContent,
		submit( d ) {
			if(DAW.isPlaying()){
				DAW.pause();
				DAW.callAction( "changeTempo", d.bpm, d.beatsPerMeasure, d.stepsPerBeat );
				DAW.play();
			} else {
				DAW.callAction( "changeTempo", d.bpm, d.beatsPerMeasure, d.stepsPerBeat );
			}
			
		},
	} );
}

window.UIclock = UIclock;