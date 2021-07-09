"use strict";

const gsapiClient = {
	url: "http://localhost/Gbalbeat/api.Gbalbeat.com/api/",
	headers: Object.freeze( {
		"Content-Type": "application/json; charset=utf-8",
	} ),

	// store
	// ........................................................................
	user: {},

	// ........................................................................
	getMe() {
		return this._fetch( "GET", "getMe.php" )
			.then( me => this._assignMe( me ) );
	},
	getUser( username ) {
		return this._fetch( "GET", `getUser.php?username=${ username }` )
			.then( ( { data } ) => {
				data.usernameLow = data.username.toLowerCase();
				return data;
			} );
	},
	getUserCompositions( iduser ) {
		return this._fetch( "GET", `getUserCompositions.php?id=${ iduser }` )
			.then( ( { data } ) => {
				data.forEach( cmp => cmp.data = JSON.parse( cmp.data ) );
				return data;
			} );
	},
	getComposition( id ) {
		return this._fetch( "GET", `getComposition.php?id=${ id }` )
			.then( ( { data } ) => {
				data.composition.data = JSON.parse( data.composition.data );
				return data;
			} );
	},
	login( email, pass ) {
		return this._fetch( "POST", "login.php", { email, pass } )
			.then( me => this._assignMe( me ) );
	},
	signup( username, email, pass ) {
		return this._fetch( "POST", "createUser.php", { username, email, pass } )
			.then( me => this._assignMe( me ) );
	},
	resendConfirmationEmail() {
		return this._fetch( "POST", "resendConfirmationEmail.php", { email: this.user.email } );
	},
	recoverPassword( email ) {
		return this._fetch( "POST", "recoverPassword.php", { email } );
	},
	resetPassword( email, code, pass ) {
		return this._fetch( "POST", "resetPassword.php", { email, code, pass } );
	},
	logout() {
		return this._fetch( "POST", "logout.php", { confirm: true } )
			.then( res => this._deleteMe( res ) );
	},
	logoutRefresh() {
		return this.logout()
			.then( () => {
				setTimeout( () => location.href =
					location.origin + location.pathname, 500 );
			} );
	},
	updateMyInfo( obj ) {
		return this._fetch( "POST", "updateMyInfo.php", obj )
			.then( me => this._assignMe( me ) );
	},
	saveComposition( cmp ) {
		return this._fetch( "POST", "saveComposition.php",
			{ composition: JSON.stringify( cmp ) } );
	},
	deleteComposition( id ) {
		return this._fetch( "POST", "deleteComposition.php", { id } );
	},

	// private:
	_assignMe( res ) {
		const u = res.data;

		u.usernameLow = u.username.toLowerCase();
		u.emailpublic = u.emailpublic === "1";
		u.emailchecked = u.emailchecked === "1";
		Object.assign( this.user, u );
		return u;
	},
	_deleteMe( res ) {
		Object.keys( this.user ).forEach( k => delete this.user[ k ] );
		return res;
	},
	_fetch( method, url, body ) {
		const obj = {
			method,
			headers: this.headers,
			credentials: "include",
		};

		if ( body ) {
			obj.body = JSON.stringify( body );
		}
		return fetch( this.url + url, obj )
			.then( res => res.text() ) // 1.
			.then( text => {
				try {
					return JSON.parse( text );
				} catch ( e ) {
					return {
						ok: false,
						code: 500,
						msg: text,
					};
				}
			} )
			.then( res => this._fetchThen( res ) );
	},
	_fetchThen( res ) {
		if ( !res.ok ) {
			res.msg = this.errorCode[ res.msg ] || res.msg;
			throw res; // 2.
		}
		return res;
	},

	// ........................................................................
	errorCode: {
		"user:not-connected": "You are not connected",
		"query:bad-format": "The query is incomplete or corrupted",
		"login:fail": "The email/password don't match",
		"pass:too-short": "The password is too short",
		"email:too-long": "The email is too long",
		"email:not-found": "This email is not in the database",
		"email:duplicate": "This email is already used",
		"email:bad-format": "The email is not correct",
		"email:not-verified": "Your email is not verified",
		"username:too-long": "The username is too long",
		"username:too-short": "The username is too short",
		"username:duplicate": "This username is already taken",
		"username:bad-format": "The username can only contains letters, digits and _",
		"password:bad-code": "Can not change the password because the secret code and the email do not match",
		"password:already-recovering": "A recovering email has already been sent to this address less than 1 day ago",
	},
};

/*
1. Why res.text() instead of res.json() ?
   To handle the case where PHP returns a text error/exception with a default 200 code.

2. Every not-ok queries will throw the result instead of return it, why?
   To handle nicely the errors in the UI side, like:
   query().finally().then( OK, KO )
*/

window.gsapiClient = gsapiClient;