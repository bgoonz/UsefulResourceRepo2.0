function init() {
  loadTopMenu(), loadFooter(), loadTrending(), aboutme()
}
var top_menus, foot_menus, eleContent = document.getElementById( "content" );

function loadTopMenu() {
  var e = document.getElementById( "nav" );
  top_menus = [ '<a href="https://www.encodedna.com/about/">About Me</a>', '<a href="mailto:arunbanik21@rediffmail.com">Contact</a>', '<a href="https://www.encodedna.com/advertise-on-encodedna/default.htm">Advertise</a>', '<a href="https://www.encodedna.com/onlinetools/resize-crop-image-online.aspx"><span style="color:#1464F4;font-weight:bold;border-bottom:1px solid #f47512;">New </span> improved Image resizer</a>' ];
  for ( var t = 0; t <= top_menus.length - 1; t++ ) {
    ( u = document.createElement( "li" ) ).innerHTML = top_menus[ t ], e.appendChild( u )
  }
  var n = [ {
      lnk: "https://www.encodedna.com/category/ajax/",
      value: "Ajax"
    }, {
      lnk: "https://www.encodedna.com/category/angularjs/",
      value: "Angular"
    }, {
      lnk: "https://www.encodedna.com/category/aspnet/",
      value: "Asp.Net"
    }, {
      lnk: "https://www.encodedna.com/category/autocomplete/",
      value: "AutoComplete"
    }, {
      lnk: "https://www.encodedna.com/category/bootstrap/",
      value: "Bootstrap"
    }, {
      lnk: "https://www.encodedna.com/category/browser/",
      value: "Browser"
    }, {
      lnk: "https://www.encodedna.com/category/charts/",
      value: "Charts"
    }, {
      lnk: "https://www.encodedna.com/category/crystalreport/",
      value: "Crystal Report"
    }, {
      lnk: "https://www.encodedna.com/category/css/",
      value: "Css"
    }, {
      lnk: "https://www.encodedna.com/category/datepicker/",
      value: "DatePicker"
    }, {
      lnk: "https://www.encodedna.com/category/desktop/",
      value: "Desktop"
    }, {
      lnk: "https://www.encodedna.com/category/googlecharts/",
      value: "Google Chart"
    }, {
      lnk: "https://www.encodedna.com/category/googlemaps/",
      value: "Google Map"
    }, {
      lnk: "https://www.encodedna.com/category/google/",
      value: "Google Tutorial"
    }, {
      lnk: "https://www.encodedna.com/category/gridview/",
      value: "GridView"
    }, {
      lnk: "https://www.encodedna.com/category/html5/",
      value: "HTML5"
    }, {
      lnk: "https://www.encodedna.com/category/javascript/",
      value: "JavaScript"
    }, {
      lnk: "https://www.encodedna.com/category/jquery/",
      value: "jQuery"
    }, {
      lnk: "https://www.encodedna.com/category/json/",
      value: "JSON"
    }, {
      lnk: "https://www.encodedna.com/category/linq/",
      value: "Linq"
    }, {
      lnk: "https://www.encodedna.com/category/menu/",
      value: "Menus"
    }, {
      lnk: "https://www.encodedna.com/category/msexcel/",
      value: "Ms-Excel"
    }, {
      lnk: "https://www.encodedna.com/category/plugin/",
      value: "Plug-in"
    }, {
      lnk: "https://www.encodedna.com/category/responsive/",
      value: "Responsive"
    }, {
      lnk: "https://www.encodedna.com/reviews/",
      value: "Reviews"
    }, {
      lnk: "https://www.encodedna.com/category/sendemail/",
      value: "Send Email"
    }, {
      lnk: "https://www.encodedna.com/category/smartphone/",
      value: "Smartphone"
    }, {
      lnk: "https://www.encodedna.com/category/sqlbulkcopy/",
      value: "SqlBulkCopy"
    }, {
      lnk: "https://www.encodedna.com/category/sqldatasource/",
      value: "SqlDataSource"
    }, {
      lnk: "https://www.encodedna.com/category/sqlserver/",
      value: "SQL Server"
    }, {
      lnk: "https://www.encodedna.com/category/vba/",
      value: "VBA"
    }, {
      lnk: "https://www.encodedna.com/category/wcf/",
      value: "WCF"
    }, {
      lnk: "https://www.encodedna.com/category/webapi/",
      value: "Web API"
    }, {
      lnk: "https://www.encodedna.com/category/webservice/",
      value: "Web Service"
    }, {
      lnk: "https://www.encodedna.com/category/xml/",
      value: "XML"
    } ],
    a = document.createElement( "select" );
  a.innerHTML = '<option value="">Categories</option>';
  for ( t = 0; t <= n.length - 1; t++ ) a.innerHTML = a.innerHTML + '<option value="' + n[ t ].lnk + '">' + n[ t ].value + "</option>";
  var o = eleContent.getElementsByClassName( "header" )[ 0 ],
    l = document.getElementById( "content" );
  null != o ? ( a.setAttribute( "class", "sharelist" ), o.appendChild( a ) ) : ( a.setAttribute( "class", "select_categories" ), l.childNodes.item( 1 ).appendChild( a ) );
  var d = document.getElementById( "header" ),
    r = new Image;
  r.src = "images/search.png", r.id = "searchicon", r.alt = "search";
  var i = document.createElement( "div" );
  i.id = "iconContainer", i.appendChild( r ), d.appendChild( i );
  var c = document.createElement( "h2" );
  c.innerHTML = "Web Development Blog by Arun Banik", d.childNodes.item( 1 ).appendChild( c );
  var s = new Image;
  s.src = "images/close.png", s.id = "closeicon";
  var p = document.createElement( "div" );
  p.id = "closeIconContainer", p.appendChild( s );
  var h = document.createElement( "div" );
  h.innerHTML = '<br /><br /><h3 style="font-size:15px;color:#3d3d3d;border-bottom:solid 1px #f47512;width:50%;padding-bottom:5px;text-align:left;">Popular searches</h3>';
  var m = [ '<a onclick=window.open("https://www.encodedna.com/search-results/?q=array+in+javascript");>array in javascript</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=get+file+extension");>get file extension</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=angular+read+json+data");>angular read json data</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=ternary+operator+in+js");>ternary operator in js</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=asp.net+examples");>asp.net examples</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=macro+in+excel");>marcro in excel</a>', '<a onclick=window.open("https://www.encodedna.com/search-results/?q=jquery+methods");>jquery methods</a>' ];
  for ( t = 0; t <= m.length - 1; t++ ) {
    var u;
    ( u = document.createElement( "li" ) ).innerHTML = m[ t ], h.appendChild( u )
  }
  p.appendChild( h );
  var g = new Image;
  g.src = "images/encodedna.png", g.id = "edLogo";
  var y = document.createElement( "div" );
  y.id = "logoContainer", y.appendChild( g );
  var E = document.createElement( "h3" );
  E.innerHTML = "Search the blog", E.id = "searchheading";
  var v = document.getElementById( "search_container" );
  v.prepend( E ), v.appendChild( p ), v.appendChild( h ), v.appendChild( y );
  var f = document.createElement( "div" );
  f.innerHTML = '<a href="https://www.encodedna.com/javascript/practice-ground/default.htm" class="jseditor">Online JavaScript Editor</a>', f.id = "top_edEditor", d.appendChild( f )
}
var trendingList, trendContainer, eleSideBar = eleContent.getElementsByClassName( "sidebar" )[ 0 ];

function aboutme() {
  if ( null != eleSideBar ) {
    var e = document.createElement( "div" );
    e.id = "aboutme", e.setAttribute( "class", "about" );
    var t = document.createElement( "h3" );
    t.innerHTML = "About Me", t.id = "trendingHeader", t.setAttribute( "style", "padding:20px 0;border:none;" ), e.appendChild( t );
    var n = document.createElement( "div" );
    n.setAttribute( "style", "text-align:center;" );
    var a = document.createElement( "img" );
    a.src = "images/circle-small-sharp.png", a.setAttribute( "style", "width:167px;height:167px;" ), a.alt = "Arun Banik @encodedna.com", n.appendChild( a );
    var o = document.createElement( "div" );
    o.innerHTML = '<p>Hello! My name is Arun Banik. Welcome to my blog. I am a web developer and an entrepreneur.</p><p>Read more about <a href="https://www.encodedna.com/about/">me and my journey as a Blogger.</a></p>', o.innerHTML = o.innerHTML + '<p>You can contact me <a href="mailto:arunbanik21@rediffmail.com">here</a>. :-)</p>', o.innerHTML = o.innerHTML + '<p>And, you can also find me on <a href="https://in.linkedin.com/pub/arun-banik/b0/aa6/b46">LinkedIn</a>. So, lets connect.</p>', e.appendChild( n ), e.appendChild( o ), eleSideBar.childNodes.item( 1 ).appendChild( e )
  }
}

function loadTrending() {
  if ( null != eleSideBar ) {
    if ( "Tools you can use" === eleSideBar.childNodes.item( 3 ).innerHTML )
      for ( var e = eleSideBar.childNodes.item( 4 ).nextSibling.getElementsByTagName( "li" ).length, t = eleSideBar.childNodes.item( 4 ).nextSibling.getElementsByTagName( "li" ), n = [ "&#9874;", "&#9986;", "&lt/>", "&#9986;", "%", "🎨" ], a = 0; a <= e - 1; a++ ) {
        var o = t[ a ].getElementsByTagName( "a" ).item( 0 ).innerHTML;
        t[ a ].getElementsByTagName( "a" ).item( 0 ).innerHTML = '<span style="font-size:19px;color:red;width:50px;float:left;">' + n[ a ] + "</span><span>" + o + "<span>"
      }( trendContainer = document.createElement( "div" ) ).id = "trendContainer", trendContainer.setAttribute( "style", "border:solid 1px #f5f5f5;height:620px;padding:10px;background-color:#fbfcfd;margin-top:10px;" ), null != eleContent.getElementsByClassName( "tag" )[ 0 ] && "sql server" === eleContent.getElementsByClassName( "tag" )[ 0 ].childNodes[ 0 ].innerHTML ? loadSQLTutorial() : loadTrendingData();
    var l = document.createElement( "div" );
    l.id = "categories_sidebar";
    var d = document.createElement( "h3" );
    d.innerHTML = "Popular Categories", d.id = "categoryHeader", d.setAttribute( "style", "padding:20px 0;border:none;" ), l.appendChild( d );
    var r = document.createElement( "ul" );
    for ( n = [ '<a href="https://www.encodedna.com/category/javascript/default.aspx">JavaScript</a>', '<a href="https://www.encodedna.com/category/angularjs/default.aspx">Angular</a>', '<a href="https://www.encodedna.com/category/vba/default.aspx">Excel (VBA)</a>', '<a href="https://www.encodedna.com/category/google/default.aspx">Google Tutorial</a>', '<a href="https://www.encodedna.com/category/aspnet/default.aspx">Asp.Net</a>', '<a href="https://www.encodedna.com/category/jquery/default.aspx">jQuery</a>' ], a = 0; a <= n.length - 1; a++ ) {
      var i = document.createElement( "li" );
      i.setAttribute( "style", "clear:both;line-height:25px;" ), i.innerHTML = n[ a ], r.appendChild( i )
    }
    l.appendChild( r ), eleSideBar.childNodes.item( 5 ).appendChild( l )
  }
  nowFloatDIV()
}

function loadTrendingData() {
  var e = document.createElement( "h3" );
  e.innerHTML = "Now Trending", e.id = "trendingHeader", e.setAttribute( "style", "padding:20px 0;border:none;" ), trendContainer.appendChild( e ), eleSideBar.childNodes.item( 1 ).appendChild( trendContainer );
  var t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject( "Microsoft.XMLHTTP" );
  t.onreadystatechange = function () {
    4 == t.readyState && function ( e ) {
      trendingList = e.getElementsByTagName( "List" );
      for ( var t = 0; t < trendingList.length; t++ ) {
        var n = document.createElement( "div" );
        n.setAttribute( "style", "width:auto;display:flex;padding:3px 0;" );
        var a = document.createElement( "div" );
        a.setAttribute( "style", "flex: 0 0 20%;padding:8px 0 0 0;" );
        var o = document.createElement( "img" );
        o.src = trendingList[ t ].getElementsByTagName( "image" )[ 0 ].childNodes[ 0 ].nodeValue, o.alt = trendingList[ t ].getElementsByTagName( "alt" )[ 0 ].childNodes[ 0 ].nodeValue, a.appendChild( o );
        var l = document.createElement( "div" );
        l.setAttribute( "style", "width:78%;padding:0;" );
        var d = document.createElement( "h4" );
        d.setAttribute( "style", "margin:0;padding:7px 0;line-height:20px;height:auto;text-align:left;" );
        var r = document.createElement( "a" );
        r.innerHTML = trendingList[ t ].getElementsByTagName( "header" )[ 0 ].childNodes[ 0 ].nodeValue, r.href = trendingList[ t ].getElementsByTagName( "link" )[ 0 ].childNodes[ 0 ].nodeValue, r.setAttribute( "style", 'font-family: "Segoe UI", Calibri, Tahoma;   color: #17293C;    font-size: 15px; font-weight: normal;   text-decoration: none; text-transform: none; line-height: 12px;' ), d.appendChild( r );
        var i = document.createElement( "a" ),
          c = trendingList[ t ].getElementsByTagName( "category" )[ 0 ].childNodes[ 0 ].nodeValue;
        i.innerHTML = c, i.setAttribute( "style", 'clear:both; padding:0; margin: 3px 0 0 0; font-family: "Segoe UI", Calibri, Tahoma;   color: #000; font-size: 13px; font-weight: bold; text-decoration: none; float:left;' ), i.href = "https://www.encodedna.com/category/" + c.replace( " ", "" ).toLowerCase() + "/", l.appendChild( d ), l.appendChild( i ), n.appendChild( a ), n.appendChild( l ), trendContainer.appendChild( n ), eleSideBar.childNodes.item( 1 ).appendChild( trendContainer )
      }
    }( this.responseXML )
  }, t.open( "GET", "https://www.encodedna.com/library/trending.xml", !0 ), t.send()
}

function loadSQLTutorial() {
  var e = document.createElement( "h3" );
  e.innerHTML = "SQL Server Tutorial", e.id = "trendingHeader", e.setAttribute( "style", "padding:20px 0;border:none;" ), trendContainer.appendChild( e ), eleSideBar.childNodes.item( 1 ).appendChild( trendContainer );
  var t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject( "Microsoft.XMLHTTP" );
  t.onreadystatechange = function () {
    4 == t.readyState && function ( e ) {
      trendingList = e.getElementsByTagName( "sql" );
      var t = document.createElement( "ul" ),
        n = document.createElement( "div" );
      n.setAttribute( "style", "width:auto;display:flex;padding:3px 0;" );
      for ( var a = 0; a < trendingList.length; a++ ) {
        var o = document.createElement( "li" );
        o.setAttribute( "style", "clear:both;line-height:26px;" ), o.innerHTML = '<a href="' + trendingList[ a ].getElementsByTagName( "link" )[ 0 ].childNodes[ 0 ].nodeValue + '">' + trendingList[ a ].getElementsByTagName( "header" )[ 0 ].childNodes[ 0 ].nodeValue, t.appendChild( o ), n.appendChild( t ), trendContainer.appendChild( n ), eleSideBar.childNodes.item( 1 ).appendChild( trendContainer )
      }
      trendContainer.setAttribute( "style", "border:solid 1px #f47512;height:620px;padding:10px;background-color:#fbfcfd;margin-top:10px;" )
    }( this.responseXML )
  }, t.open( "GET", "https://www.encodedna.com/library/sql_tutorials.xml", !0 ), t.send()
}

function nowFloatDIV() {
  var e = document.getElementById( "flDiv" );
  if ( null !== e ) {
    var t = e.offsetTop + 730,
      n = e.clientHeight - 10,
      a = document.getElementById( "site_footer" );
    if ( t + n > a.offsetTop ) return e.setAttribute( "style", "display:none;" ), !1;
    e.setAttribute( "style", "display:block;" ), window.addEventListener( "scroll", function () {
      document.documentElement.scrollTop + n > a.offsetTop && ( e.setAttribute( "style", "position:absolute;top:auto;padding:0;clear:both;border:none;" ), a.setAttribute( "style", "position:relative;top:0%;" ) );
      parseInt( document.documentElement.scrollTop ) >= parseInt( t ) ? ( e.setAttribute( "style", "position:fixed;top:75px;padding:5px 0 20px 0;clear:both;border:none;" ), document.documentElement.scrollTop + n > a.offsetTop && e.setAttribute( "style", "position:absolute;top:auto;padding:5px 0 20px 0;clear:both;border:none;" ) ) : e.setAttribute( "style", "position:absolute;top:auto;padding:5px 0 20px 0;clear:both;border:none;" )
    } )
  }
}

function justIn() {
  var e = document.getElementById( "content" ),
    t = document.createElement( "div" ),
    n = document.createElement( "div" );
  n.innerHTML = '<div><img src="images/close.png" width="16px" height="16px" style="cursor:pointer;color:#fff;background-color:#fff;border:solid 1px #000;border-radius:10px;padding:1px;margin:0 8px 0;float:right;" onclick="closeJI()" /></div> <div style="padding-bottom:5px;font-weight:bold;">Just In</div><div><a href="https://www.encodedna.com/excel/insert-object-in-outlook-and-display-as-icon-in-excel-using-vba.htm">How to insert an Object in Outlook created from file and "Display as Icon" from Excel using VBA</a></div><div style="padding:10px 0 0 0;"><a href="#nav-recentpost" style="color:#ff8;">See all recent posts</a></div>', t.appendChild( n ), t.id = "justin", t.setAttribute( "class", "justin" ), e.appendChild( t )
}

function closeJI() {
  document.getElementById( "justin" ).style.display = "none"
}

function loadFooter() {
  for ( var e = document.getElementById( "footer" ), t = [ '<a href="https://www.encodedna.com/about/default.htm">About Me</a>', '<a href="mailto:arunbanik21@rediffmail.com">Contact Me</a>', '<a href="https://www.encodedna.com/about/privacy-policy/default.htm">Privacy Policy</a>', '<a href="https://www.encodedna.com/advertise-on-encodedna/default.htm">Advertise</a>' ], n = 0; n <= t.length - 1; n++ ) {
    ( r = document.createElement( "li" ) ).innerHTML = t[ n ], e.appendChild( r )
  }
  var a = document.createElement( "div" );
  a.innerHTML = "Copyright &copy 2021 Encodedna.com, all rights reserved.", a.setAttribute( "style", "float:right;color:#3e3e3e;padding:10px 0;color:#000;" ), e.appendChild( a );
  var o = document.getElementById( "site_footer" ),
    l = document.createElement( "div" );
  l.setAttribute( "class", "container" );
  var d = document.createElement( "ul" );
  d.id = "footUl", foot_menus = [ '<a href="https://www.encodedna.com/">Home</a>', '<a href="https://www.encodedna.com/category/javascript/default.aspx">JavaScript</a>', '<a href="https://www.encodedna.com/category/angularjs/default.aspx">Angular</a>', '<a href="https://www.encodedna.com/category/vba/default.aspx">VBA</a>', '<a href="https://www.encodedna.com/category/aspnet/default.aspx">Asp.Net</a>', '<a href="https://www.encodedna.com/resize-bulk-images/default.htm">Bulk Image Resizer</a>' ];
  for ( n = 0; n <= foot_menus.length - 1; n++ ) {
    var r;
    ( r = document.createElement( "li" ) ).innerHTML = foot_menus[ n ], d.appendChild( r )
  }
  l.appendChild( d ), o.appendChild( l );
  var i = [ '<a href="https://twitter.com/theEncodeDna"><img src="images/theme/twitter.png" alt="" /></a>', '<a href="https://in.linkedin.com/pub/arun-banik/b0/aa6/b46"><img src="images/theme/linked-in.png" alt="" /></a>' ],
    c = document.createElement( "div" );
  c.setAttribute( "class", "container" );
  var s = document.createElement( "ul" );
  s.id = "social_ul";
  var p = document.createElement( "li" );
  p.innerHTML = "Connect with me &#8594;", p.setAttribute( "style", "padding:10px 10px 0;margin:0;" ), s.appendChild( p );
  for ( n = 0; n <= i.length - 1; n++ ) {
    var h = document.createElement( "li" );
    h.innerHTML = i[ n ], s.appendChild( h )
  }
  c.appendChild( s ), o.appendChild( c )
}

function showImg( e ) {
  var t = new Image;
  t.src = e.src;
  var n = document.getElementById( "divimg" );
  n.innerHTML = "", n.appendChild( t ), document.getElementById( "revimg" ).style.display = "block"
}
window.addEventListener( "resize", function ( e ) {
  screen.width >= 900 ? ( document.getElementById( "nav" ).style.display = "block", document.getElementById( "close" ).style.display = "none", document.getElementsByClassName( "show-menu" )[ 0 ].style.display = "none" ) : ( document.getElementById( "nav" ).style.display = "none", document.getElementById( "close" ).style.display = "none", document.getElementsByClassName( "show-menu" )[ 0 ].style.display = "block" )
} ), window.addEventListener( "change", function ( e ) {
  "select_categories" !== e.target.className && "sharelist" !== e.target.className || e.target.value && ( window.location.href = e.target.value )
} ), window.addEventListener( "click", function ( e ) {
  document.getElementById( "show-menu" ).contains( e.target ) ? ( document.getElementsByClassName( "show-menu" )[ 0 ].style.display = "none", document.getElementById( "close" ).style.display = "block", document.getElementById( "nav" ).style.display = "block" ) : screen.width <= 900 && "dropbtn" !== e.target.className && ( document.getElementById( "nav" ).style.display = "none", document.getElementById( "close" ).style.display = "none", document.getElementsByClassName( "show-menu" )[ 0 ].style.display = "block" ), "dropbtn" == e.target.className && ( "" == document.getElementsByClassName( "dropdown-content" )[ 0 ].style.display || "none" == document.getElementsByClassName( "dropdown-content" )[ 0 ].style.display ? document.getElementsByClassName( "dropdown-content" )[ 0 ].style.display = "block" : document.getElementsByClassName( "dropdown-content" )[ 0 ].style.display = "none" ), document.getElementById( "searchicon" ).contains( e.target ) && ( document.getElementById( "search_container" ).style.display = "block", document.getElementById( "searchicon" ).style.display = "none", document.getElementById( "top_edEditor" ).style.display = "none" ), document.getElementById( "closeicon" ).contains( e.target ) && ( document.getElementById( "search_container" ).style.display = "none", document.getElementById( "searchicon" ).style.display = "block", document.getElementById( "top_edEditor" ).style.display = "block" ), "bt_show_tip" === e.target.id && ( document.getElementById( "tips_n_tricks" ).style.display = "block", document.getElementById( "bt_show_tip" ).style.display = "none" ), "close_tip" === e.target.id && ( document.getElementById( "tips_n_tricks" ).style.display = "none", document.getElementById( "bt_show_tip" ).style.display = "block" )
} );
