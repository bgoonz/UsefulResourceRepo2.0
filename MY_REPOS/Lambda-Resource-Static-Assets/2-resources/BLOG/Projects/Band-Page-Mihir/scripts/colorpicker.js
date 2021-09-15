$( document ).ready( function () {
  jQuery( ".picker-btn" ).click( function () {
    "0px" == jQuery( ".color-picker" ).css( "right" ) ? jQuery( ".color-picker" ).animate( {
      right: "-223px"
    }, "slow" ) : jQuery( ".color-picker" ).animate( {
      right: "0px"
    }, "slow" )
  } ), setTimeout( function () {
    jQuery( ".color-picker" ).animate( {
      right: "-223px"
    }, "slow" )
  }, 4e3 );
  var a = "paletteoriginal";
  $( "body" ).addClass( a ), $( ".picker-original" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "paletteoriginal" ), a = "paletteoriginal"
  } ), $( ".picker-yellow" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "paletteyellow" ), a = "paletteyellow"
  } ), $( ".picker-lightblue" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettelightblue" ), a = "palettelightblue"
  } ), $( ".picker-purple" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettepurple" ), a = "palettepurple"
  } ), $( ".picker-green" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettegreen" ), a = "palettegreen"
  } ), $( ".picker-militar" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettemilitar" ), a = "palettemilitar"
  } ), $( ".picker-caqui" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettecaqui" ), a = "palettecaqui"
  } ), $( ".picker-red" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettered" ), a = "palettered"
  } ), $( ".picker-gold" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettegold" ), a = "palettegold"
  } ), $( ".picker-darkturquoise" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettedarkturquoise" ), a = "palettedarkturquoise"
  } ), $( ".picker-lightyellow" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettelightyellow" ), a = "palettelightyellow"
  } ), $( ".picker-lightred" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettelightred" ), a = "palettelightred"
  } ), $( ".picker-malva" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettemalva" ), a = "palettemalva"
  } ), $( ".picker-silver" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettesilver" ), a = "palettesilver"
  } ), $( ".picker-lightgreen" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettelightgreen" ), a = "palettelightgreen"
  } ), $( ".picker-water" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettewater" ), a = "palettewater"
  } ), $( ".picker-pink" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "palettepink" ), a = "palettepink"
  } ), $( ".picker-electricred" ).click( function () {
    $( "body" ).removeClass( a ), $( "body" ).addClass( "paletteelectricred" ), a = "paletteelectricred"
  } ), $( ".dark-version" ).click( function () {
    $( "body" ).addClass( "darker" )
  } ), $( ".light-version" ).click( function () {
    $( "body" ).removeClass( "darker" )
  } )
} );
