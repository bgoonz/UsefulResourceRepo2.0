"use strict";

window.UIauthInit = function() {
	DOM.login.onclick = UIauthLogin;
	DOM.logout.onclick = UIauthLogout;
}

window.UIauthLoading = function( b ) {
	DOM.login.dataset.spin =
	DOM.logout.dataset.spin = b ? "on" : "";
}

window.UIauthLogout = function() {
	UIauthLoading( true );
	gsapiClient.logout()
		.finally( () => UIauthLoading( false ) )
		.then( UIauthLogoutThen );
}

window.UIauthGetMe = function() {
	UIauthLoading( true );
	return gsapiClient.getMe()
		.then( me => {
			UIauthLoginThen( me );
			return gsapiClient.getUserCompositions( me.id );
		} )
		.then( cmps => {
			const opt = { saveMode: "cloud" };

			cmps.forEach( cmp => DAW.addComposition( cmp.data, opt ) );
		} )
		.catch( res => {
			if ( res.code !== 401 ) {
				throw res;
			}
		} )
		.finally( () => UIauthLoading( false ) );
}

window.UIauthLogin = function() {
	if ( !gsapiClient.user.id ) {
		gsuiPopup.custom( {
			ok: "Sign in",
			title: "Authentication",
			submit: UIauthLoginSubmit,
			element: DOM.authPopupContent,
		} ).then( () => {
			DOM.authPopupContent.querySelectorAll( "input" )
				.forEach( inp => inp.value = "" );
		} );
		return false;
	}
}

window.UIauthLoginSubmit = function( obj ) {
	UIauthLoading( true );
	DOM.authPopupError.textContent = "";
	return gsapiClient.login( obj.email, obj.password )
		.then( me => {
			UIauthLoginThen( me );
			return gsapiClient.getUserCompositions( me.id );
		} )
		.then( cmps => {
			const opt = { saveMode: "cloud" };

			cmps.forEach( cmp => DAW.addComposition( cmp.data, opt ) );
		} )
		.catch( res => {
			DOM.authPopupError.textContent = res.msg;
			throw res;
		} )
		.finally( () => UIauthLoading( false ) );
}

window.UIauthLoginThen = function( me ) {
	DOM.app.classList.add( "logged" );
	DOM.headUser.href = `https://Gbalbeat.com/#/u/${ me.username }`;
	DOM.headUser.style.backgroundImage = `url("${ me.avatar }")`;
	return me;
}

window.UIauthLogoutThen = function() {
	DOM.app.classList.remove( "logged" );
	DOM.headUser.removeAttribute( "href" );
	DOM.headUser.style.backgroundImage = "";
	Array.from( DOM.cmpsCloudList.children )
		.forEach( el => DAW.deleteComposition( "cloud", el.dataset.id ) );
	if ( !DAW.get.cmp() ) {
		UIcompositionClickNewLocal();
	}
}

window.UIauthSaveComposition = function( cmp ) {
	return gsapiClient.saveComposition( cmp )
		.then( () => cmp, err => {
			gsuiPopup.alert( `Error ${ err.code }`,
				"An error happened while saving " +
				"your composition&nbsp;:<br/>" +
				`<code>${ err.msg || err }</code>`
			);
			throw err;
		} );
}
