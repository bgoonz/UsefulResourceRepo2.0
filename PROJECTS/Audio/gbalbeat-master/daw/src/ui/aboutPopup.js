"use strict";

function UIaboutPopupInit() {
	DOM.helpAbout.onclick = UIaboutPopupShow;
	DOM.versionCheck.onclick = UIaboutPopupVersionCheck;
}

function UIaboutPopupShow() {
	gsuiPopup.custom( {
		title: "About",
		element: DOM.aboutPopupContent,
	} );
	return false;
}

function UIaboutPopupVersionCheck() {
	const dt = DOM.versionIcon.dataset;

	dt.icon = "none";
	dt.spin = "on";
	return false;
}

window.UIaboutPopupInit = UIaboutPopupInit;