function open( a ) {
  $.ajax( {
    url: a,
    success: function ( a ) {
      $( ".project-content" ).html( a ), $( ".project-content" ).hide( 0 ), $( ".project-window" ).hide( 0 ), close(), $( "html, body" ).animate( {
        scrollTop: $( "#project-show" ).offset().top - 200
      }, 300, function () {
        $( ".project-window" ).show( 0 ), $( ".project-window" ).css( "height", "0" );
        var a = $( ".project-content" ).height();
        $( ".project-window" ).animate( {
          height: a
        }, 500, function () {
          $( ".project-window" ).css( "height", a ), $( ".project-content" ).fadeIn( "slow" )
        } )
      } )
    }
  } )
}

function close() {
  $( ".close-btn" ).click( function () {
    $( ".project-window" ).slideUp( "slow" ), $( ".project-content" ).fadeOut( "slow" ), $( "html, body" ).animate( {
      scrollTop: $( "#discography" ).offset().top - 50
    }, 1e3 ), opened = !1
  } )
}

function opennew( a ) {
  $.ajax( {
    url: a.data( "url" ),
    success: function ( b ) {
      $( ".news-content" ).html( b ), $( ".news-content" ).hide( 0 ), $( ".news-window" ).hide( 0 ), closenew( a ), $( a ).parent().next( ".news-window" ).show( 0 ), $( a ).parent().next( ".news-window" ).css( "height", "0" );
      var c = $( ".news-content" ).height();
      $( a ).parent().next( ".news-window" ).animate( {
        height: c
      }, 500, function () {
        $( a ).parent().next( ".news-window" ).css( "height", "auto" ), $( ".news-content" ).fadeIn( "slow" )
      } )
    }
  } )
}

function closenew( a ) {
  $( ".close-new" ).click( function () {
    $( a ).parent().next( ".news-window" ).slideUp( "slow" ), $( a ).prev( ".news-window" ).slideUp( "slow" ), $( ".news-content" ).fadeOut( "slow" ), $( a ).parent().removeClass( "open" ), openednew = !1
  } )
}
var $actual = null,
  opened = !1;
$( ".open-disc" ).click( function () {
  open( $( this ).data( "url" ) ), $actual = $( this )
} ), $( document ).ajaxComplete( function ( a, b, c ) {
  if ( 0 === c.url.indexOf( "disc" ) ) {
    var d = $( "#playlist0" ),
      e = audiojs.create( d, {
        trackEnded: function () {
          var a = $( "ol.playlist0 li.playing" ).next();
          a.length || ( a = $( "ol.playlist0 li" ).first() ), a.addClass( "playing" ).siblings().removeClass( "playing" ), f.load( $( "a", a ).attr( "data-src" ) ), f.play()
        }
      } ),
      f = e[ 0 ];
    first = $( "ol.playlist0 a" ).attr( "data-src" ), $( "ol.playlist0 li" ).first().addClass( "pause" ), f.load( first ), $( "ol.playlist0 li" ).click( function ( a ) {
      a.preventDefault(), "playing" == $( this ).attr( "class" ) ? ( $( this ).addClass( "pause" ), f.playPause() ) : ( $( this ).removeClass( "pause" ).addClass( "playing" ).siblings().removeClass( "playing" ).removeClass( "pause" ), f.load( $( "a", this ).attr( "data-src" ) ), f.play() )
    } )
  }
} );
var $actualnew = null,
  openednew = !1;
$( ".open-new" ).click( function () {
  return opennew( $( this ) ), $actualnew = $( this ), $actualnew.parent().addClass( "open" ), !1
} ), $( window ).load( function () {
  $( ".loader" ).delay( 500 ).fadeOut(), $( "#mask" ).delay( 1e3 ).fadeOut( "slow" ), $( "body" ).addClass( "loaded" )
} ), $( function () {
  function a() {
    var a = audiojs.createAll( {
        trackEnded: function () {
          var a = $( "ol.playlist li.playing" ).next();
          a.length || ( a = $( "ol.playlist li" ).first() ), a.addClass( "playing" ).siblings().removeClass( "playing" ), b.load( $( "a", a ).attr( "data-src" ) ), b.play()
        }
      } ),
      b = a[ 0 ];
    first = $( "ol.playlist a" ).attr( "data-src" ), $( "ol.playlist li" ).first().addClass( "playing" ), b.load( first ), $( "ol.playlist li" ).click( function ( a ) {
      a.preventDefault(), $( this ).addClass( "playing" ).siblings().removeClass( "playing" ), b.load( $( "a", this ).attr( "data-src" ) ), b.play()
    } ), $( ".nextprev .next" ).click( function ( a ) {
      a.preventDefault();
      var b = $( "ol.playlist li.playing" ).next();
      b.length || ( b = $( "ol.playlist li" ).first() ), b.click()
    } ), $( ".nextprev .prev" ).click( function ( a ) {
      var b = $( "ol.playlist li.playing" ).prev();
      b.length || ( b = $( "ol.playlist li" ).last() ), b.click()
    } ), $( ".btnloop" ).click( function ( a ) {
      $( "audio" ).attr( "loop" ) ? ( $( "audio" ).removeAttr( "loop" ), $( this ).removeClass( "active" ) ) : ( $( "audio" ).attr( "loop", 0 ), $( this ).addClass( "active" ) )
    } )
  }
  $( ".player" ).length > 0 && a()
} ), $( "#DateCountdown" ).length > 0 && ( $( window ).resize( function () {
  $( "#DateCountdown" ).TimeCircles().rebuild()
} ), $( "#DateCountdown" ).TimeCircles( {
  animation: "smooth",
  bg_width: .5,
  fg_width: .023333333333333334,
  circle_bg_color: "#000000",
  time: {
    Days: {
      text: "Days",
      color: "#EB2B29",
      show: !0
    },
    Hours: {
      text: "Hours",
      color: "#EB2B29",
      show: !0
    },
    Minutes: {
      text: "Minutes",
      color: "#EB2B29",
      show: !0
    },
    Seconds: {
      text: "Seconds",
      color: "#EB2B29",
      show: !0
    }
  }
} ) ), $( document ).ready( function () {
  function a() {
    $( "#owl-main-text" ).owlCarousel( {
      autoPlay: 1e4,
      goToFirst: !0,
      goToFirstSpeed: 2e3,
      navigation: !1,
      slideSpeed: 700,
      pagination: !1,
      transitionStyle: "fadeUp",
      singleItem: !0
    } )
  }

  function b() {
    function a( a ) {
      for ( var b = a.length, c = 0, d = document.getElementById( "twitter-feed" ), e = '<ul class="slider-twitter">'; b > c; ) e += '<li class="gallery-cell">' + a[ c ] + "</li>", c++;
      e += "</ul>", d.innerHTML = e, $( ".slider-twitter" ).flickity( {
        cellAlign: "left",
        contain: !0,
        wrapAround: !0,
        prevNextButtons: !1
      } )
    }
    var b = {
      id: "702067549920485376",
      domId: "twitter-feed",
      maxTweets: 4,
      enableLinks: !0,
      showUser: !0,
      showTime: !0,
      dateFunction: "",
      showRetweet: !1,
      customCallback: a,
      showInteraction: !1
    };
    twitterFetcher.fetch( b )
  }
  $( "#slides" ).superslides( {
    hashchange: !1,
    animation: "fade",
    play: 1e4
  } ), $( "#owl-main-text" ).length > 0 && a(), $( ".twitterfeed" ).length > 0 && b();
  var c = $( ".jcarouselDates" ).flickity( {
    cellAlign: "left",
    wrapAround: !0,
    contain: !0,
    prevNextButtons: !1,
    pageDots: !1,
    draggable: !1
  } );
  $( ".button-group" ).on( "click", ".button", function () {
    var a = $( this ).index();
    c.flickity( "select", a ), $( this ).addClass( "active" ).siblings().removeClass( "active" )
  } ), $( ".swipebox" ).swipebox(), $( ".playerVideo" ).length > 0 && ( $( ".playerVideo" ).mb_YTPlayer(), jQuery( ".playerVideo" ).on( "YTPPause", function () {
    jQuery( ".play-video" ).removeClass( "playing" )
  } ), jQuery( ".playerVideo" ).on( "YTPPlay", function () {
    jQuery( ".play-video" ).addClass( "playing" )
  } ), jQuery( ".play-video" ).on( "click", function ( a ) {
    jQuery( ".play-video" ).hasClass( "playing" ) ? jQuery( ".playerVideo" ).pauseYTP() : ( jQuery( "audio" ).each( function ( a, b ) {
      this.pause()
    } ), jQuery( ".playerVideo" ).playYTP() ), a.preventDefault()
  } ) )
} ), $( window ).load( function () {
  var a = $( ".upevents" ).isotope( {
      itemSelector: ".upevent",
      masonry: {
        columnWidth: ".upevent"
      }
    } ),
    a = $( ".thumbnails" ).isotope( {
      itemSelector: ".thumbnail",
      masonry: {
        columnWidth: ".thumbnail.small"
      }
    } );
  $( ".filters" ).on( "click", "li", function () {
    var b = $( this ).attr( "data-filter" );
    a.isotope( {
      filter: b
    } )
  } ), $( ".filters" ).each( function ( a, b ) {
    var c = $( b );
    c.on( "click", "li", function () {
      c.find( ".is-checked" ).removeClass( "is-checked" ), $( this ).addClass( "is-checked" )
    } )
  } ), $( "#append" ).click( function () {
    return newItems = $( "#more-items" ).appendTo( ".thumbnails" ), $( ".thumbnails" ).isotope( "insert", newItems ), $( this ).hide(), !1
  } )
} ), jQuery().parallax && jQuery( ".parallax-section" ).parallax(), $( "a[href*=#]" ).click( function () {
  if ( location.pathname.replace( /^\//, "" ) === this.pathname.replace( /^\//, "" ) && location.hostname === this.hostname ) {
    var a = $( this.hash );
    if ( a = a.length && a || $( "[name=" + this.hash.slice( 1 ) + "]" ), a.length ) {
      var b = a.offset().top;
      return $( "html,body" ).animate( {
        scrollTop: b - 42
      }, 1e3 ), $( ".navbar-collapse.in" ).removeClass( "in" ).addClass( "collapse" ), !1
    }
  }
} ), $( function () {
  $( window ).bind( "scroll", function () {
    $( window ).scrollTop() >= 85 ? $( "#jHeader" ).addClass( "overflow" ) : $( "#jHeader" ).removeClass( "overflow" ), $( window ).scrollTop() >= $( ".jIntro" ).height() / 2 ? $( "#jHeader" ).addClass( "fixed" ) : $( "#jHeader" ).removeClass( "fixed" )
  } ), $( ".disc-tracklist" ).on( "click", function () {
    alert( "CLICK" )
  } )
} ), $( "#more-events" ).click( function () {
  return $( ".upcomming-events-list li.more" ).slideToggle( "slow" ), $( this ).hide(), !1
} );
