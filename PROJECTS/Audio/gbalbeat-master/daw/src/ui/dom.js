"use strict";

window.UIdomInit = function() {
	window.DOM = UIdomFill();
	UIdomGetComments().forEach( com => {
		com.replaceWith( DOM[ com.textContent.substr( 1 ) ] );
	} );
}

window.UIdomFill = function() {
	const DOM = UIdomFillIds(),
		winBtns = DOM.winBtns.querySelectorAll( ".winBtn" );

	DOM.winBtnsMap = Array.prototype.reduce.call( winBtns, ( map, btn ) => {
		map.set( btn.dataset.win, btn );
		return map;
	}, new Map() );
	return DOM;
}

window.UIdomFillIds = function() {
	const ids = document.querySelectorAll( "[id]" );

	return Array.prototype.reduce.call( ids, ( obj, el ) => {
		obj[ el.id ] = el;
		if ( "remove" in el.dataset ) {
			el.remove();
			el.removeAttribute( "data-remove" );
		}
		if ( "removeId" in el.dataset ) {
			el.removeAttribute( "id" );
			el.removeAttribute( "data-remove-id" );
		}
		return obj;
	}, {} );
}

window.UIdomGetComments = function() {
	const list = [],
		treeWalker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_COMMENT,
			{ acceptNode: com => com.textContent[ 0 ] === "#"
				? NodeFilter.FILTER_ACCEPT
				: NodeFilter.FILTER_REJECT
			},
			false
		);

	while ( treeWalker.nextNode() ) {
		list.push( treeWalker.currentNode );
	}
	return list;
}
