
const removeClass = ( el, className ) => el.classList.remove( className );

//--------------------------------


removeClass( document.querySelector( 'p.special' ), 'special' );
// The paragraph will not have the 'special' class anymore
