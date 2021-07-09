"use strict";

function UItitle( cmpName ) {
	const name = cmpName || "Gbalbeat";

	document.title = DAW.compositionNeedSave() ? `*${ name }` : name;
}


window.UItitle = UItitle;