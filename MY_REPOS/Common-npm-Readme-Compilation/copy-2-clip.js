// function copyToClipboard( text ) {
//   const elem = document.querySelector( 'bash' );
//   elem.value = text;
//   document.body.appendChild( elem );
//   elem.select();
//   document.execCommand( 'copy' );
//   document.body.removeChild( elem );
// }
// const copyToClipboard = function ( str ) {
//   const el = document.createElement( 'textarea' );
//   el.value = str;
//   el.setAttribute( 'readonly', '' );
//   el.style.position = 'absolute';
//   el.style.left = '-9999px';
//   document.body.querySelector( 'bash' ).appendChild( el );
//   const selected = document.getSelection().rangeCount > 0 ?
//     document.getSelection().getRangeAt( 0 ) :
//     false;
//   el.select();
//   document.execCommand( 'copy' );
//   document.body.removeChild( el );
//   if ( selected ) {
//     document.getSelection().removeAllRanges();
//     document.getSelection().addRange( selected );
//   }
// };
// function copyText() {
//   var outputText = "";
//   var targets = document.getElementsByClassName( 'bash' );
//   for ( var i = 0; i < targets.length; i++ ) {
//     outputText += targets[ i ].innerText;
//   }
//   var output = document.getElementById( 'output' );
//   output.innerText = outputText;
//   var range = document.createRange();
//   range.selectNodeContents( output );
//   var selection = window.getSelection();
//   selection.removeAllRanges();
//   selection.addRange( range );
//   document.execCommand( 'copy' );
//   output.style.display = 'none';
// }
// const aioColors = document.querySelectorAll( '.color span' );
// 
// aioColors.forEach( color => {
//   color.addEventListener( 'click', () => {
//     const selection = window.getSelection();
//     const range = document.createRange();
//     range.selectNodeContents( color );
//     selection.removeAllRanges();
//     selection.addRange( range );
// 
//     try {
//       document.execCommand( 'copy' );
//       selection.removeAllRanges();
// 
//       const original = color.textContent;
//       color.textContent = 'Copied!';
//       color.classList.add( 'success' );
// 
//       setTimeout( () => {
//         color.textContent = original;
//         color.classList.remove( 'success' );
//       }, 1200 );
//     } catch ( e ) {
//       const errorMsg = document.querySelector( '.error-msg' );
//       errorMsg.classList.add( 'show' );
// 
//       setTimeout( () => {
//         errorMsg.classList.remove( 'show' );
//       }, 1200 );
//     }
//   } );
// } );
<span id="copy">This text will be copied</span>


$( document ).ready(function() {
    var clipboard = new Clipboard('.clipboard');
  clipboard.on('success', function(e) {
    $(e.trigger).text("Copied!");
    e.clearSelection();
    setTimeout(function() {
      $(e.trigger).text("Copy");
    }, 2500);
  });
