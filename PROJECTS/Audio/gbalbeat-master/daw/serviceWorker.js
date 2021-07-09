"use strict";

self.addEventListener( "install", e => {
	e.waitUntil( caches.open( "daw" ).then( cache => (
		cache.addAll( [
			"/daw/",
			"/daw/index.html",
			"/daw/manifest.json",
			"/favicon.png",
			"/fonts/fa-brands-400.woff2",
			"/fonts/fa-duotone-900.woff2",
			"/fonts/oswald-400-latin.woff2",
			"/fonts/unica-one-400-latin.woff2",
			"/fonts/montserrat-500-latin.woff2",
			"/fonts/montserrat-700-latin.woff2",
			"/fonts/inconsolata-400-latin.woff2",
		] )
	) ) );
} );

self.addEventListener( "fetch", e => {
	e.respondWith(
		fetch( e.request ).catch( () => caches.match( e.request ) )
	);
} );
