
const removeElement = el => el.parentNode.removeChild( el );

//--------------------------------


removeElement( document.querySelector( '#my-element' ) );
// Removes #my-element from the DOM

//--------------------------------


const removeNonASCII = str => str.replace( /[^\x20-\x7E]/g, '' );

//--------------------------------


removeNonASCII( 'äÄçÇéÉêlorem-ipsumöÖÐþúÚ' ); // 'lorem-ipsum'

//--------------------------------


const removeWhitespace = str => str.replace( /\s+/g, '' );

//--------------------------------


removeWhitespace( 'Lorem ipsum.\n Dolor sit amet. ' );
// 'Loremipsum.Dolorsitamet.'

//--------------------------------