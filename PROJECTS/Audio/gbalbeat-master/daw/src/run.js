import "../gs-ui-components/gsui.css"
import "../gs-ui-components/gsuiDragshield/gsuiDragshield.css"
import "../gs-ui-components/gsuiIcon/gsuiIcon.css"
import "../gs-ui-components/gsuiEnvelopeGraph/gsuiEnvelopeGraph.css"
import "../gs-ui-components/gsuiEnvelope/gsuiEnvelope.colors.default.css"
import "../gs-ui-components/gsuiEnvelope/gsuiEnvelope.css"
import "../gs-ui-components/gsuiLFO/gsuiLFO.colors.default.css"
import "../gs-ui-components/gsuiLFO/gsuiLFO.css"
import "../gs-ui-components/gsuiDrumrows/gsuiDrumrows.colors.default.css"
import "../gs-ui-components/gsuiDrumrows/gsuiDrumrows.css"
import "../gs-ui-components/gsuiDrums/gsuiDrums.colors.default.css"
import "../gs-ui-components/gsuiDrums/gsuiDrums.css"
import "../gs-ui-components/gsuiClock/gsuiClock.colors.default.css"
import "../gs-ui-components/gsuiClock/gsuiClock.css"
import "../gs-ui-components/gsuiMixer/gsuiMixer.colors.default.css"
import "../gs-ui-components/gsuiMixer/gsuiMixer.css"
import "../gs-ui-components/gsuiCurves/gsuiCurves.css"
import "../gs-ui-components/gsuiEffects/gsuiEffects.css"
import "../gs-ui-components/gsuiFxFilter/gsuiFxFilter.colors.default.css"
import "../gs-ui-components/gsuiFxFilter/gsuiFxFilter.css"
import "../gs-ui-components/gsuiReorder/gsuiReorder.css"
import "../gs-ui-components/gsuiDragline/gsuiDragline.css"
import "../gs-ui-components/gsuiBeatlines/gsuiBeatlines.css"
import "../gs-ui-components/gsuiBlocksManager/gsuiBlocksManager.css"
import "../gs-ui-components/gsuiPatternroll/gsuiPatternroll.css"
import "../gs-ui-components/gsuiPianoroll/gsuiPianoroll.css"
import "../gs-ui-components/gsuiPianoroll/gsuiPianoroll-block.css"
import "../gs-ui-components/gsuiKeys/gsuiKeys.colors.default.css"
import "../gs-ui-components/gsuiKeys/gsuiKeys.css"
import "../gs-ui-components/gsuiOscillator/gsuiOscillator.colors.default.css"
import "../gs-ui-components/gsuiOscillator/gsuiOscillator.css"
import "../gs-ui-components/gsuiPeriodicWave/gsuiPeriodicWave.css"
import "../gs-ui-components/gsuiSynthesizer/gsuiSynthesizer.colors.default.css"
import "../gs-ui-components/gsuiSynthesizer/gsuiSynthesizer.css"
import "../gs-ui-components/gsuiDotline/gsuiDotline.css"
import "../gs-ui-components/gsuiPanels/gsuiPanels.colors.default.css"
import "../gs-ui-components/gsuiPanels/gsuiPanels.css"
import "../gs-ui-components/gsuiPopup/gsuiPopup.colors.default.css"
import "../gs-ui-components/gsuiPopup/gsuiPopup.css"
import "../gs-ui-components/gsuiSlider/gsuiSlider.css"
import "../gs-ui-components/gsuiSliderGroup/gsuiSliderGroup.colors.default.css"
import "../gs-ui-components/gsuiSliderGroup/gsuiSliderGroup.css"
import "../gs-ui-components/gsuiTimeline/gsuiTimeline.colors.default.css"
import "../gs-ui-components/gsuiTimeline/gsuiTimeline.css"
import "../gs-ui-components/gsuiTimewindow/gsuiTimewindow.colors.default.css"
import "../gs-ui-components/gsuiTimewindow/gsuiTimewindow.css"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns.colors.default.css"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns.css"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns-synth.css"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns-pattern.css"
import "../gs-ui-components/gsuiTrack/gsuiTrack.colors.default.css"
import "../gs-ui-components/gsuiTrack/gsuiTrack.css"
import "../gs-ui-components/gsuiWindows/gsuiWindow.colors.default.css"
import "../gs-ui-components/gsuiWindows/gsuiWindows.css"
import "../gs-ui-components/gsuiWindows/gsuiWindow.css"
import "../assets/fonts/fonts.css"
import "./css/reset.css"
import "./css/textGlitch.css"
import "./css/loading.css"
import "./css/root.css"
import "./css/app.css"
import "./css/head.css"
import "./css/cmps.css"
import "./css/popup.css"
import "./css/window.css"
import "./css/windows.css"
import "./css/cmp.css"
import "./css/history.css"
import "./css/version.css"
import "./css/placeholder.css"
import "./css/headDropdown.css"
import "./css/historyAction.css"
import "./css/pianorollForbidden.css"


import "./checkBrowser.js"
import "../gs-api-client/gsapiClient.js"
import "../daw-core/src/DAWCore.js"
import "../daw-core/src/Buffers.js"
import "../daw-core/src/LocalStorage.js"
import "../daw-core/src/Destination.js"
import "../daw-core/src/History.js"
import "../daw-core/src/History.prototype.nameAction.js"
import "../daw-core/src/Drums.js"
import "../daw-core/src/Pianoroll.js"
import "../daw-core/src/Composition.js"
import "../daw-core/src/Composition.epure.js"
import "../daw-core/src/Composition.format.js"
import "../daw-core/src/Composition.prototype.change.js"
import "../daw-core/src/utils/addIfNotEmpty.js"
import "../daw-core/src/utils/castToNumber.js"
import "../daw-core/src/utils/composeUndo.js"
import "../daw-core/src/utils/createUpdateDelete.js"
import "../daw-core/src/utils/deepAssign.js"
import "../daw-core/src/utils/deepCopy.js"
import "../daw-core/src/utils/deepFreeze.js"
import "../daw-core/src/utils/diffAssign.js"
import "../daw-core/src/utils/isEmpty.js"
import "../daw-core/src/utils/isntEmpty.js"
import "../daw-core/src/utils/isObject.js"
import "../daw-core/src/utils/jsonCopy.js"
import "../daw-core/src/utils/mapCallbacks.js"
import "../daw-core/src/utils/noop.js"
import "../daw-core/src/utils/panningMerge.js"
import "../daw-core/src/utils/panningMergeLR.js"
import "../daw-core/src/utils/panningSplitLR.js"
import "../daw-core/src/utils/plural.js"
import "../daw-core/src/utils/trim2.js"
import "../daw-core/src/utils/uniqueName.js"
import "../daw-core/src/utils/uuid.js"
import "../daw-core/src/json/composition.js"
import "../daw-core/src/json/block.js"
import "../daw-core/src/json/channel.js"
import "../daw-core/src/json/channels.js"
import "../daw-core/src/json/drum.js"
import "../daw-core/src/json/drumcut.js"
import "../daw-core/src/json/drumrow.js"
import "../daw-core/src/json/effects.filter.js"
import "../daw-core/src/json/env.js"
import "../daw-core/src/json/key.js"
import "../daw-core/src/json/lfo.js"
import "../daw-core/src/json/oscillator.js"
import "../daw-core/src/json/synth.js"
import "../daw-core/src/json/track.js"
import "../daw-core/src/controllers/blocks.js"
import "../daw-core/src/controllers/drumrows.js"
import "../daw-core/src/controllers/drums.js"
import "../daw-core/src/controllers/effects.js"
import "../daw-core/src/controllers/keys.js"
import "../daw-core/src/controllers/mixer.js"
import "../daw-core/src/controllers/synth.js"
import "../daw-core/src/controllers/tracks.js"
import "../daw-core/src/controllersFx/filter.js"
import "../daw-core/src/actions/common/calcNewDuration.js"
import "../daw-core/src/actions/common/calcNewKeysDuration.js"
import "../daw-core/src/actions/common/createUniqueName.js"
import "../daw-core/src/actions/common/getDrumrowName.js"
import "../daw-core/src/actions/common/getNextIdOf.js"
import "../daw-core/src/actions/common/getNextOrderOf.js"
import "../daw-core/src/actions/common/toggleSolo.js"
import "../daw-core/src/actions/common/updatePatternDuration.js"
import "../daw-core/src/actions/addBlock.js"
import "../daw-core/src/actions/addBuffers.js"
import "../daw-core/src/actions/addChannel.js"
import "../daw-core/src/actions/addDrumcuts.js"
import "../daw-core/src/actions/addDrumrow.js"
import "../daw-core/src/actions/addDrums.js"
import "../daw-core/src/actions/addEffect.js"
import "../daw-core/src/actions/addKey.js"
import "../daw-core/src/actions/addOscillator.js"
import "../daw-core/src/actions/addPatternDrums.js"
import "../daw-core/src/actions/addPatternKeys.js"
import "../daw-core/src/actions/addSynth.js"
import "../daw-core/src/actions/changeNewSynthType.js"
import "../daw-core/src/actions/changeChannel.js"
import "../daw-core/src/actions/changeDrumrow.js"
import "../daw-core/src/actions/changeDrumrowPattern.js"
import "../daw-core/src/actions/changeDrumsProps.js"
import "../daw-core/src/actions/changeEffect.js"
import "../daw-core/src/actions/changeEnv.js"
import "../daw-core/src/actions/changeKeysProps.js"
import "../daw-core/src/actions/changeLFO.js"
import "../daw-core/src/actions/changeLoop.js"
import "../daw-core/src/actions/changeOscillator.js"
import "../daw-core/src/actions/changeTempo.js"
import "../daw-core/src/actions/clonePattern.js"
import "../daw-core/src/actions/cloneSelectedKeys.js"
import "../daw-core/src/actions/closePattern.js"
import "../daw-core/src/actions/cropEndBlocks.js"
import "../daw-core/src/actions/cropEndKeys.js"
import "../daw-core/src/actions/cropStartBlocks.js"
import "../daw-core/src/actions/duplicateSelectedBlocks.js"
import "../daw-core/src/actions/moveBlocks.js"
import "../daw-core/src/actions/moveKeys.js"
import "../daw-core/src/actions/openPattern.js"
import "../daw-core/src/actions/openSynth.js"
import "../daw-core/src/actions/redirectChannel.js"
import "../daw-core/src/actions/redirectKey.js"
import "../daw-core/src/actions/redirectPatternBuffer.js"
import "../daw-core/src/actions/redirectPatternKeys.js"
import "../daw-core/src/actions/redirectSynth.js"
import "../daw-core/src/actions/removeBlocks.js"
import "../daw-core/src/actions/removeChannel.js"
import "../daw-core/src/actions/removeDrumcuts.js"
import "../daw-core/src/actions/removeDrumrow.js"
import "../daw-core/src/actions/removeDrums.js"
import "../daw-core/src/actions/removeEffect.js"
import "../daw-core/src/actions/removeKeys.js"
import "../daw-core/src/actions/removeOscillator.js"
import "../daw-core/src/actions/removePattern.js"
import "../daw-core/src/actions/removeSynth.js"
import "../daw-core/src/actions/renameChannel.js"
import "../daw-core/src/actions/renameComposition.js"
import "../daw-core/src/actions/renamePattern.js"
import "../daw-core/src/actions/renameSynth.js"
import "../daw-core/src/actions/renameTrack.js"
import "../daw-core/src/actions/reorderChannel.js"
import "../daw-core/src/actions/reorderDrumrow.js"
import "../daw-core/src/actions/reorderOscillator.js"
import "../daw-core/src/actions/reorderPattern.js"
import "../daw-core/src/actions/selectBlocks.js"
import "../daw-core/src/actions/selectKeys.js"
import "../daw-core/src/actions/toggleChannel.js"
import "../daw-core/src/actions/toggleDrumrow.js"
import "../daw-core/src/actions/toggleEffect.js"
import "../daw-core/src/actions/toggleEnv.js"
import "../daw-core/src/actions/toggleLFO.js"
import "../daw-core/src/actions/toggleSoloDrumrow.js"
import "../daw-core/src/actions/toggleSoloTrack.js"
import "../daw-core/src/actions/toggleTrack.js"
import "../daw-core/src/actions/unselectAllBlocks.js"
import "../daw-core/src/actions/unselectAllKeys.js"
import "../daw-core/src/actions/unselectBlock.js"
import "../daw-core/src/actions/unselectKey.js"
import "../daw-core/src/prototype/abortWAVExport.js"
import "../daw-core/src/prototype/addComposition.js"
import "../daw-core/src/prototype/addCompositionByBlob.js"
import "../daw-core/src/prototype/addCompositionByJSON.js"
import "../daw-core/src/prototype/addCompositionByURL.js"
import "../daw-core/src/prototype/addCompositionsFromLocalStorage.js"
import "../daw-core/src/prototype/addNewComposition.js"
import "../daw-core/src/prototype/closeComposition.js"
import "../daw-core/src/prototype/deleteComposition.js"
import "../daw-core/src/prototype/dropAudioFiles.js"
import "../daw-core/src/prototype/exportCompositionToJSON.js"
import "../daw-core/src/prototype/exportCompositionToWAV.js"
import "../daw-core/src/prototype/liveChangeChannel.js"
import "../daw-core/src/prototype/liveChangeEffect.js"
import "../daw-core/src/prototype/liveChangeSynth.js"
import "../daw-core/src/prototype/newComposition.js"
import "../daw-core/src/prototype/openComposition.js"
import "../daw-core/src/prototype/saveComposition.js"
import "../gs-components/gsDrums/gsDrums.js"
import "../gs-components/gsEffects/gsEffects.js"
import "../gs-components/gsMixer/gsMixer.js"
import "../gs-components/gsPatternroll/gsPatternroll.js"
import "../gs-components/gsPatterns/gsPatterns.js"
import "../gs-components/gsPianoroll/gsPianoroll.js"
import "../gs-components/gsSynth/gsSynth.js"
import "../gs-wa-components/gswaLFO/gswaLFO.js"
import "../gs-wa-components/gswaEnvelope/gswaEnvelope.js"
import "../gs-wa-components/gswaMixer/gswaMixer.js"
import "../gs-wa-components/gswaSynth/gswaSynth.js"
import "../gs-wa-components/gswaSynth/gswaSynth.midiKeyToHz.js"
import "../gs-wa-components/gswaKeysScheduler/gswaKeysScheduler.js"
import "../gs-wa-components/gswaDrumsScheduler/gswaDrumsScheduler.js"
import "../gs-wa-components/gswaBPMTap/gswaBPMTap.js"
import "../gs-wa-components/gswaEffects/gswaEffects.js"
import "../gs-wa-components/gswaFxFilter/gswaFxFilter.js"
import "../gs-wa-components/gswaDrumrows/gswaDrumrows.js"
import "../gs-wa-components/gswaScheduler/gswaScheduler.js"
import "../gs-wa-components/gswaEncodeWAV/gswaEncodeWAV.js"
import "../gs-wa-components/gswaStereoPanner/gswaStereoPanner.js"
import "../gs-wa-components/gswaPeriodicWaves/gswaPeriodicWaves.js"
import "../gs-wa-components/gswaPeriodicWaves/gswaPeriodicWaves.list.js"
import "../gs-ui-components/gsui.js"
import "../gs-ui-components/gsuiDragshield/gsuiDragshield.js"
import "../gs-ui-components/gsuiEnvelopeGraph/gsuiEnvelopeGraph.js"
import "../gs-ui-components/gsuiEnvelope/gsuiEnvelope.html.js"
import "../gs-ui-components/gsuiEnvelope/gsuiEnvelope.js"
import "../gs-ui-components/gsuiLFO/gsuiLFO.html.js"
import "../gs-ui-components/gsuiLFO/gsuiLFO.js"
import "../gs-ui-components/gsuiClock/gsuiClock.html.js"
import "../gs-ui-components/gsuiClock/gsuiClock.js"
import "../gs-ui-components/gsuiMixer/gsuiMixer.html.js"
import "../gs-ui-components/gsuiMixer/gsuiMixer.js"
import "../gs-ui-components/gsuiCurves/gsuiCurves.html.js"
import "../gs-ui-components/gsuiCurves/gsuiCurves.js"
import "../gs-ui-components/gsuiEffects/gsuiEffects.html.js"
import "../gs-ui-components/gsuiEffects/gsuiEffects.js"
import "../gs-ui-components/gsuiFxFilter/gsuiFxFilter.html.js"
import "../gs-ui-components/gsuiFxFilter/gsuiFxFilter.js"
import "../gs-ui-components/gsuiReorder/gsuiReorder.js"
import "../gs-ui-components/gsuiReorder/gsuiReorder.listReorder.js"
import "../gs-ui-components/gsuiReorder/gsuiReorder.listComputeOrderChange.js"
import "../gs-ui-components/gsuiDragline/gsuiDragline.html.js"
import "../gs-ui-components/gsuiDragline/gsuiDragline.js"
import "../gs-ui-components/gsuiBeatlines/gsuiBeatlines.js"
import "../gs-ui-components/gsuiBlocksManager/gsuiBlocksManager.js"
import "../gs-ui-components/gsuiBlocksManager/gsuiBlocksManager.prototype.__mousedown.js"
import "../gs-ui-components/gsuiBlocksManager/gsuiBlocksManager.prototype.__mousemove.js"
import "../gs-ui-components/gsuiBlocksManager/gsuiBlocksManager.prototype.__mouseup.js"
import "../gs-ui-components/gsuiPatternroll/gsuiPatternroll.html.js"
import "../gs-ui-components/gsuiPatternroll/gsuiPatternroll.js"
import "../gs-ui-components/gsuiPianoroll/gsuiPianoroll.html.js"
import "../gs-ui-components/gsuiPianoroll/gsuiPianoroll.js"
import "../gs-ui-components/gsuiDrumrows/gsuiDrumrows.html.js"
import "../gs-ui-components/gsuiDrumrows/gsuiDrumrows.js"
import "../gs-ui-components/gsuiDrums/gsuiDrums.html.js"
import "../gs-ui-components/gsuiDrums/gsuiDrums.js"
import "../gs-ui-components/gsuiKeys/gsuiKeys.html.js"
import "../gs-ui-components/gsuiKeys/gsuiKeys.js"
import "../gs-ui-components/gsuiKeys/gsuiKeys.keyNames.js"
import "../gs-ui-components/gsuiKeys/gsuiKeys.keyboardToKey.js"
import "../gs-ui-components/gsuiOscillator/gsuiOscillator.html.js"
import "../gs-ui-components/gsuiOscillator/gsuiOscillator.js"
import "../gs-ui-components/gsuiPeriodicWave/gsuiPeriodicWave.js"
import "../gs-ui-components/gsuiSynthesizer/gsuiSynthesizer.html.js"
import "../gs-ui-components/gsuiSynthesizer/gsuiSynthesizer.js"
import "../gs-ui-components/gsuiDotline/gsuiDotline.js"
import "../gs-ui-components/gsuiPanels/gsuiPanels.js"
import "../gs-ui-components/gsuiPopup/gsuiPopup.html.js"
import "../gs-ui-components/gsuiPopup/gsuiPopup.js"
import "../gs-ui-components/gsuiSlider/gsuiSlider.html.js"
import "../gs-ui-components/gsuiSlider/gsuiSlider.js"
import "../gs-ui-components/gsuiSliderGroup/gsuiSliderGroup.html.js"
import "../gs-ui-components/gsuiSliderGroup/gsuiSliderGroup.js"
import "../gs-ui-components/gsuiTimeline/gsuiTimeline.html.js"
import "../gs-ui-components/gsuiTimeline/gsuiTimeline.js"
import "../gs-ui-components/gsuiTimewindow/gsuiTimewindow.html.js"
import "../gs-ui-components/gsuiTimewindow/gsuiTimewindow.js"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns-pattern.html.js"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns-synth.html.js"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns.html.js"
import "../gs-ui-components/gsuiPatterns/gsuiPatterns.js"
import "../gs-ui-components/gsuiTrack/gsuiTrack.html.js"
import "../gs-ui-components/gsuiTrack/gsuiTrack.js"
import "../gs-ui-components/gsuiTracklist/gsuiTracklist.js"
import "../gs-ui-components/gsuiAnalyser/gsuiAnalyser.js"
import "../gs-ui-components/gsuiSpectrum/gsuiSpectrum.js"
import "../gs-ui-components/gsuiSpectrum/gsuiSpectrum.draw.js"
import "../gs-ui-components/gsuiSVGDefs/gsuiSVGDefs.js"
import "../gs-ui-components/gsuiWaveform/gsuiWaveform.js"
import "../gs-ui-components/gsuiWaveform/gsuiWaveform.draw.js"
import "../gs-ui-components/gsuiWaveforms/gsuiWaveforms.js"
import "../gs-ui-components/gsuiKeysforms/gsuiKeysforms.js"
import "../gs-ui-components/gsuiDrumsforms/gsuiDrumsforms.js"
import "../gs-ui-components/gsuiWindows/gsuiWindows.js"
import "../gs-ui-components/gsuiWindows/gsuiWindow.html.js"
import "../gs-ui-components/gsuiWindows/gsuiWindow.js"
import "./ui/dom.js"
import "./ui/textGlitch.js"
import "./ui/loading.js"
import "./ui/auth.js"
import "./ui/drop.js"
import "./ui/drums.js"
import "./ui/title.js"
import "./ui/synth.js"
import "./ui/mixer.js"
import "./ui/cookie.js"
import "./ui/effects.js"
import "./ui/history.js"
import "./ui/windows.js"
import "./ui/patterns.js"
import "./ui/controls.js"
import "./ui/keyboard.js"
import "./ui/openPopup.js"
import "./ui/pianoroll.js"
import "./ui/aboutPopup.js"
import "./ui/patternroll.js"
import "./ui/renderPopup.js"
import "./ui/mainAnalyser.js"
import "./ui/compositions.js"
import "./ui/settingsPopup.js"
import "./ui/shortcutsPopup.js"
import "./ui/compositionChanged.js"

"use strict";

UIloading().then( UIrun ).then( UIloaded );

function UIrun() {
	const DAW = new DAWCore(),
		hash = new Map( location.hash
			.substr( 1 )
			.split( "&" )
			.map( kv => kv.split( "=" ) )
		);

	window.DAW = DAW;
	window.VERSION = "0.34.0";

	window.UIdrums = new GSDrums();
	window.UIeffects = new GSEffects();
	window.UImixer = new GSMixer();
	window.UIpatternroll = new GSPatternroll();
	window.UIpatterns = new GSPatterns();
	window.UIpianoroll = new GSPianoroll();
	window.UIsynth = new GSSynth();

	UIdomInit();
	UIwindowsInit();

	UIauthInit();
	UIdrumsInit();
	UImixerInit();
	UIsynthInit();
	UIcookieInit();
	UIeffectsInit();
	UIhistoryInit();
	UIcontrolsInit();
	UIkeyboardInit();
	UIpatternsInit();
	UIpianorollInit();
	UIaboutPopupInit();
	UIpatternrollInit();
	UIrenderPopupInit();
	UImainAnalyserInit();
	UIcompositionsInit();
	UIsettingsPopupInit();
	UIshortcutsPopupInit();

	window.onblur = () => UIpianoroll.getUIKeys().midiReleaseAllKeys();
	window.onkeyup = UIkeyboardUp;
	window.onkeydown = UIkeyboardDown;
	// window.onbeforeunload = UIcompositionBeforeUnload;
	document.body.ondrop = UIdrop;
	document.body.ondragover = () => false;
	document.addEventListener( "wheel", e => {
		if ( e.ctrlKey ) {
			e.preventDefault();
		}
	}, { passive: false } );
	document.addEventListener( "drop", e => {
		DAW.dropAudioFiles( e.dataTransfer.files );
	} );

	DAW.cb.focusOn = UIcontrolsFocusOn;
	DAW.cb.currentTime = UIcontrolsCurrentTime;
	DAW.cb.clockUpdate = UIcontrolsClockUpdate;
	DAW.cb.buffersLoaded = UIpatternsBuffersLoaded;
	DAW.cb.compositionAdded = UIcompositionAdded;
	DAW.cb.compositionOpened = UIcompositionOpened;
	DAW.cb.compositionClosed = UIcompositionClosed;
	DAW.cb.compositionChanged = UIcompositionChanged;
	DAW.cb.compositionDeleted = UIcompositionDeleted;
	DAW.cb.compositionLoading = UIcompositionLoading;
	DAW.cb.compositionSavedStatus = UIcompositionSavedStatus;
	DAW.cb.compositionSavingPromise = UIauthSaveComposition;
	DAW.cb.onstartdrum = rowId => UIdrums.onstartdrum( rowId );
	DAW.cb.onstopdrumrow = rowId => UIdrums.onstopdrumrow( rowId );
	DAW.cb.analyserFilled = UImainAnalyser.draw.bind( UImainAnalyser );
	DAW.cb.channelAnalyserFilled = UImixer.updateAudioData.bind( UImixer );
	DAW.cb.pause =
	DAW.cb.stop = () => DOM.play.dataset.icon = "play";
	DAW.cb.play = () => DOM.play.dataset.icon = "pause";

	DOM.versionNum.textContent =
	DOM.headVersionNum.textContent = window.VERSION;

	DOM.winBtnsMap.forEach( ( btn, id ) => id !== "effects" && id !== "drums" && btn.click() );

	// UIauthGetMe();
	DAW.addCompositionsFromLocalStorage();

	document.addEventListener( "gsuiEvents", e => {
		const { component, eventName, args } = e.detail;

		console.warn( `uncatched gsuiEvent: [${ component }][${ eventName }]`, args );
	} );

	if ( !hash.has( "cmp" ) ) {
		UIcompositionClickNewLocal();
	} else {
		DAW.addCompositionByURL( hash.get( "cmp" ) )
			.catch( e => {
				console.error( e );
				return DAW.addNewComposition();
			} )
			.then( cmp => DAW.openComposition( "local", cmp.id ) );
		location.hash = "";
	}
}
