;
( function ( $ ) {
  "use strict"


  var nav_offset_top = $( 'header' ).height() + 50;
  /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

  //* Navbar Fixed  
  function navbarFixed() {
    if ( $( '.header_area' ).length ) {
      $( window ).scroll( function () {
        var scroll = $( window ).scrollTop();
        if ( scroll >= nav_offset_top ) {
          $( ".header_area" ).addClass( "navbar_fixed" );
        } else {
          $( ".header_area" ).removeClass( "navbar_fixed" );
        }
      } );
    };
  };
  navbarFixed();

  // Search Toggle
  $( "#search_input_box" ).hide();
  $( "#search" ).on( "click", function () {
    $( "#search_input_box" ).slideToggle( 'slow' );
    $( "#search_input" ).focus();
  } );
  $( "#close_search" ).on( "click", function () {
    $( '#search_input_box' ).slideUp( 'slow' );
  } );


  /*----------------------------------------------------*/
  /*  Clients Slider
  /*----------------------------------------------------*/
  function active_testimonial() {
    if ( $( '.active_testimonial' ).length ) {
      $( '.active_testimonial' ).owlCarousel( {
        loop: true,
        margin: 0,
        items: 1,
        nav: false,
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        thumbs: true,
        thumbsPrerendered: true,
      } )
    }
  }
  active_testimonial();


  /*----------------------------------------------------*/
  /*  MailChimp Slider
  /*----------------------------------------------------*/
  function mailChimp() {
    $( '#mc_embed_signup' ).find( 'form' ).ajaxChimp();
  }
  mailChimp();

  $( 'select' ).niceSelect();

  /*----------------------------------------------------*/
  /*  Simple Counter js
  /*----------------------------------------------------*/
  $( '.counter' ).counterUp( {
    delay: 10,
    time: 1000
  } );

  /*----------------------------------------------------*/
  /*  Google map js
  /*----------------------------------------------------*/

  if ( $( '#mapBox' ).length ) {
    var $lat = $( '#mapBox' ).data( 'lat' );
    var $lon = $( '#mapBox' ).data( 'lon' );
    var $zoom = $( '#mapBox' ).data( 'zoom' );
    var $marker = $( '#mapBox' ).data( 'marker' );
    var $info = $( '#mapBox' ).data( 'info' );
    var $markerLat = $( '#mapBox' ).data( 'mlat' );
    var $markerLon = $( '#mapBox' ).data( 'mlon' );
    var map = new GMaps( {
      el: '#mapBox',
      lat: $lat,
      lng: $lon,
      scrollwheel: false,
      scaleControl: true,
      streetViewControl: false,
      panControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoom: $zoom,
      styles: [ {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [ {
            "color": "#dcdfe6"
          } ]
        },
        {
          "featureType": "transit",
          "stylers": [ {
              "color": "#808080"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [ {
              "visibility": "on"
            },
            {
              "color": "#dcdfe6"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [ {
            "color": "#ffffff"
          } ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [ {
              "visibility": "on"
            },
            {
              "color": "#ffffff"
            },
            {
              "weight": 1.8
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [ {
            "color": "#d7d7d7"
          } ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [ {
              "visibility": "on"
            },
            {
              "color": "#ebebeb"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [ {
            "color": "#a7a7a7"
          } ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [ {
            "color": "#ffffff"
          } ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [ {
            "color": "#ffffff"
          } ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [ {
              "visibility": "on"
            },
            {
              "color": "#efefef"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [ {
            "color": "#696969"
          } ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [ {
              "visibility": "on"
            },
            {
              "color": "#737373"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [ {
            "visibility": "off"
          } ]
        },
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [ {
            "visibility": "off"
          } ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [ {
            "color": "#d6d6d6"
          } ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [ {
            "visibility": "off"
          } ]
        },
        {},
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [ {
            "color": "#dadada"
          } ]
        }
      ]
    } );
  }

  /*----------------------------------------------------*/
  /*  Google map js
  /*----------------------------------------------------*/

  if ( $( '#mapBox2' ).length ) {
    var $lat = $( '#mapBox2' ).data( 'lat' );
    var $lon = $( '#mapBox2' ).data( 'lon' );
    var $zoom = $( '#mapBox2' ).data( 'zoom' );
    var $marker = $( '#mapBox2' ).data( 'marker' );
    var $info = $( '#mapBox2' ).data( 'info' );
    var $markerLat = $( '#mapBox2' ).data( 'mlat' );
    var $markerLon = $( '#mapBox2' ).data( 'mlon' );
    var map = new GMaps( {
      el: '#mapBox2',
      lat: $lat,
      lng: $lon,
      scrollwheel: false,
      scaleControl: true,
      streetViewControl: false,
      panControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoom: $zoom,
      styles: [ {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [ {
            "visibility": "simplified"
          },
          {
            "hue": "#ff0000"
          }
        ]
      } ]
    } );
  }


} )( jQuery )
