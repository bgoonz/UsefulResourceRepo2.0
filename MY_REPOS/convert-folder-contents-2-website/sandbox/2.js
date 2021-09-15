
    /* --- Tablesorter: http://tablesorter.com/ --- */
    /* Slightly modified for use with Snap2HTML: Removed trim to allow folders to sort at top. Replaced parseInt with parseFloat to fix sort problems with some file sizes */
    ( function ( $ ) {
      $.extend( {
        tablesorter: new
        function () {
          var parsers = [],
            widgets = [];
          this.defaults = {
            cssHeader: "header",
            cssAsc: "headerSortUp",
            cssDesc: "headerSortDown",
            cssChildRow: "expand-child",
            sortInitialOrder: "asc",
            sortMultiSortKey: "shiftKey",
            sortForce: null,
            sortAppend: null,
            sortLocaleCompare: true,
            textExtraction: "simple",
            parsers: {},
            widgets: [],
            widgetZebra: {
              css: [ "even", "odd" ]
            },
            headers: {},
            widthFixed: false,
            cancelSelection: true,
            sortList: [],
            headerList: [],
            dateFormat: "us",
            decimal: '/\.|\,/g',
            onRenderHeader: null,
            selectorHeaders: 'thead th',
            debug: false
          };

          function benchmark( s, d ) {
            log( s + "," + ( new Date().getTime() - d.getTime() ) + "ms" );
          }
          this.benchmark = benchmark;

          function log( s ) {
            if ( typeof console != "undefined" && typeof console.debug != "undefined" ) {
              console.log( s );
            } else {
              alert( s );
            }
          }

          function buildParserCache( table, $headers ) {
            if ( table.config.debug ) {
              var parsersDebug = "";
            }
            if ( table.tBodies.length == 0 ) return;
            var rows = table.tBodies[ 0 ].rows;
            if ( rows[ 0 ] ) {
              var list = [],
                cells = rows[ 0 ].cells,
                l = cells.length;
              for ( var i = 0; i < l; i++ ) {
                var p = false;
                if ( $.metadata && ( $( $headers[ i ] ).metadata() && $( $headers[ i ] ).metadata().sorter ) ) {
                  p = getParserById( $( $headers[ i ] ).metadata().sorter );
                } else if ( ( table.config.headers[ i ] && table.config.headers[ i ].sorter ) ) {
                  p = getParserById( table.config.headers[ i ].sorter );
                }
                if ( !p ) {
                  p = detectParserForColumn( table, rows, -1, i );
                }
                if ( table.config.debug ) {
                  parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                }
                list.push( p );
              }
            }
            if ( table.config.debug ) {
              log( parsersDebug );
            }
            return list;
          };

          function detectParserForColumn( table, rows, rowIndex, cellIndex ) {
            var l = parsers.length,
              node = false,
              nodeValue = false,
              keepLooking = true;
            while ( nodeValue == '' && keepLooking ) {
              rowIndex++;
              if ( rows[ rowIndex ] ) {
                node = getNodeFromRowAndCellIndex( rows, rowIndex, cellIndex );
                nodeValue = trimAndGetNodeText( table.config, node );
                if ( table.config.debug ) {
                  log( 'Checking if value was empty on row:' + rowIndex );
                }
              } else {
                keepLooking = false;
              }
            }
            for ( var i = 1; i < l; i++ ) {
              if ( parsers[ i ].is( nodeValue, table, node ) ) {
                return parsers[ i ];
              }
            }
            return parsers[ 0 ];
          }

          function getNodeFromRowAndCellIndex( rows, rowIndex, cellIndex ) {
            return rows[ rowIndex ].cells[ cellIndex ];
          }

          function trimAndGetNodeText( config, node ) {
            return $.trim( getElementText( config, node ) );
          }

          function getParserById( name ) {
            var l = parsers.length;
            for ( var i = 0; i < l; i++ ) {
              if ( parsers[ i ].id.toLowerCase() == name.toLowerCase() ) {
                return parsers[ i ];
              }
            }
            return false;
          }

          function buildCache( table ) {
            if ( table.config.debug ) {
              var cacheTime = new Date();
            }
            var totalRows = ( table.tBodies[ 0 ] && table.tBodies[ 0 ].rows.length ) || 0,
              totalCells = ( table.tBodies[ 0 ].rows[ 0 ] && table.tBodies[ 0 ].rows[ 0 ].cells.length ) || 0,
              parsers = table.config.parsers,
              cache = {
                row: [],
                normalized: []
              };
            for ( var i = 0; i < totalRows; ++i ) {
              var c = $( table.tBodies[ 0 ].rows[ i ] ),
                cols = [];
              if ( c.hasClass( table.config.cssChildRow ) ) {
                cache.row[ cache.row.length - 1 ] = cache.row[ cache.row.length - 1 ].add( c );
                continue;
              }
              cache.row.push( c );
              for ( var j = 0; j < totalCells; ++j ) {
                cols.push( parsers[ j ].format( getElementText( table.config, c[ 0 ].cells[ j ] ), table, c[ 0 ]
                  .cells[ j ] ) );
              }
              cols.push( cache.normalized.length );
              cache.normalized.push( cols );
              cols = null;
            };
            if ( table.config.debug ) {
              benchmark( "Building cache for " + totalRows + " rows:", cacheTime );
            }
            return cache;
          };

          function getElementText( config, node ) {
            var text = "";
            if ( !node ) return "";
            if ( !config.supportsTextContent ) config.supportsTextContent = node.textContent || false;
            if ( config.textExtraction == "simple" ) {
              if ( config.supportsTextContent ) {
                text = node.textContent;
              } else {
                if ( node.childNodes[ 0 ] && node.childNodes[ 0 ].hasChildNodes() ) {
                  text = node.childNodes[ 0 ].innerHTML;
                } else {
                  text = node.innerHTML;
                }
              }
            } else {
              if ( typeof ( config.textExtraction ) == "function" ) {
                text = config.textExtraction( node );
              } else {
                text = $( node ).text();
              }
            }
            return text;
          }

          function appendToTable( table, cache ) {
            if ( table.config.debug ) {
              var appendTime = new Date()
            }
            var c = cache,
              r = c.row,
              n = c.normalized,
              totalRows = n.length,
              checkCell = ( n[ 0 ].length - 1 ),
              tableBody = $( table.tBodies[ 0 ] ),
              rows = [];
            for ( var i = 0; i < totalRows; i++ ) {
              var pos = n[ i ][ checkCell ];
              rows.push( r[ pos ] );
              if ( !table.config.appender ) {
                var l = r[ pos ].length;
                for ( var j = 0; j < l; j++ ) {
                  tableBody[ 0 ].appendChild( r[ pos ][ j ] );
                }
              }
            }
            if ( table.config.appender ) {
              table.config.appender( table, rows );
            }
            rows = null;
            if ( table.config.debug ) {
              benchmark( "Rebuilt table:", appendTime );
            }
            applyWidget( table );
            setTimeout( function () {
              $( table ).trigger( "sortEnd" );
            }, 0 );
          };

          function buildHeaders( table ) {
            if ( table.config.debug ) {
              var time = new Date();
            }
            var meta = ( $.metadata ) ? true : false;
            var header_index = computeTableHeaderCellIndexes( table );
            $tableHeaders = $( table.config.selectorHeaders, table ).each( function ( index ) {
              this.column = header_index[ this.parentNode.rowIndex + "-" + this.cellIndex ];
              this.order = formatSortingOrder( table.config.sortInitialOrder );
              this.count = this.order;
              if ( checkHeaderMetadata( this ) || checkHeaderOptions( table, index ) ) this.sortDisabled =
                true;
              if ( checkHeaderOptionsSortingLocked( table, index ) ) this.order = this.lockedOrder =
                checkHeaderOptionsSortingLocked( table, index );
              if ( !this.sortDisabled ) {
                var $th = $( this ).addClass( table.config.cssHeader );
                if ( table.config.onRenderHeader ) table.config.onRenderHeader.apply( $th );
              }
              table.config.headerList[ index ] = this;
            } );
            if ( table.config.debug ) {
              benchmark( "Built headers:", time );
              log( $tableHeaders );
            }
            return $tableHeaders;
          };

          function computeTableHeaderCellIndexes( t ) {
            var matrix = [];
            var lookup = {};
            var thead = t.getElementsByTagName( 'THEAD' )[ 0 ];
            var trs = thead.getElementsByTagName( 'TR' );
            for ( var i = 0; i < trs.length; i++ ) {
              var cells = trs[ i ].cells;
              for ( var j = 0; j < cells.length; j++ ) {
                var c = cells[ j ];
                var rowIndex = c.parentNode.rowIndex;
                var cellId = rowIndex + "-" + c.cellIndex;
                var rowSpan = c.rowSpan || 1;
                var colSpan = c.colSpan || 1
                var firstAvailCol;
                if ( typeof ( matrix[ rowIndex ] ) == "undefined" ) {
                  matrix[ rowIndex ] = [];
                }
                for ( var k = 0; k < matrix[ rowIndex ].length + 1; k++ ) {
                  if ( typeof ( matrix[ rowIndex ][ k ] ) == "undefined" ) {
                    firstAvailCol = k;
                    break;
                  }
                }
                lookup[ cellId ] = firstAvailCol;
                for ( var k = rowIndex; k < rowIndex + rowSpan; k++ ) {
                  if ( typeof ( matrix[ k ] ) == "undefined" ) {
                    matrix[ k ] = [];
                  }
                  var matrixrow = matrix[ k ];
                  for ( var l = firstAvailCol; l < firstAvailCol + colSpan; l++ ) {
                    matrixrow[ l ] = "x";
                  }
                }
              }
            }
            return lookup;
          }

          function checkCellColSpan( table, rows, row ) {
            var arr = [],
              r = table.tHead.rows,
              c = r[ row ].cells;
            for ( var i = 0; i < c.length; i++ ) {
              var cell = c[ i ];
              if ( cell.colSpan > 1 ) {
                arr = arr.concat( checkCellColSpan( table, headerArr, row++ ) );
              } else {
                if ( table.tHead.length == 1 || ( cell.rowSpan > 1 || !r[ row + 1 ] ) ) {
                  arr.push( cell );
                }
              }
            }
            return arr;
          };

          function checkHeaderMetadata( cell ) {
            if ( ( $.metadata ) && ( $( cell ).metadata().sorter === false ) ) {
              return true;
            };
            return false;
          }

          function checkHeaderOptions( table, i ) {
            if ( ( table.config.headers[ i ] ) && ( table.config.headers[ i ].sorter === false ) ) {
              return true;
            };
            return false;
          }

          function checkHeaderOptionsSortingLocked( table, i ) {
            if ( ( table.config.headers[ i ] ) && ( table.config.headers[ i ].lockedOrder ) ) return table.config
              .headers[ i ].lockedOrder;
            return false;
          }

          function applyWidget( table ) {
            var c = table.config.widgets;
            var l = c.length;
            for ( var i = 0; i < l; i++ ) {
              getWidgetById( c[ i ] ).format( table );
            }
          }

          function getWidgetById( name ) {
            var l = widgets.length;
            for ( var i = 0; i < l; i++ ) {
              if ( widgets[ i ].id.toLowerCase() == name.toLowerCase() ) {
                return widgets[ i ];
              }
            }
          };

          function formatSortingOrder( v ) {
            if ( typeof ( v ) != "Number" ) {
              return ( v.toLowerCase() == "desc" ) ? 1 : 0;
            } else {
              return ( v == 1 ) ? 1 : 0;
            }
          }

          function isValueInArray( v, a ) {
            var l = a.length;
            for ( var i = 0; i < l; i++ ) {
              if ( a[ i ][ 0 ] == v ) {
                return true;
              }
            }
            return false;
          }

          function setHeadersCss( table, $headers, list, css ) {
            $headers.removeClass( css[ 0 ] ).removeClass( css[ 1 ] );
            var h = [];
            $headers.each( function ( offset ) {
              if ( !this.sortDisabled ) {
                h[ this.column ] = $( this );
              }
            } );
            var l = list.length;
            for ( var i = 0; i < l; i++ ) {
              h[ list[ i ][ 0 ] ].addClass( css[ list[ i ][ 1 ] ] );
            }
          }

          function fixColumnWidth( table, $headers ) {
            var c = table.config;
            if ( c.widthFixed ) {
              var colgroup = $( '<colgroup>' );
              $( "tr:first td", table.tBodies[ 0 ] ).each( function () {
                colgroup.append( $( '<col>' ).css( 'width', $( this ).width() ) );
              } );
              $( table ).prepend( colgroup );
            };
          }

          function updateHeaderSortCount( table, sortList ) {
            var c = table.config,
              l = sortList.length;
            for ( var i = 0; i < l; i++ ) {
              var s = sortList[ i ],
                o = c.headerList[ s[ 0 ] ];
              o.count = s[ 1 ];
              o.count++;
            }
          }

          function multisort( table, sortList, cache ) {
            if ( table.config.debug ) {
              var sortTime = new Date();
            }
            var dynamicExp = "var sortWrapper = function(a,b) {",
              l = sortList.length;
            for ( var i = 0; i < l; i++ ) {
              var c = sortList[ i ][ 0 ];
              var order = sortList[ i ][ 1 ];
              var s = ( table.config.parsers[ c ].type == "text" ) ? ( ( order == 0 ) ? makeSortFunction( "text",
                "asc", c ) : makeSortFunction( "text", "desc", c ) ) : ( ( order == 0 ) ? makeSortFunction(
                "numeric", "asc", c ) : makeSortFunction( "numeric", "desc", c ) );
              var e = "e" + i;
              dynamicExp += "var " + e + " = " + s;
              dynamicExp += "if(" + e + ") { return " + e + "; } ";
              dynamicExp += "else { ";
            }
            var orgOrderCol = cache.normalized[ 0 ].length - 1;
            dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
            for ( var i = 0; i < l; i++ ) {
              dynamicExp += "}; ";
            }
            dynamicExp += "return 0; ";
            dynamicExp += "}; ";
            if ( table.config.debug ) {
              benchmark( "Evaling expression:" + dynamicExp, new Date() );
            }
            eval( dynamicExp );
            cache.normalized.sort( sortWrapper );
            if ( table.config.debug ) {
              benchmark( "Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime );
            }
            return cache;
          };

          function makeSortFunction( type, direction, index ) {
            var a = "a[" + index + "]",
              b = "b[" + index + "]";
            if ( type == 'text' && direction == 'asc' ) {
              return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b +
                " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
            } else if ( type == 'text' && direction == 'desc' ) {
              return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b +
                " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
            } else if ( type == 'numeric' && direction == 'asc' ) {
              return "(" + a + " === null && " + b + " === null) ? 0 :(" + a +
                " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a +
                " - " + b + "));";
            } else if ( type == 'numeric' && direction == 'desc' ) {
              return "(" + a + " === null && " + b + " === null) ? 0 :(" + a +
                " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b +
                " - " + a + "));";
            }
          };

          function makeSortText( i ) {
            return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
          };

          function makeSortTextDesc( i ) {
            return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
          };

          function makeSortNumeric( i ) {
            return "a[" + i + "]-b[" + i + "];";
          };

          function makeSortNumericDesc( i ) {
            return "b[" + i + "]-a[" + i + "];";
          };

          function sortText( a, b ) {
            if ( table.config.sortLocaleCompare ) return a.localeCompare( b );
            return ( ( a < b ) ? -1 : ( ( a > b ) ? 1 : 0 ) );
          };

          function sortTextDesc( a, b ) {
            if ( table.config.sortLocaleCompare ) return b.localeCompare( a );
            return ( ( b < a ) ? -1 : ( ( b > a ) ? 1 : 0 ) );
          };

          function sortNumeric( a, b ) {
            return a - b;
          };

          function sortNumericDesc( a, b ) {
            return b - a;
          };

          function getCachedSortType( parsers, i ) {
            return parsers[ i ].type;
          };
          this.construct = function ( settings ) {
            return this.each( function () {
              if ( !this.tHead || !this.tBodies ) return;
              var $this, $document, $headers, cache, config, shiftDown = 0,
                sortOrder;
              this.config = {};
              config = $.extend( this.config, $.tablesorter.defaults, settings );
              $this = $( this );
              $.data( this, "tablesorter", config );
              $headers = buildHeaders( this );
              this.config.parsers = buildParserCache( this, $headers );
              cache = buildCache( this );
              var sortCSS = [ config.cssDesc, config.cssAsc ];
              fixColumnWidth( this );
              $headers.click( function ( e ) {
                var totalRows = ( $this[ 0 ].tBodies[ 0 ] && $this[ 0 ].tBodies[ 0 ].rows.length ) || 0;
                if ( !this.sortDisabled && totalRows > 0 ) {
                  $this.trigger( "sortStart" );
                  var $cell = $( this );
                  var i = this.column;
                  this.order = this.count++ % 2;
                  if ( this.lockedOrder ) this.order = this.lockedOrder;
                  if ( !e[ config.sortMultiSortKey ] ) {
                    config.sortList = [];
                    if ( config.sortForce != null ) {
                      var a = config.sortForce;
                      for ( var j = 0; j < a.length; j++ ) {
                        if ( a[ j ][ 0 ] != i ) {
                          config.sortList.push( a[ j ] );
                        }
                      }
                    }
                    config.sortList.push( [ i, this.order ] );
                  } else {
                    if ( isValueInArray( i, config.sortList ) ) {
                      for ( var j = 0; j < config.sortList.length; j++ ) {
                        var s = config.sortList[ j ],
                          o = config.headerList[ s[ 0 ] ];
                        if ( s[ 0 ] == i ) {
                          o.count = s[ 1 ];
                          o.count++;
                          s[ 1 ] = o.count % 2;
                        }
                      }
                    } else {
                      config.sortList.push( [ i, this.order ] );
                    }
                  };
                  setTimeout( function () {
                    setHeadersCss( $this[ 0 ], $headers, config.sortList, sortCSS );
                    appendToTable( $this[ 0 ], multisort( $this[ 0 ], config.sortList, cache ) );
                  }, 1 );
                  return false;
                }
              } ).mousedown( function () {
                if ( config.cancelSelection ) {
                  this.onselectstart = function () {
                    return false
                  };
                  return false;
                }
              } );
              $this.bind( "update", function () {
                var me = this;
                setTimeout( function () {
                  me.config.parsers = buildParserCache( me, $headers );
                  cache = buildCache( me );
                }, 1 );
              } ).bind( "updateCell", function ( e, cell ) {
                var config = this.config;
                var pos = [ ( cell.parentNode.rowIndex - 1 ), cell.cellIndex ];
                cache.normalized[ pos[ 0 ] ][ pos[ 1 ] ] = config.parsers[ pos[ 1 ] ].format(
                  getElementText( config, cell ), cell );
              } ).bind( "sorton", function ( e, list ) {
                $( this ).trigger( "sortStart" );
                config.sortList = list;
                var sortList = config.sortList;
                updateHeaderSortCount( this, sortList );
                setHeadersCss( this, $headers, sortList, sortCSS );
                appendToTable( this, multisort( this, sortList, cache ) );
              } ).bind( "appendCache", function () {
                appendToTable( this, cache );
              } ).bind( "applyWidgetId", function ( e, id ) {
                getWidgetById( id ).format( this );
              } ).bind( "applyWidgets", function () {
                applyWidget( this );
              } );
              if ( $.metadata && ( $( this ).metadata() && $( this ).metadata().sortlist ) ) {
                config.sortList = $( this ).metadata().sortlist;
              }
              if ( config.sortList.length > 0 ) {
                $this.trigger( "sorton", [ config.sortList ] );
              }
              applyWidget( this );
            } );
          };
          this.addParser = function ( parser ) {
            var l = parsers.length,
              a = true;
            for ( var i = 0; i < l; i++ ) {
              if ( parsers[ i ].id.toLowerCase() == parser.id.toLowerCase() ) {
                a = false;
              }
            }
            if ( a ) {
              parsers.push( parser );
            };
          };
          this.addWidget = function ( widget ) {
            widgets.push( widget );
          };
          this.formatFloat = function ( s ) {
            var i = parseFloat( s );
            return ( isNaN( i ) ) ? 0 : i;
          };
          this.formatInt = function ( s ) {
            var i = parseInt( s );
            return ( isNaN( i ) ) ? 0 : i;
          };
          this.isDigit = function ( s, config ) {
            return /^[-+]?\d*$/.test( $.trim( s.replace( /[,.']/g, '' ) ) );
          };
          this.clearTableBody = function ( table ) {
            if ( $.browser.msie ) {
              function empty() {
                while ( this.firstChild )
                  this.removeChild( this.firstChild );
              }
              empty.apply( table.tBodies[ 0 ] );
            } else {
              table.tBodies[ 0 ].innerHTML = "";
            }
          };
        }
      } );
      $.fn.extend( {
        tablesorter: $.tablesorter.construct
      } );
      var ts = $.tablesorter;
      ts.addParser( {
        id: "text",
        is: function ( s ) {
          return true;
        },
        format: function ( s ) {
          return s.toLocaleLowerCase();
        },
        type: "text"
      } );
      ts.addParser( {
        id: "digit",
        is: function ( s, table ) {
          var c = table.config;
          return $.tablesorter.isDigit( s, c );
        },
        format: function ( s ) {
          return $.tablesorter.formatFloat( s );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "ipAddress",
        is: function ( s ) {
          return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test( s );
        },
        format: function ( s ) {
          var a = s.split( "." ),
            r = "",
            l = a.length;
          for ( var i = 0; i < l; i++ ) {
            var item = a[ i ];
            if ( item.length == 2 ) {
              r += "0" + item;
            } else {
              r += item;
            }
          }
          return $.tablesorter.formatFloat( r );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "url",
        is: function ( s ) {
          return /^(https?|ftp|file):\/\/$/.test( s );
        },
        format: function ( s ) {
          return jQuery.trim( s.replace( new RegExp( /(https?|ftp|file):\/\// ), '' ) );
        },
        type: "text"
      } );
      ts.addParser( {
        id: "isoDate",
        is: function ( s ) {
          return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test( s );
        },
        format: function ( s ) {
          return $.tablesorter.formatFloat( ( s != "" ) ? new Date( s.replace( new RegExp( /-/g ), "/" ) )
            .getTime() : "0" );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "percent",
        is: function ( s ) {
          return /\%$/.test( $.trim( s ) );
        },
        format: function ( s ) {
          return $.tablesorter.formatFloat( s.replace( new RegExp( /%/g ), "" ) );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "usLongDate",
        is: function ( s ) {
          return s.match( new RegExp(
            /^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/
            ) );
        },
        format: function ( s ) {
          return $.tablesorter.formatFloat( new Date( s ).getTime() );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "shortDate",
        is: function ( s ) {
          return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test( s );
        },
        format: function ( s, table ) {
          var c = table.config;
          s = s.replace( /\-/g, "/" );
          if ( c.dateFormat == "us" ) {
            s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2" );
          } else if ( c.dateFormat == "uk" ) {
            s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1" );
          } else if ( c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy" ) {
            s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3" );
          }
          return $.tablesorter.formatFloat( new Date( s ).getTime() );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "time",
        is: function ( s ) {
          return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test( s );
        },
        format: function ( s ) {
          return $.tablesorter.formatFloat( new Date( "2000/01/01 " + s ).getTime() );
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "metadata",
        is: function ( s ) {
          return false;
        },
        format: function ( s, table, cell ) {
          var c = table.config,
            p = ( !c.parserMetadataName ) ? 'sortValue' : c.parserMetadataName;
          return $( cell ).metadata()[ p ];
        },
        type: "numeric"
      } );
      ts.addParser( {
        id: "filesize",
        is: function ( s ) {
          return /^.*(bytes|KB|MB|GB|TB)$/.test( s );
        },
        format: function ( s ) {
          if ( s.indexOf( "bytes" ) >= 0 ) return parseFloat( s );
          if ( s.indexOf( "KB" ) >= 0 ) return parseFloat( s ) * 1024;
          if ( s.indexOf( "MB" ) >= 0 ) return parseFloat( s ) * 1024 * 1024;
          if ( s.indexOf( "GB" ) >= 0 ) return parseFloat( s ) * 1024 * 1024 * 1024;
          if ( s.indexOf( "TB" ) >= 0 ) return parseFloat( s ) * 1024 * 1024 * 1024 * 1024;
        },
        type: "numeric"
      } );
      ts.addWidget( {
        id: "zebra",
        format: function ( table ) {
          if ( table.config.debug ) {
            var time = new Date();
          }
          var $tr, row = -1,
            odd;
          $( "tr:visible", table.tBodies[ 0 ] ).each( function ( i ) {
            $tr = $( this );
            if ( !$tr.hasClass( table.config.cssChildRow ) ) row++;
            odd = ( row % 2 == 0 );
            $tr.removeClass( table.config.widgetZebra.css[ odd ? 0 : 1 ] ).addClass( table.config
              .widgetZebra.css[ odd ? 1 : 0 ] )
          } );
          if ( table.config.debug ) {
            $.tablesorter.benchmark( "Applying Zebra widget", time );
          }
        }
      } );
    } )( jQuery );
  </script>

  <script type="text/javascript">
    /* --- Splitter: http://methvin.com/splitter/ --- */ ;
    ( function ( $ ) {
      $.fn.splitter = function ( args ) {
        args = args || {};
        return this.each( function () {
          var zombie;

          function startSplitMouse( evt ) {
            if ( opts.outline )
              zombie = zombie || bar.clone( false ).insertAfter( A );
            panes.css( "-webkit-user-select", "none" );
            bar.addClass( opts.activeClass );
            A._posSplit = A[ 0 ][ opts.pxSplit ] - evt[ opts.eventPos ];
            $( document ).bind( "mousemove", doSplitMouse ).bind( "mouseup", endSplitMouse );
          }

          function doSplitMouse( evt ) {
            var newPos = A._posSplit + evt[ opts.eventPos ];
            if ( opts.outline ) {
              newPos = Math.max( 0, Math.min( newPos, splitter._DA - bar._DA ) );
              bar.css( opts.origin, newPos );
            } else
              resplit( newPos );
          }

          function endSplitMouse( evt ) {
            bar.removeClass( opts.activeClass );
            var newPos = A._posSplit + evt[ opts.eventPos ];
            if ( opts.outline ) {
              zombie.remove();
              zombie = null;
              resplit( newPos );
            }
            panes.css( "-webkit-user-select", "text" );
            $( document ).unbind( "mousemove", doSplitMouse ).unbind( "mouseup", endSplitMouse );
          }

          function resplit( newPos ) {
            newPos = Math.max( A._min, splitter._DA - B._max, Math.min( newPos, A._max, splitter._DA - bar._DA -
              B._min ) );
            bar._DA = bar[ 0 ][ opts.pxSplit ];
            bar.css( opts.origin, newPos ).css( opts.fixed, splitter._DF );
            A.css( opts.origin, 0 ).css( opts.split, newPos ).css( opts.fixed, splitter._DF );
            B.css( opts.origin, newPos + bar._DA ).css( opts.split, splitter._DA - bar._DA - newPos ).css( opts
              .fixed, splitter._DF );
            if ( !$.browser.msie )
              panes.trigger( "resize" );
          }

          function dimSum( jq, dims ) {
            var sum = 0;
            for ( var i = 1; i < arguments.length; i++ )
              sum += Math.max( parseInt( jq.css( arguments[ i ] ) ) || 0, 0 );
            return sum;
          }
          var vh = ( args.splitHorizontal ? 'h' : args.splitVertical ? 'v' : args.type ) || 'v';
          var opts = $.extend( {
            activeClass: 'active',
            pxPerKey: 8,
            tabIndex: 0,
            accessKey: ''
          }, {
            v: {
              keyLeft: 39,
              keyRight: 37,
              cursor: "e-resize",
              splitbarClass: "vsplitbar",
              outlineClass: "voutline",
              type: 'v',
              eventPos: "pageX",
              origin: "left",
              split: "width",
              pxSplit: "offsetWidth",
              side1: "Left",
              side2: "Right",
              fixed: "height",
              pxFixed: "offsetHeight",
              side3: "Top",
              side4: "Bottom"
            },
            h: {
              keyTop: 40,
              keyBottom: 38,
              cursor: "n-resize",
              splitbarClass: "hsplitbar",
              outlineClass: "houtline",
              type: 'h',
              eventPos: "pageY",
              origin: "top",
              split: "height",
              pxSplit: "offsetHeight",
              side1: "Top",
              side2: "Bottom",
              fixed: "width",
              pxFixed: "offsetWidth",
              side3: "Left",
              side4: "Right"
            }
          } [ vh ], args );
          var splitter = $( this ).css( {
            position: "relative"
          } );
          var panes = $( ">*", splitter[ 0 ] ).css( {
            position: "absolute",
            "z-index": "1",
            "-moz-outline-style": "none"
          } );
          var A = $( panes[ 0 ] );
          var B = $( panes[ 1 ] );
          var focuser = $( '<a href="javascript:void(0)"></a>' ).attr( {
            accessKey: opts.accessKey,
            tabIndex: opts.tabIndex,
            title: opts.splitbarClass
          } ).bind( $.browser.opera ? "click" : "focus", function () {
            this.focus();
            bar.addClass( opts.activeClass )
          } ).bind( "keydown", function ( e ) {
            var key = e.which || e.keyCode;
            var dir = key == opts[ "key" + opts.side1 ] ? 1 : key == opts[ "key" + opts.side2 ] ? -1 : 0;
            if ( dir )
              resplit( A[ 0 ][ opts.pxSplit ] + dir * opts.pxPerKey, false );
          } ).bind( "blur", function () {
            bar.removeClass( opts.activeClass )
          } );
          var bar = $( panes[ 2 ] || '<div></div>' ).insertAfter( A ).css( "z-index", "100" ).append( focuser )
            .attr( {
              "class": opts.splitbarClass,
              unselectable: "on"
            } ).css( {
              position: "absolute",
              "user-select": "none",
              "-webkit-user-select": "none",
              "-khtml-user-select": "none",
              "-moz-user-select": "none"
            } ).bind( "mousedown", startSplitMouse );
          if ( /^(auto|default|)$/.test( bar.css( "cursor" ) ) )
            bar.css( "cursor", opts.cursor );
          bar._DA = bar[ 0 ][ opts.pxSplit ];
          splitter._PBF = $.boxModel ? dimSum( splitter, "border" + opts.side3 + "Width", "border" + opts
            .side4 + "Width" ) : 0;
          splitter._PBA = $.boxModel ? dimSum( splitter, "border" + opts.side1 + "Width", "border" + opts
            .side2 + "Width" ) : 0;
          A._pane = opts.side1;
          B._pane = opts.side2;
          $.each( [ A, B ], function () {
            this._min = opts[ "min" + this._pane ] || dimSum( this, "min-" + opts.split );
            this._max = opts[ "max" + this._pane ] || dimSum( this, "max-" + opts.split ) || 9999;
            this._init = opts[ "size" + this._pane ] === true ? parseInt( $.curCSS( this[ 0 ], opts
              .split ) ) : opts[ "size" + this._pane ];
          } );
          var initPos = A._init;
          if ( !isNaN( B._init ) )
            initPos = splitter[ 0 ][ opts.pxSplit ] - splitter._PBA - B._init - bar._DA;
          if ( opts.cookie ) {
            if ( !$.cookie )
              alert( 'jQuery.splitter(): jQuery cookie plugin required' );
            var ckpos = parseInt( $.cookie( opts.cookie ) );
            if ( !isNaN( ckpos ) )
              initPos = ckpos;
            $( window ).bind( "unload", function () {
              var state = String( bar.css( opts.origin ) );
              $.cookie( opts.cookie, state, {
                expires: opts.cookieExpires || 365,
                path: opts.cookiePath || document.location.pathname
              } );
            } );
          }
          if ( isNaN( initPos ) )
            initPos = Math.round( ( splitter[ 0 ][ opts.pxSplit ] - splitter._PBA - bar._DA ) / 2 );
          if ( opts.anchorToWindow ) {
            splitter._hadjust = dimSum( splitter, "borderTopWidth", "borderBottomWidth", "marginBottom" );
            splitter._hmin = Math.max( dimSum( splitter, "minHeight" ), 20 );
            $( window ).bind( "resize", function () {
              var top = splitter.offset().top;
              var wh = $( window ).height();
              splitter.css( "height", Math.max( wh - top - splitter._hadjust, splitter._hmin ) + "px" );
              if ( !$.browser.msie ) splitter.trigger( "resize" );
            } ).trigger( "resize" );
          } else if ( opts.resizeToWidth && !$.browser.msie )
            $( window ).bind( "resize", function () {
              splitter.trigger( "resize" );
            } );
          splitter.bind( "resize", function ( e, size ) {
            if ( e.target != this ) return;
            splitter._DF = splitter[ 0 ][ opts.pxFixed ] - splitter._PBF;
            splitter._DA = splitter[ 0 ][ opts.pxSplit ] - splitter._PBA;
            if ( splitter._DF <= 0 || splitter._DA <= 0 ) return;
            resplit( !isNaN( size ) ? size : ( !( opts.sizeRight || opts.sizeBottom ) ? A[ 0 ][ opts
              .pxSplit ] : splitter._DA - B[ 0 ][ opts.pxSplit ] - bar._DA ) );
          } ).trigger( "resize", [ initPos ] );
        } );
      };
    } )( jQuery );
  </script>

  <script type="text/javascript">
    /* --- jQuery UI v1.8.24:  https://github.com/jquery/jquery-ui --- */
    /* --- Used by DynaTree --- Only required modules included --- */
    /* jquery.ui.core.js */
    ( function ( a, b ) {
      function c( b, c ) {
        var e = b.nodeName.toLowerCase();
        if ( "area" === e ) {
          var f = b.parentNode,
            g = f.name,
            h;
          return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : ( h = a( "img[usemap=#" + g + "]" )[ 0 ],
            !!h && d( h ) )
        }
        return ( /input|select|textarea|button|object/.test( e ) ? !b.disabled : "a" == e ? b.href || c : c ) && d(
          b )
      }

      function d( b ) {
        return !a( b ).parents().andSelf().filter( function () {
          return a.curCSS( this, "visibility" ) === "hidden" || a.expr.filters.hidden( this )
        } ).length
      }
      a.ui = a.ui || {};
      if ( a.ui.version ) return;
      a.extend( a.ui, {
        version: "1.8.24",
        keyCode: {
          ALT: 18,
          BACKSPACE: 8,
          CAPS_LOCK: 20,
          COMMA: 188,
          COMMAND: 91,
          COMMAND_LEFT: 91,
          COMMAND_RIGHT: 93,
          CONTROL: 17,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          INSERT: 45,
          LEFT: 37,
          MENU: 93,
          NUMPAD_ADD: 107,
          NUMPAD_DECIMAL: 110,
          NUMPAD_DIVIDE: 111,
          NUMPAD_ENTER: 108,
          NUMPAD_MULTIPLY: 106,
          NUMPAD_SUBTRACT: 109,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SHIFT: 16,
          SPACE: 32,
          TAB: 9,
          UP: 38,
          WINDOWS: 91
        }
      } ), a.fn.extend( {
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function ( b, c ) {
          return typeof b == "number" ? this.each( function () {
            var d = this;
            setTimeout( function () {
              a( d ).focus(), c && c.call( d )
            }, b )
          } ) : this._focus.apply( this, arguments )
        },
        scrollParent: function () {
          var b;
          return a.browser.msie && /(static|relative)/.test( this.css( "position" ) ) || /absolute/.test( this
            .css( "position" ) ) ? b = this.parents().filter( function () {
            return /(relative|absolute|fixed)/.test( a.curCSS( this, "position", 1 ) ) && /(auto|scroll)/
              .test( a.curCSS( this, "overflow", 1 ) + a.curCSS( this, "overflow-y", 1 ) + a.curCSS( this,
                "overflow-x", 1 ) )
          } ).eq( 0 ) : b = this.parents().filter( function () {
            return /(auto|scroll)/.test( a.curCSS( this, "overflow", 1 ) + a.curCSS( this, "overflow-y",
              1 ) + a.curCSS( this, "overflow-x", 1 ) )
          } ).eq( 0 ), /fixed/.test( this.css( "position" ) ) || !b.length ? a( document ) : b
        },
        zIndex: function ( c ) {
          if ( c !== b ) return this.css( "zIndex", c );
          if ( this.length ) {
            var d = a( this[ 0 ] ),
              e, f;
            while ( d.length && d[ 0 ] !== document ) {
              e = d.css( "position" );
              if ( e === "absolute" || e === "relative" || e === "fixed" ) {
                f = parseInt( d.css( "zIndex" ), 10 );
                if ( !isNaN( f ) && f !== 0 ) return f
              }
              d = d.parent()
            }
          }
          return 0
        },
        disableSelection: function () {
          return this.bind( ( a.support.selectstart ? "selectstart" : "mousedown" ) + ".ui-disableSelection",
            function ( a ) {
              a.preventDefault()
            } )
        },
        enableSelection: function () {
          return this.unbind( ".ui-disableSelection" )
        }
      } ), a( "<a>" ).outerWidth( 1 ).jquery || a.each( [ "Width", "Height" ], function ( c, d ) {
        function h( b, c, d, f ) {
          return a.each( e, function () {
            c -= parseFloat( a.curCSS( b, "padding" + this, !0 ) ) || 0, d && ( c -= parseFloat( a.curCSS( b,
              "border" + this + "Width", !0 ) ) || 0 ), f && ( c -= parseFloat( a.curCSS( b, "margin" +
              this, !0 ) ) || 0 )
          } ), c
        }
        var e = d === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
          f = d.toLowerCase(),
          g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
          };
        a.fn[ "inner" + d ] = function ( c ) {
          return c === b ? g[ "inner" + d ].call( this ) : this.each( function () {
            a( this ).css( f, h( this, c ) + "px" )
          } )
        }, a.fn[ "outer" + d ] = function ( b, c ) {
          return typeof b != "number" ? g[ "outer" + d ].call( this, b ) : this.each( function () {
            a( this ).css( f, h( this, b, !0, c ) + "px" )
          } )
        }
      } ), a.extend( a.expr[ ":" ], {
        data: a.expr.createPseudo ? a.expr.createPseudo( function ( b ) {
          return function ( c ) {
            return !!a.data( c, b )
          }
        } ) : function ( b, c, d ) {
          return !!a.data( b, d[ 3 ] )
        },
        focusable: function ( b ) {
          return c( b, !isNaN( a.attr( b, "tabindex" ) ) )
        },
        tabbable: function ( b ) {
          var d = a.attr( b, "tabindex" ),
            e = isNaN( d );
          return ( e || d >= 0 ) && c( b, !e )
        }
      } ), a( function () {
        var b = document.body,
          c = b.appendChild( c = document.createElement( "div" ) );
        c.offsetHeight, a.extend( c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
          } ), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b
          .removeChild( c ).style.display = "none"
      } ), a.curCSS || ( a.curCSS = a.css ), a.extend( a.ui, {
        plugin: {
          add: function ( b, c, d ) {
            var e = a.ui[ b ].prototype;
            for ( var f in d ) e.plugins[ f ] = e.plugins[ f ] || [], e.plugins[ f ].push( [ c, d[ f ] ] )
          },
          call: function ( a, b, c ) {
            var d = a.plugins[ b ];
            if ( !d || !a.element[ 0 ].parentNode ) return;
            for ( var e = 0; e < d.length; e++ ) a.options[ d[ e ][ 0 ] ] && d[ e ][ 1 ].apply( a.element, c )
          }
        },
        contains: function ( a, b ) {
          return document.compareDocumentPosition ? a.compareDocumentPosition( b ) & 16 : a !== b && a.contains(
            b )
        },
        hasScroll: function ( b, c ) {
          if ( a( b ).css( "overflow" ) === "hidden" ) return !1;
          var d = c && c === "left" ? "scrollLeft" : "scrollTop",
            e = !1;
          return b[ d ] > 0 ? !0 : ( b[ d ] = 1, e = b[ d ] > 0, b[ d ] = 0, e )
        },
        isOverAxis: function ( a, b, c ) {
          return a > b && a < b + c
        },
        isOver: function ( b, c, d, e, f, g ) {
          return a.ui.isOverAxis( b, d, f ) && a.ui.isOverAxis( c, e, g )
        }
      } )
    } )( jQuery );;
    /*! jQuery UI - v1.8.24 - 2012-09-28
            /* jquery.ui.widget.js */
    ( function ( a, b ) {
      if ( a.cleanData ) {
        var c = a.cleanData;
        a.cleanData = function ( b ) {
          for ( var d = 0, e;
            ( e = b[ d ] ) != null; d++ ) try {
            a( e ).triggerHandler( "remove" )
          } catch ( f ) {}
          c( b )
        }
      } else {
        var d = a.fn.remove;
        a.fn.remove = function ( b, c ) {
          return this.each( function () {
            return c || ( !b || a.filter( b, [ this ] ).length ) && a( "*", this ).add( [ this ] ).each(
              function () {
                try {
                  a( this ).triggerHandler( "remove" )
                } catch ( b ) {}
              } ), d.call( a( this ), b, c )
          } )
        }
      }
      a.widget = function ( b, c, d ) {
        var e = b.split( "." )[ 0 ],
          f;
        b = b.split( "." )[ 1 ], f = e + "-" + b, d || ( d = c, c = a.Widget ), a.expr[ ":" ][ f ] = function (
        c ) {
          return !!a.data( c, b )
        }, a[ e ] = a[ e ] || {}, a[ e ][ b ] = function ( a, b ) {
          arguments.length && this._createWidget( a, b )
        };
        var g = new c;
        g.options = a.extend( !0, {}, g.options ), a[ e ][ b ].prototype = a.extend( !0, g, {
          namespace: e,
          widgetName: b,
          widgetEventPrefix: a[ e ][ b ].prototype.widgetEventPrefix || b,
          widgetBaseClass: f
        }, d ), a.widget.bridge( b, a[ e ][ b ] )
      }, a.widget.bridge = function ( c, d ) {
        a.fn[ c ] = function ( e ) {
          var f = typeof e == "string",
            g = Array.prototype.slice.call( arguments, 1 ),
            h = this;
          return e = !f && g.length ? a.extend.apply( null, [ !0, e ].concat( g ) ) : e, f && e.charAt( 0 ) ===
            "_" ? h : ( f ? this.each( function () {
              var d = a.data( this, c ),
                f = d && a.isFunction( d[ e ] ) ? d[ e ].apply( d, g ) : d;
              if ( f !== d && f !== b ) return h = f, !1
            } ) : this.each( function () {
              var b = a.data( this, c );
              b ? b.option( e || {} )._init() : a.data( this, c, new d( e, this ) )
            } ), h )
        }
      }, a.Widget = function ( a, b ) {
        arguments.length && this._createWidget( a, b )
      }, a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
          disabled: !1
        },
        _createWidget: function ( b, c ) {
          a.data( c, this.widgetName, this ), this.element = a( c ), this.options = a.extend( !0, {}, this
            .options, this._getCreateOptions(), b );
          var d = this;
          this.element.bind( "remove." + this.widgetName, function () {
            d.destroy()
          } ), this._create(), this._trigger( "create" ), this._init()
        },
        _getCreateOptions: function () {
          return a.metadata && a.metadata.get( this.element[ 0 ] )[ this.widgetName ]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
          this.element.unbind( "." + this.widgetName ).removeData( this.widgetName ), this.widget().unbind( "." +
            this.widgetName ).removeAttr( "aria-disabled" ).removeClass( this.widgetBaseClass + "-disabled " +
            "ui-state-disabled" )
        },
        widget: function () {
          return this.element
        },
        option: function ( c, d ) {
          var e = c;
          if ( arguments.length === 0 ) return a.extend( {}, this.options );
          if ( typeof c == "string" ) {
            if ( d === b ) return this.options[ c ];
            e = {}, e[ c ] = d
          }
          return this._setOptions( e ), this
        },
        _setOptions: function ( b ) {
          var c = this;
          return a.each( b, function ( a, b ) {
            c._setOption( a, b )
          } ), this
        },
        _setOption: function ( a, b ) {
          return this.options[ a ] = b, a === "disabled" && this.widget()[ b ? "addClass" : "removeClass" ]( this
            .widgetBaseClass + "-disabled" + " " + "ui-state-disabled" ).attr( "aria-disabled", b ), this
        },
        enable: function () {
          return this._setOption( "disabled", !1 )
        },
        disable: function () {
          return this._setOption( "disabled", !0 )
        },
        _trigger: function ( b, c, d ) {
          var e, f, g = this.options[ b ];
          d = d || {}, c = a.Event( c ), c.type = ( b === this.widgetEventPrefix ? b : this.widgetEventPrefix +
            b ).toLowerCase(), c.target = this.element[ 0 ], f = c.originalEvent;
          if ( f )
            for ( e in f ) e in c || ( c[ e ] = f[ e ] );
          return this.element.trigger( c, d ), !( a.isFunction( g ) && g.call( this.element[ 0 ], c, d ) === !1 ||
            c.isDefaultPrevented() )
        }
      }
    } )( jQuery );;
    /*! jQuery UI - v1.8.24 - 2012-09-28
            /* jquery.ui.position.js */
    ( function ( a, b ) {
      a.ui = a.ui || {};
      var c = /left|center|right/,
        d = /top|center|bottom/,
        e = "center",
        f = {},
        g = a.fn.position,
        h = a.fn.offset;
      a.fn.position = function ( b ) {
          if ( !b || !b.of ) return g.apply( this, arguments );
          b = a.extend( {}, b );
          var h = a( b.of ),
            i = h[ 0 ],
            j = ( b.collision || "flip" ).split( " " ),
            k = b.offset ? b.offset.split( " " ) : [ 0, 0 ],
            l, m, n;
          return i.nodeType === 9 ? ( l = h.width(), m = h.height(), n = {
              top: 0,
              left: 0
            } ) : i.setTimeout ? ( l = h.width(), m = h.height(), n = {
              top: h.scrollTop(),
              left: h.scrollLeft()
            } ) : i.preventDefault ? ( b.at = "left top", l = m = 0, n = {
              top: b.of.pageY,
              left: b.of.pageX
            } ) : ( l = h.outerWidth(), m = h.outerHeight(), n = h.offset() ), a.each( [ "my", "at" ], function () {
              var a = ( b[ this ] || "" ).split( " " );
              a.length === 1 && ( a = c.test( a[ 0 ] ) ? a.concat( [ e ] ) : d.test( a[ 0 ] ) ? [ e ].concat( a ) :
                [ e, e ] ), a[ 0 ] = c.test( a[ 0 ] ) ? a[ 0 ] : e, a[ 1 ] = d.test( a[ 1 ] ) ? a[ 1 ] : e, b[
                this ] = a
            } ), j.length === 1 && ( j[ 1 ] = j[ 0 ] ), k[ 0 ] = parseInt( k[ 0 ], 10 ) || 0, k.length === 1 && ( k[
              1 ] = k[ 0 ] ), k[ 1 ] = parseInt( k[ 1 ], 10 ) || 0, b.at[ 0 ] === "right" ? n.left += l : b.at[
            0 ] === e && ( n.left += l / 2 ), b.at[ 1 ] === "bottom" ? n.top += m : b.at[ 1 ] === e && ( n.top += m /
              2 ), n.left += k[ 0 ], n.top += k[ 1 ], this.each( function () {
              var c = a( this ),
                d = c.outerWidth(),
                g = c.outerHeight(),
                h = parseInt( a.curCSS( this, "marginLeft", !0 ) ) || 0,
                i = parseInt( a.curCSS( this, "marginTop", !0 ) ) || 0,
                o = d + h + ( parseInt( a.curCSS( this, "marginRight", !0 ) ) || 0 ),
                p = g + i + ( parseInt( a.curCSS( this, "marginBottom", !0 ) ) || 0 ),
                q = a.extend( {}, n ),
                r;
              b.my[ 0 ] === "right" ? q.left -= d : b.my[ 0 ] === e && ( q.left -= d / 2 ), b.my[ 1 ] === "bottom" ?
                q.top -= g : b.my[ 1 ] === e && ( q.top -= g / 2 ), f.fractions || ( q.left = Math.round( q.left ),
                  q.top = Math.round( q.top ) ), r = {
                  left: q.left - h,
                  top: q.top - i
                }, a.each( [ "left", "top" ], function ( c, e ) {
                  a.ui.position[ j[ c ] ] && a.ui.position[ j[ c ] ][ e ]( q, {
                    targetWidth: l,
                    targetHeight: m,
                    elemWidth: d,
                    elemHeight: g,
                    collisionPosition: r,
                    collisionWidth: o,
                    collisionHeight: p,
                    offset: k,
                    my: b.my,
                    at: b.at
                  } )
                } ), a.fn.bgiframe && c.bgiframe(), c.offset( a.extend( q, {
                  using: b.using
                } ) )
            } )
        }, a.ui.position = {
          fit: {
            left: function ( b, c ) {
              var d = a( window ),
                e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
              b.left = e > 0 ? b.left - e : Math.max( b.left - c.collisionPosition.left, b.left )
            },
            top: function ( b, c ) {
              var d = a( window ),
                e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
              b.top = e > 0 ? b.top - e : Math.max( b.top - c.collisionPosition.top, b.top )
            }
          },
          flip: {
            left: function ( b, c ) {
              if ( c.at[ 0 ] === e ) return;
              var d = a( window ),
                f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
                g = c.my[ 0 ] === "left" ? -c.elemWidth : c.my[ 0 ] === "right" ? c.elemWidth : 0,
                h = c.at[ 0 ] === "left" ? c.targetWidth : -c.targetWidth,
                i = -2 * c.offset[ 0 ];
              b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
            },
            top: function ( b, c ) {
              if ( c.at[ 1 ] === e ) return;
              var d = a( window ),
                f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
                g = c.my[ 1 ] === "top" ? -c.elemHeight : c.my[ 1 ] === "bottom" ? c.elemHeight : 0,
                h = c.at[ 1 ] === "top" ? c.targetHeight : -c.targetHeight,
                i = -2 * c.offset[ 1 ];
              b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
            }
          }
        }, a.offset.setOffset || ( a.offset.setOffset = function ( b, c ) {
          /static/.test( a.curCSS( b, "position" ) ) && ( b.style.position = "relative" );
          var d = a( b ),
            e = d.offset(),
            f = parseInt( a.curCSS( b, "top", !0 ), 10 ) || 0,
            g = parseInt( a.curCSS( b, "left", !0 ), 10 ) || 0,
            h = {
              top: c.top - e.top + f,
              left: c.left - e.left + g
            };
          "using" in c ? c.using.call( b, h ) : d.css( h )
        }, a.fn.offset = function ( b ) {
          var c = this[ 0 ];
          return !c || !c.ownerDocument ? null : b ? a.isFunction( b ) ? this.each( function ( c ) {
            a( this ).offset( b.call( this, c, a( this ).offset() ) )
          } ) : this.each( function () {
            a.offset.setOffset( this, b )
          } ) : h.call( this )
        } ), a.curCSS || ( a.curCSS = a.css ),
        function () {
          var b = document.getElementsByTagName( "body" )[ 0 ],
            c = document.createElement( "div" ),
            d, e, g, h, i;
          d = document.createElement( b ? "div" : "body" ), g = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
          }, b && a.extend( g, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
          } );
          for ( var j in g ) d.style[ j ] = g[ j ];
          d.appendChild( c ), e = b || document.documentElement, e.insertBefore( d, e.firstChild ), c.style.cssText =
            "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a( c )
            .offset( function ( a, b ) {
              return b
            } ).offset(), d.innerHTML = "", e.removeChild( d ), i = h.top + h.left + ( b ? 2e3 : 0 ), f.fractions =
            i > 21 && i < 22
        }()
    } )( jQuery );;
    /*! jQuery UI - v1.8.24 - 2012-09-28
            /* jquery.effects.core.js */
    jQuery.effects || function ( a, b ) {
      function c( b ) {
        var c;
        return b && b.constructor == Array && b.length == 3 ? b : ( c =
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec( b ) ) ? [ parseInt( c[ 1 ], 10 ),
            parseInt( c[ 2 ], 10 ), parseInt( c[ 3 ], 10 )
          ] : ( c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
            .exec( b ) ) ? [ parseFloat( c[ 1 ] ) * 2.55, parseFloat( c[ 2 ] ) * 2.55, parseFloat( c[ 3 ] ) * 2.55 ] :
          ( c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec( b ) ) ? [ parseInt( c[ 1 ], 16 ), parseInt(
            c[ 2 ], 16 ), parseInt( c[ 3 ], 16 ) ] : ( c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec( b ) ) ? [
            parseInt( c[ 1 ] + c[ 1 ], 16 ), parseInt( c[ 2 ] + c[ 2 ], 16 ), parseInt( c[ 3 ] + c[ 3 ], 16 )
          ] : ( c = /rgba\(0, 0, 0, 0\)/.exec( b ) ) ? e.transparent : e[ a.trim( b ).toLowerCase() ]
      }

      function d( b, d ) {
        var e;
        do {
          e = ( a.curCSS || a.css )( b, d );
          if ( e != "" && e != "transparent" || a.nodeName( b, "body" ) ) break;
          d = "backgroundColor"
        } while ( b = b.parentNode );
        return c( e )
      }

      function h() {
        var a = document.defaultView ? document.defaultView.getComputedStyle( this, null ) : this.currentStyle,
          b = {},
          c, d;
        if ( a && a.length && a[ 0 ] && a[ a[ 0 ] ] ) {
          var e = a.length;
          while ( e-- ) c = a[ e ], typeof a[ c ] == "string" && ( d = c.replace( /\-(\w)/g, function ( a, b ) {
            return b.toUpperCase()
          } ), b[ d ] = a[ c ] )
        } else
          for ( c in a ) typeof a[ c ] == "string" && ( b[ c ] = a[ c ] );
        return b
      }

      function i( b ) {
        var c, d;
        for ( c in b ) d = b[ c ], ( d == null || a.isFunction( d ) || c in g || /scrollbar/.test( c ) || !/color/i
          .test( c ) && isNaN( parseFloat( d ) ) ) && delete b[ c ];
        return b
      }

      function j( a, b ) {
        var c = {
            _: 0
          },
          d;
        for ( d in b ) a[ d ] != b[ d ] && ( c[ d ] = b[ d ] );
        return c
      }

      function k( b, c, d, e ) {
        typeof b == "object" && ( e = c, d = null, c = b, b = c.effect ), a.isFunction( c ) && ( e = c, d = null,
        c = {} );
        if ( typeof c == "number" || a.fx.speeds[ c ] ) e = d, d = c, c = {};
        return a.isFunction( d ) && ( e = d, d = null ), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 :
          typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[ d ] : a.fx.speeds._default, e = e || c.complete,
          [ b, c, d, e ]
      }

      function l( b ) {
        return !b || typeof b == "number" || a.fx.speeds[ b ] ? !0 : typeof b == "string" && !a.effects[ b ] ? !0 : !1
      }
      a.effects = {}, a.each( [ "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor",
        "borderTopColor", "borderColor", "color", "outlineColor"
      ], function ( b, e ) {
        a.fx.step[ e ] = function ( a ) {
          a.colorInit || ( a.start = d( a.elem, e ), a.end = c( a.end ), a.colorInit = !0 ), a.elem.style[ e ] =
            "rgb(" + Math.max( Math.min( parseInt( a.pos * ( a.end[ 0 ] - a.start[ 0 ] ) + a.start[ 0 ], 10 ),
              255 ), 0 ) + "," + Math.max( Math.min( parseInt( a.pos * ( a.end[ 1 ] - a.start[ 1 ] ) + a.start[
              1 ], 10 ), 255 ), 0 ) + "," + Math.max( Math.min( parseInt( a.pos * ( a.end[ 2 ] - a.start[
              2 ] ) + a.start[ 2 ], 10 ), 255 ), 0 ) + ")"
        }
      } );
      var e = {
          aqua: [ 0, 255, 255 ],
          azure: [ 240, 255, 255 ],
          beige: [ 245, 245, 220 ],
          black: [ 0, 0, 0 ],
          blue: [ 0, 0, 255 ],
          brown: [ 165, 42, 42 ],
          cyan: [ 0, 255, 255 ],
          darkblue: [ 0, 0, 139 ],
          darkcyan: [ 0, 139, 139 ],
          darkgrey: [ 169, 169, 169 ],
          darkgreen: [ 0, 100, 0 ],
          darkkhaki: [ 189, 183, 107 ],
          darkmagenta: [ 139, 0, 139 ],
          darkolivegreen: [ 85, 107, 47 ],
          darkorange: [ 255, 140, 0 ],
          darkorchid: [ 153, 50, 204 ],
          darkred: [ 139, 0, 0 ],
          darksalmon: [ 233, 150, 122 ],
          darkviolet: [ 148, 0, 211 ],
          fuchsia: [ 255, 0, 255 ],
          gold: [ 255, 215, 0 ],
          green: [ 0, 128, 0 ],
          indigo: [ 75, 0, 130 ],
          khaki: [ 240, 230, 140 ],
          lightblue: [ 173, 216, 230 ],
          lightcyan: [ 224, 255, 255 ],
          lightgreen: [ 144, 238, 144 ],
          lightgrey: [ 211, 211, 211 ],
          lightpink: [ 255, 182, 193 ],
          lightyellow: [ 255, 255, 224 ],
          lime: [ 0, 255, 0 ],
          magenta: [ 255, 0, 255 ],
          maroon: [ 128, 0, 0 ],
          navy: [ 0, 0, 128 ],
          olive: [ 128, 128, 0 ],
          orange: [ 255, 165, 0 ],
          pink: [ 255, 192, 203 ],
          purple: [ 128, 0, 128 ],
          violet: [ 128, 0, 128 ],
          red: [ 255, 0, 0 ],
          silver: [ 192, 192, 192 ],
          white: [ 255, 255, 255 ],
          yellow: [ 255, 255, 0 ],
          transparent: [ 255, 255, 255 ]
        },
        f = [ "add", "remove", "toggle" ],
        g = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };
      a.effects.animateClass = function ( b, c, d, e ) {
        return a.isFunction( d ) && ( e = d, d = null ), this.queue( function () {
          var g = a( this ),
            k = g.attr( "style" ) || " ",
            l = i( h.call( this ) ),
            m, n = g.attr( "class" ) || "";
          a.each( f, function ( a, c ) {
            b[ c ] && g[ c + "Class" ]( b[ c ] )
          } ), m = i( h.call( this ) ), g.attr( "class", n ), g.animate( j( l, m ), {
            queue: !1,
            duration: c,
            easing: d,
            complete: function () {
              a.each( f, function ( a, c ) {
                  b[ c ] && g[ c + "Class" ]( b[ c ] )
                } ), typeof g.attr( "style" ) == "object" ? ( g.attr( "style" ).cssText = "", g.attr(
                  "style" ).cssText = k ) : g.attr( "style", k ), e && e.apply( this, arguments ), a
                .dequeue( this )
            }
          } )
        } )
      }, a.fn.extend( {
        _addClass: a.fn.addClass,
        addClass: function ( b, c, d, e ) {
          return c ? a.effects.animateClass.apply( this, [ {
            add: b
          }, c, d, e ] ) : this._addClass( b )
        },
        _removeClass: a.fn.removeClass,
        removeClass: function ( b, c, d, e ) {
          return c ? a.effects.animateClass.apply( this, [ {
            remove: b
          }, c, d, e ] ) : this._removeClass( b )
        },
        _toggleClass: a.fn.toggleClass,
        toggleClass: function ( c, d, e, f, g ) {
          return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply( this, [ d ? {
            add: c
          } : {
            remove: c
          }, e, f, g ] ) : this._toggleClass( c, d ) : a.effects.animateClass.apply( this, [ {
            toggle: c
          }, d, e, f ] )
        },
        switchClass: function ( b, c, d, e, f ) {
          return a.effects.animateClass.apply( this, [ {
            add: c,
            remove: b
          }, d, e, f ] )
        }
      } ), a.extend( a.effects, {
        version: "1.8.24",
        save: function ( a, b ) {
          for ( var c = 0; c < b.length; c++ ) b[ c ] !== null && a.data( "ec.storage." + b[ c ], a[ 0 ].style[
            b[ c ] ] )
        },
        restore: function ( a, b ) {
          for ( var c = 0; c < b.length; c++ ) b[ c ] !== null && a.css( b[ c ], a.data( "ec.storage." + b[
            c ] ) )
        },
        setMode: function ( a, b ) {
          return b == "toggle" && ( b = a.is( ":hidden" ) ? "show" : "hide" ), b
        },
        getBaseline: function ( a, b ) {
          var c, d;
          switch ( a[ 0 ] ) {
            case "top":
              c = 0;
              break;
            case "middle":
              c = .5;
              break;
            case "bottom":
              c = 1;
              break;
            default:
              c = a[ 0 ] / b.height
          }
          switch ( a[ 1 ] ) {
            case "left":
              d = 0;
              break;
            case "center":
              d = .5;
              break;
            case "right":
              d = 1;
              break;
            default:
              d = a[ 1 ] / b.width
          }
          return {
            x: d,
            y: c
          }
        },
        createWrapper: function ( b ) {
          if ( b.parent().is( ".ui-effects-wrapper" ) ) return b.parent();
          var c = {
              width: b.outerWidth( !0 ),
              height: b.outerHeight( !0 ),
              "float": b.css( "float" )
            },
            d = a( "<div></div>" ).addClass( "ui-effects-wrapper" ).css( {
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0
            } ),
            e = document.activeElement;
          try {
            e.id
          } catch ( f ) {
            e = document.body
          }
          return b.wrap( d ), ( b[ 0 ] === e || a.contains( b[ 0 ], e ) ) && a( e ).focus(), d = b.parent(), b
            .css( "position" ) == "static" ? ( d.css( {
              position: "relative"
            } ), b.css( {
              position: "relative"
            } ) ) : ( a.extend( c, {
              position: b.css( "position" ),
              zIndex: b.css( "z-index" )
            } ), a.each( [ "top", "left", "bottom", "right" ], function ( a, d ) {
              c[ d ] = b.css( d ), isNaN( parseInt( c[ d ], 10 ) ) && ( c[ d ] = "auto" )
            } ), b.css( {
              position: "relative",
              top: 0,
              left: 0,
              right: "auto",
              bottom: "auto"
            } ) ), d.css( c ).show()
        },
        removeWrapper: function ( b ) {
          var c, d = document.activeElement;
          return b.parent().is( ".ui-effects-wrapper" ) ? ( c = b.parent().replaceWith( b ), ( b[ 0 ] === d || a
            .contains( b[ 0 ], d ) ) && a( d ).focus(), c ) : b
        },
        setTransition: function ( b, c, d, e ) {
          return e = e || {}, a.each( c, function ( a, c ) {
            var f = b.cssUnit( c );
            f[ 0 ] > 0 && ( e[ c ] = f[ 0 ] * d + f[ 1 ] )
          } ), e
        }
      } ), a.fn.extend( {
        effect: function ( b, c, d, e ) {
          var f = k.apply( this, arguments ),
            g = {
              options: f[ 1 ],
              duration: f[ 2 ],
              callback: f[ 3 ]
            },
            h = g.options.mode,
            i = a.effects[ b ];
          return a.fx.off || !i ? h ? this[ h ]( g.duration, g.callback ) : this.each( function () {
            g.callback && g.callback.call( this )
          } ) : i.call( this, g )
        },
        _show: a.fn.show,
        show: function ( a ) {
          if ( l( a ) ) return this._show.apply( this, arguments );
          var b = k.apply( this, arguments );
          return b[ 1 ].mode = "show", this.effect.apply( this, b )
        },
        _hide: a.fn.hide,
        hide: function ( a ) {
          if ( l( a ) ) return this._hide.apply( this, arguments );
          var b = k.apply( this, arguments );
          return b[ 1 ].mode = "hide", this.effect.apply( this, b )
        },
        __toggle: a.fn.toggle,
        toggle: function ( b ) {
          if ( l( b ) || typeof b == "boolean" || a.isFunction( b ) ) return this.__toggle.apply( this,
            arguments );
          var c = k.apply( this, arguments );
          return c[ 1 ].mode = "toggle", this.effect.apply( this, c )
        },
        cssUnit: function ( b ) {
          var c = this.css( b ),
            d = [];
          return a.each( [ "em", "px", "%", "pt" ], function ( a, b ) {
            c.indexOf( b ) > 0 && ( d = [ parseFloat( c ), b ] )
          } ), d
        }
      } );
      var m = {};
      a.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function ( a, b ) {
        m[ b ] = function ( b ) {
          return Math.pow( b, a + 2 )
        }
      } ), a.extend( m, {
        Sine: function ( a ) {
          return 1 - Math.cos( a * Math.PI / 2 )
        },
        Circ: function ( a ) {
          return 1 - Math.sqrt( 1 - a * a )
        },
        Elastic: function ( a ) {
          return a === 0 || a === 1 ? a : -Math.pow( 2, 8 * ( a - 1 ) ) * Math.sin( ( ( a - 1 ) * 80 - 7.5 ) *
            Math.PI / 15 )
        },
        Back: function ( a ) {
          return a * a * ( 3 * a - 2 )
        },
        Bounce: function ( a ) {
          var b, c = 4;
          while ( a < ( ( b = Math.pow( 2, --c ) ) - 1 ) / 11 );
          return 1 / Math.pow( 4, 3 - c ) - 7.5625 * Math.pow( ( b * 3 - 2 ) / 22 - a, 2 )
        }
      } ), a.each( m, function ( b, c ) {
        a.easing[ "easeIn" + b ] = c, a.easing[ "easeOut" + b ] = function ( a ) {
          return 1 - c( 1 - a )
        }, a.easing[ "easeInOut" + b ] = function ( a ) {
          return a < .5 ? c( a * 2 ) / 2 : c( a * -2 + 2 ) / -2 + 1
        }
      } )
    }( jQuery );;
    /*! jQuery UI - v1.8.24 - 2012-09-28
            /* jquery.effects.transfer.js */
    ( function ( a, b ) {
      a.effects.transfer = function ( b ) {
        return this.queue( function () {
          var c = a( this ),
            d = a( b.options.to ),
            e = d.offset(),
            f = {
              top: e.top,
              left: e.left,
              height: d.innerHeight(),
              width: d.innerWidth()
            },
            g = c.offset(),
            h = a( '<div class="ui-effects-transfer"></div>' ).appendTo( document.body ).addClass( b.options
              .className ).css( {
              top: g.top,
              left: g.left,
              height: c.innerHeight(),
              width: c.innerWidth(),
              position: "absolute"
            } ).animate( f, b.duration, b.options.easing, function () {
              h.remove(), b.callback && b.callback.apply( c[ 0 ], arguments ), c.dequeue()
            } )
        } )
      }
    } )( jQuery );;
  </script>

  <script type="text/javascript">
    /* --- Dynatree Plugin - v1.2.4 https://github.com/mar10/dynatree --- */
    /* --- Slightly modified for use with Snap2HTML(in "_onClick: function(event) {" focus x3 was removed to prevent page from jumping around) */
    function _log( e, t ) {
      return;
      if ( !_canLog ) return;
      var n = Array.prototype.slice.apply( arguments, [ 1 ] ),
        r = new Date,
        i = r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds() + "." + r.getMilliseconds();
      n[ 0 ] = i + " - " + n[ 0 ];
      try {
        switch ( e ) {
          case "info":
            window.console.info.apply( window.console, n );
            break;
          case "warn":
            window.console.warn.apply( window.console, n );
            break;
          default:
            window.console.log.apply( window.console, n )
        }
      } catch ( s ) {
        window.console ? s.number === -2146827850 && window.console.log( n.join( ", " ) ) : _canLog = !1
      }
    }

    function _checkBrowser() {
      function n( e ) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec( e ) || /(webkit)[ \/]([\w.]+)/.exec( e ) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( e ) || /(msie) ([\w.]+)/.exec( e ) || e.indexOf( "compatible" ) <
          0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( e ) || [];
        return {
          browser: t[ 1 ] || "",
          version: t[ 2 ] || "0"
        }
      }
      var e, t;
      return e = n( navigator.userAgent ), t = {}, e.browser && ( t[ e.browser ] = !0, t.version = e.version ), t
        .chrome ? t.webkit = !0 : t.webkit && ( t.safari = !0 ), t
    }

    function logMsg( e ) {
      Array.prototype.unshift.apply( arguments, [ "debug" ] ), _log.apply( this, arguments )
    }
    var _canLog = !0,
      BROWSER = jQuery.browser || _checkBrowser(),
      getDynaTreePersistData = null,
      DTNodeStatus_Error = -1,
      DTNodeStatus_Loading = 1,
      DTNodeStatus_Ok = 0;
    ( function ( $ ) {
      function getDtNodeFromElement( e ) {
        return alert( "getDtNodeFromElement is deprecated" ), $.ui.dynatree.getNode( e )
      }

      function noop() {}

      function versionCompare( e, t ) {
        var n = ( "" + e ).split( "." ),
          r = ( "" + t ).split( "." ),
          i = Math.min( n.length, r.length ),
          s, o, u;
        for ( u = 0; u < i; u++ ) {
          s = parseInt( n[ u ], 10 ), o = parseInt( r[ u ], 10 ), isNaN( s ) && ( s = n[ u ] ), isNaN( o ) && ( o = r[
            u ] );
          if ( s == o ) continue;
          return s > o ? 1 : s < o ? -1 : NaN
        }
        return n.length === r.length ? 0 : n.length < r.length ? -1 : 1
      }

      function _initDragAndDrop( e ) {
        var t = e.options.dnd || null;
        t && ( t.onDragStart || t.onDrop ) && _registerDnd(), t && t.onDragStart && e.$tree.draggable( {
          addClasses: !1,
          appendTo: "body",
          containment: !1,
          delay: 0,
          distance: 4,
          revert: !1,
          scroll: !0,
          scrollSpeed: 7,
          scrollSensitivity: 10,
          connectToDynatree: !0,
          helper: function ( e ) {
            var t = $.ui.dynatree.getNode( e.target );
            return t ? t.tree._onDragEvent( "helper", t, null, e, null, null ) : "<div></div>"
          },
          start: function ( e, t ) {
            var n = t.helper.data( "dtSourceNode" );
            return !!n
          },
          _last: null
        } ), t && t.onDrop && e.$tree.droppable( {
          addClasses: !1,
          tolerance: "intersect",
          greedy: !1,
          _last: null
        } )
      }
      var Class = {
          create: function () {
            return function () {
              this.initialize.apply( this, arguments )
            }
          }
        },
        DynaTreeNode = Class.create();
      DynaTreeNode.prototype = {
        initialize: function ( e, t, n ) {
          this.parent = e, this.tree = t, typeof n == "string" && ( n = {
              title: n
            } ), n.key ? n.key = "" + n.key : n.key = "_" + t._nodeCount++, this.data = $.extend( {}, $.ui
              .dynatree.nodedatadefaults, n ), this.li = null, this.span = null, this.ul = null, this.childList =
            null, this._isLoading = !1, this.hasSubSel = !1, this.bExpanded = !1, this.bSelected = !1
        },
        toString: function () {
          return "DynaTreeNode<" + this.data.key + ">: '" + this.data.title + "'"
        },
        toDict: function ( e, t ) {
          var n = $.extend( {}, this.data );
          n.activate = this.tree.activeNode === this, n.focus = this.tree.focusNode === this, n.expand = this
            .bExpanded, n.select = this.bSelected, t && t( n );
          if ( e && this.childList ) {
            n.children = [];
            for ( var r = 0, i = this.childList.length; r < i; r++ ) n.children.push( this.childList[ r ].toDict(
              !0, t ) )
          } else delete n.children;
          return n
        },
        fromDict: function ( e ) {
          var t = e.children;
          if ( t === undefined ) {
            this.data = $.extend( this.data, e ), this.render();
            return
          }
          e = $.extend( {}, e ), e.children = undefined, this.data = $.extend( this.data, e ), this
            .removeChildren(), this.addChild( t )
        },
        _getInnerHtml: function () {
          var e = this.tree,
            t = e.options,
            n = e.cache,
            r = this.getLevel(),
            i = this.data,
            s = "",
            o;
          r < t.minExpandLevel ? r > 1 && ( s += n.tagConnector ) : this.hasChildren() !== !1 ? s += n
            .tagExpander : s += n.tagConnector, t.checkbox && i.hideCheckbox !== !0 && !i.isStatusNode && ( s += n
              .tagCheckbox ), i.icon ? ( i.icon.charAt( 0 ) === "/" ? o = i.icon : o = t.imagePath + i.icon, s +=
              "<img src='" + o + "' alt='' />" ) : i.icon !== !1 && ( i.iconClass ? s += "<span class=' " + i
              .iconClass + "'></span>" : s += n.tagNodeIcon );
          var u = "";
          t.onCustomRender && ( u = t.onCustomRender.call( e, this ) || "" );
          if ( !u ) {
            var a = i.tooltip ? ' title="' + i.tooltip.replace( /\"/g, "&quot;" ) + '"' : "",
              f = i.href || "#";
            t.noLink || i.noLink ? u = '<span style="display:inline-block;" class="' + t.classNames.title + '"' +
              a + ">" + i.title + "</span>" : u = '<a href="' + f + '" class="' + t.classNames.title + '"' + a +
              ">" + i.title + "</a>"
          }
          return s += u, s
        },
        _fixOrder: function () {
          var e = this.childList;
          if ( !e || !this.ul ) return;
          var t = this.ul.firstChild;
          for ( var n = 0, r = e.length - 1; n < r; n++ ) {
            var i = e[ n ],
              s = t.dtnode;
            i !== s ? ( this.tree.logDebug( "_fixOrder: mismatch at index " + n + ": " + i + " != " + s ), this.ul
              .insertBefore( i.li, s.li ) ) : t = t.nextSibling
          }
        },
        render: function ( e, t ) {
          var n = this.tree,
            r = this.parent,
            i = this.data,
            s = n.options,
            o = s.classNames,
            u = this.isLastSibling(),
            a = !1;
          if ( !r && !this.ul ) this.li = this.span = null, this.ul = document.createElement( "ul" ), s
            .minExpandLevel > 1 ? this.ul.className = o.container + " " + o.noConnector : this.ul.className = o
            .container;
          else if ( r ) {
            this.li || ( a = !0, this.li = document.createElement( "li" ), this.li.dtnode = this, i.key && s
              .generateIds && ( this.li.id = s.idPrefix + i.key ), this.span = document.createElement( "span" ),
              this.span.className = o.title, this.li.appendChild( this.span ), r.ul || ( r.ul = document
                .createElement( "ul" ), r.ul.style.display = "none", r.li.appendChild( r.ul ) ), r.ul
              .appendChild( this.li ) ), this.span.innerHTML = this._getInnerHtml();
            var f = [];
            f.push( o.node ), i.isFolder && f.push( o.folder ), this.bExpanded && f.push( o.expanded ), this
              .hasChildren() !== !1 && f.push( o.hasChildren ), i.isLazy && this.childList === null && f.push( o
                .lazy ), u && f.push( o.lastsib ), this.bSelected && f.push( o.selected ), this.hasSubSel && f
              .push( o.partsel ), n.activeNode === this && f.push( o.active ), i.addClass && f.push( i.addClass ),
              f.push( o.combinedExpanderPrefix + ( this.bExpanded ? "e" : "c" ) + ( i.isLazy && this.childList ===
                null ? "d" : "" ) + ( u ? "l" : "" ) ), f.push( o.combinedIconPrefix + ( this.bExpanded ? "e" :
                "c" ) + ( i.isFolder ? "f" : "" ) ), this.span.className = f.join( " " ), this.li.className = u ?
              o.lastsib : "", a && s.onCreate && s.onCreate.call( n, this, this.span ), s.onRender && s.onRender
              .call( n, this, this.span )
          }
          if ( ( this.bExpanded || t === !0 ) && this.childList ) {
            for ( var l = 0, c = this.childList.length; l < c; l++ ) this.childList[ l ].render( !1, t );
            this._fixOrder()
          }
          if ( this.ul ) {
            var h = this.ul.style.display === "none",
              p = !!this.bExpanded;
            if ( e && s.fx && h === p ) {
              var d = s.fx.duration || 200;
              $( this.ul ).animate( s.fx, d )
            } else this.ul.style.display = this.bExpanded || !r ? "" : "none"
          }
        },
        getKeyPath: function ( e ) {
          var t = [];
          return this.visitParents( function ( e ) {
            e.parent && t.unshift( e.data.key )
          }, !e ), "/" + t.join( this.tree.options.keyPathSeparator )
        },
        getParent: function () {
          return this.parent
        },
        getChildren: function () {
          return this.hasChildren() === undefined ? undefined : this.childList
        },
        hasChildren: function () {
          if ( this.data.isLazy ) return this.childList === null || this.childList === undefined ? undefined :
            this.childList.length === 0 ? !1 : this.childList.length === 1 && this.childList[ 0 ]
          .isStatusNode() ? undefined : !0;
          return !!this.childList
        },
        isFirstSibling: function () {
          var e = this.parent;
          return !e || e.childList[ 0 ] === this
        },
        isLastSibling: function () {
          var e = this.parent;
          return !e || e.childList[ e.childList.length - 1 ] === this
        },
        isLoading: function () {
          return !!this._isLoading
        },
        getPrevSibling: function () {
          if ( !this.parent ) return null;
          var e = this.parent.childList;
          for ( var t = 1, n = e.length; t < n; t++ )
            if ( e[ t ] === this ) return e[ t - 1 ];
          return null
        },
        getNextSibling: function () {
          if ( !this.parent ) return null;
          var e = this.parent.childList;
          for ( var t = 0, n = e.length - 1; t < n; t++ )
            if ( e[ t ] === this ) return e[ t + 1 ];
          return null
        },
        isStatusNode: function () {
          return this.data.isStatusNode === !0
        },
        isChildOf: function ( e ) {
          return this.parent && this.parent === e
        },
        isDescendantOf: function ( e ) {
          if ( !e ) return !1;
          var t = this.parent;
          while ( t ) {
            if ( t === e ) return !0;
            t = t.parent
          }
          return !1
        },
        countChildren: function () {
          var e = this.childList;
          if ( !e ) return 0;
          var t = e.length;
          for ( var n = 0, r = t; n < r; n++ ) {
            var i = e[ n ];
            t += i.countChildren()
          }
          return t
        },
        sortChildren: function ( e, t ) {
          var n = this.childList;
          if ( !n ) return;
          e = e || function ( e, t ) {
            var n = e.data.title.toLowerCase(),
              r = t.data.title.toLowerCase();
            return n === r ? 0 : n > r ? 1 : -1
          }, n.sort( e );
          if ( t )
            for ( var r = 0, i = n.length; r < i; r++ ) n[ r ].childList && n[ r ].sortChildren( e,
            "$norender$" );
          t !== "$norender$" && this.render()
        },
        _setStatusNode: function ( e ) {
          var t = this.childList ? this.childList[ 0 ] : null;
          if ( !e ) {
            if ( t && t.isStatusNode() ) {
              try {
                this.ul && ( this.ul.removeChild( t.li ), t.li = null )
              } catch ( n ) {}
              this.childList.length === 1 ? this.childList = [] : this.childList.shift()
            }
          } else t ? ( e.isStatusNode = !0, e.key = "_statusNode", t.data = e, t.render() ) : ( e.isStatusNode = !
            0, e.key = "_statusNode", t = this.addChild( e ) )
        },
        setLazyNodeStatus: function ( e, t ) {
          var n = t && t.tooltip ? t.tooltip : null,
            r = t && t.info ? " (" + t.info + ")" : "";
          switch ( e ) {
            case DTNodeStatus_Ok:
              this._setStatusNode( null ), $( this.span ).removeClass( this.tree.options.classNames.nodeLoading ),
                this._isLoading = !1, this.tree.options.autoFocus && ( this === this.tree.tnRoot && this
                  .childList && this.childList.length > 0 ? this.childList[ 0 ].focus() : this.focus() );
              break;
            case DTNodeStatus_Loading:
              this._isLoading = !0, $( this.span ).addClass( this.tree.options.classNames.nodeLoading ), this
                .parent || this._setStatusNode( {
                  title: this.tree.options.strings.loading + r,
                  tooltip: n,
                  addClass: this.tree.options.classNames.nodeWait
                } );
              break;
            case DTNodeStatus_Error:
              this._isLoading = !1, this._setStatusNode( {
                title: this.tree.options.strings.loadError + r,
                tooltip: n,
                addClass: this.tree.options.classNames.nodeError
              } );
              break;
            default:
              throw "Bad LazyNodeStatus: '" + e + "'."
          }
        },
        _parentList: function ( e, t ) {
          var n = [],
            r = t ? this : this.parent;
          while ( r )( e || r.parent ) && n.unshift( r ), r = r.parent;
          return n
        },
        getLevel: function () {
          var e = 0,
            t = this.parent;
          while ( t ) e++, t = t.parent;
          return e
        },
        _getTypeForOuterNodeEvent: function ( e ) {
          var t = this.tree.options.classNames,
            n = e.target;
          if ( n.className.indexOf( t.node ) < 0 ) return null;
          var r = e.pageX - n.offsetLeft,
            i = e.pageY - n.offsetTop;
          for ( var s = 0, o = n.childNodes.length; s < o; s++ ) {
            var u = n.childNodes[ s ],
              a = u.offsetLeft - n.offsetLeft,
              f = u.offsetTop - n.offsetTop,
              l = u.clientWidth,
              c = u.clientHeight;
            if ( r >= a && r <= a + l && i >= f && i <= f + c ) {
              if ( u.className == t.title ) return "title";
              if ( u.className == t.expander ) return "expander";
              if ( u.className == t.checkbox ) return "checkbox";
              if ( u.className == t.nodeIcon ) return "icon"
            }
          }
          return "prefix"
        },
        getEventTargetType: function ( e ) {
          var t = e && e.target ? e.target.className : "",
            n = this.tree.options.classNames;
          return t === n.title ? "title" : t === n.expander ? "expander" : t === n.checkbox ? "checkbox" : t === n
            .nodeIcon ? "icon" : t === n.empty || t === n.vline || t === n.connector ? "prefix" : t.indexOf( n
              .node ) >= 0 ? this._getTypeForOuterNodeEvent( e ) : null
        },
        isVisible: function () {
          var e = this._parentList( !0, !1 );
          for ( var t = 0, n = e.length; t < n; t++ )
            if ( !e[ t ].bExpanded ) return !1;
          return !0
        },
        makeVisible: function () {
          var e = this._parentList( !0, !1 );
          for ( var t = 0, n = e.length; t < n; t++ ) e[ t ]._expand( !0 )
        },
        focus: function () {
          this.makeVisible();
          try {
            $( this.span ).find( ">a" ).focus()
          } catch ( e ) {}
        },
        isFocused: function () {
          return this.tree.tnFocused === this
        },
        _activate: function ( e, t ) {
          this.tree.logDebug( "dtnode._activate(%o, fireEvents=%o) - %o", e, t, this );
          var n = this.tree.options;
          if ( this.data.isStatusNode ) return;
          if ( t && n.onQueryActivate && n.onQueryActivate.call( this.tree, e, this ) === !1 ) return;
          if ( e ) {
            if ( this.tree.activeNode ) {
              if ( this.tree.activeNode === this ) return;
              this.tree.activeNode.deactivate()
            }
            n.activeVisible && this.makeVisible(), this.tree.activeNode = this, n.persist && $.cookie( n
                .cookieId + "-active", this.data.key, n.cookie ), this.tree.persistence.activeKey = this.data.key,
              $( this.span ).addClass( n.classNames.active ), t && n.onActivate && n.onActivate.call( this.tree,
                this )
          } else if ( this.tree.activeNode === this ) {
            if ( n.onQueryActivate && n.onQueryActivate.call( this.tree, !1, this ) === !1 ) return;
            $( this.span ).removeClass( n.classNames.active ), n.persist && $.cookie( n.cookieId + "-active", "",
                n.cookie ), this.tree.persistence.activeKey = null, this.tree.activeNode = null, t && n
              .onDeactivate && n.onDeactivate.call( this.tree, this )
          }
        },
        activate: function () {
          this._activate( !0, !0 )
        },
        activateSilently: function () {
          this._activate( !0, !1 )
        },
        deactivate: function () {
          this._activate( !1, !0 )
        },
        isActive: function () {
          return this.tree.activeNode === this
        },
        _userActivate: function () {
          var e = !0,
            t = !1;
          if ( this.data.isFolder ) switch ( this.tree.options.clickFolderMode ) {
            case 2:
              e = !1, t = !0;
              break;
            case 3:
              e = t = !0
          }
          this.parent === null && ( t = !1 ), t && ( this.toggleExpand(), this.focus() ), e && this.activate()
        },
        _setSubSel: function ( e ) {
          e ? ( this.hasSubSel = !0, $( this.span ).addClass( this.tree.options.classNames.partsel ) ) : ( this
            .hasSubSel = !1, $( this.span ).removeClass( this.tree.options.classNames.partsel ) )
        },
        _updatePartSelectionState: function () {
          var e;
          if ( !this.hasChildren() ) return e = this.bSelected && !this.data.unselectable && !this.data
            .isStatusNode, this._setSubSel( !1 ), e;
          var t, n, r = this.childList,
            i = !0,
            s = !0;
          for ( t = 0, n = r.length; t < n; t++ ) {
            var o = r[ t ],
              u = o._updatePartSelectionState();
            u !== !1 && ( s = !1 ), u !== !0 && ( i = !1 )
          }
          return i ? e = !0 : s ? e = !1 : e = undefined, this._setSubSel( e === undefined ), this.bSelected =
            e === !0, e
        },
        _fixSelectionState: function () {
          var e, t, n;
          if ( this.bSelected ) {
            this.visit( function ( e ) {
              e.parent._setSubSel( !0 ), e.data.unselectable || e._select( !0, !1, !1 )
            } ), e = this.parent;
            while ( e ) {
              e._setSubSel( !0 );
              var r = !0;
              for ( t = 0, n = e.childList.length; t < n; t++ ) {
                var i = e.childList[ t ];
                if ( !i.bSelected && !i.data.isStatusNode && !i.data.unselectable ) {
                  r = !1;
                  break
                }
              }
              r && e._select( !0, !1, !1 ), e = e.parent
            }
          } else {
            this._setSubSel( !1 ), this.visit( function ( e ) {
              e._setSubSel( !1 ), e._select( !1, !1, !1 )
            } ), e = this.parent;
            while ( e ) {
              e._select( !1, !1, !1 );
              var s = !1;
              for ( t = 0, n = e.childList.length; t < n; t++ )
                if ( e.childList[ t ].bSelected || e.childList[ t ].hasSubSel ) {
                  s = !0;
                  break
                } e._setSubSel( s ), e = e.parent
            }
          }
        },
        _select: function ( e, t, n ) {
          var r = this.tree.options;
          if ( this.data.isStatusNode ) return;
          if ( this.bSelected === e ) return;
          if ( t && r.onQuerySelect && r.onQuerySelect.call( this.tree, e, this ) === !1 ) return;
          r.selectMode == 1 && e && this.tree.visit( function ( e ) {
            if ( e.bSelected ) return e._select( !1, !1, !1 ), !1
          } ), this.bSelected = e, e ? ( r.persist && this.tree.persistence.addSelect( this.data.key ), $( this
              .span ).addClass( r.classNames.selected ), n && r.selectMode === 3 && this._fixSelectionState(),
            t && r.onSelect && r.onSelect.call( this.tree, !0, this ) ) : ( r.persist && this.tree.persistence
            .clearSelect( this.data.key ), $( this.span ).removeClass( r.classNames.selected ), n && r
            .selectMode === 3 && this._fixSelectionState(), t && r.onSelect && r.onSelect.call( this.tree, !1,
              this ) )
        },
        select: function ( e ) {
          return this.data.unselectable ? this.bSelected : this._select( e !== !1, !0, !0 )
        },
        toggleSelect: function () {
          return this.select( !this.bSelected )
        },
        isSelected: function () {
          return this.bSelected
        },
        isLazy: function () {
          return !!this.data.isLazy
        },
        _loadContent: function () {
          try {
            var e = this.tree.options;
            this.tree.logDebug( "_loadContent: start - %o", this ), this.setLazyNodeStatus(
              DTNodeStatus_Loading ), !0 === e.onLazyRead.call( this.tree, this ) && ( this.setLazyNodeStatus(
                DTNodeStatus_Ok ), this.tree.logDebug( "_loadContent: succeeded - %o", this ) )
          } catch ( t ) {
            this.tree.logWarning( "_loadContent: failed - %o", t ), this.setLazyNodeStatus( DTNodeStatus_Error, {
              tooltip: "" + t
            } )
          }
        },
        _expand: function ( e, t ) {
          if ( this.bExpanded === e ) {
            this.tree.logDebug( "dtnode._expand(%o) IGNORED - %o", e, this );
            return
          }
          this.tree.logDebug( "dtnode._expand(%o) - %o", e, this );
          var n = this.tree.options;
          if ( !e && this.getLevel() < n.minExpandLevel ) {
            this.tree.logDebug( "dtnode._expand(%o) prevented collapse - %o", e, this );
            return
          }
          if ( n.onQueryExpand && n.onQueryExpand.call( this.tree, e, this ) === !1 ) return;
          this.bExpanded = e, n.persist && ( e ? this.tree.persistence.addExpand( this.data.key ) : this.tree
            .persistence.clearExpand( this.data.key ) );
          var r = ( !this.data.isLazy || this.childList !== null ) && !this._isLoading && !t;
          this.render( r );
          if ( this.bExpanded && this.parent && n.autoCollapse ) {
            var i = this._parentList( !1, !0 );
            for ( var s = 0, o = i.length; s < o; s++ ) i[ s ].collapseSiblings()
          }
          n.activeVisible && this.tree.activeNode && !this.tree.activeNode.isVisible() && this.tree.activeNode
            .deactivate();
          if ( e && this.data.isLazy && this.childList === null && !this._isLoading ) {
            this._loadContent();
            return
          }
          n.onExpand && n.onExpand.call( this.tree, e, this )
        },
        isExpanded: function () {
          return this.bExpanded
        },
        expand: function ( e ) {
          e = e !== !1;
          if ( !this.childList && !this.data.isLazy && e ) return;
          if ( this.parent === null && !e ) return;
          this._expand( e )
        },
        scheduleAction: function ( e, t ) {
          this.tree.timer && ( clearTimeout( this.tree.timer ), this.tree.logDebug( "clearTimeout(%o)", this.tree
            .timer ) );
          var n = this;
          switch ( e ) {
            case "cancel":
              break;
            case "expand":
              this.tree.timer = setTimeout( function () {
                n.tree.logDebug( "setTimeout: trigger expand" ), n.expand( !0 )
              }, t );
              break;
            case "activate":
              this.tree.timer = setTimeout( function () {
                n.tree.logDebug( "setTimeout: trigger activate" ), n.activate()
              }, t );
              break;
            default:
              throw "Invalid mode " + e
          }
          this.tree.logDebug( "setTimeout(%s, %s): %s", e, t, this.tree.timer )
        },
        toggleExpand: function () {
          this.expand( !this.bExpanded )
        },
        collapseSiblings: function () {
          if ( this.parent === null ) return;
          var e = this.parent.childList;
          for ( var t = 0, n = e.length; t < n; t++ ) e[ t ] !== this && e[ t ].bExpanded && e[ t ]._expand( !1 )
        },
        _onClick: function ( e ) {
          var t = this.getEventTargetType( e );
          if ( t === "expander" ) this.toggleExpand();
          else if ( t === "checkbox" ) this.toggleSelect();
          else {
            this._userActivate();
            var n = this.span.getElementsByTagName( "a" );
            if ( !n[ 0 ] ) return !0;
          }
          e.preventDefault()
        },
        _onDblClick: function ( e ) {},
        _onKeydown: function ( e ) {
          var t = !0,
            n;
          switch ( e.which ) {
            case 107:
            case 187:
              this.bExpanded || this.toggleExpand();
              break;
            case 109:
            case 189:
              this.bExpanded && this.toggleExpand();
              break;
            case 32:
              this._userActivate();
              break;
            case 8:
              this.parent && this.parent.focus();
              break;
            case 37:
              this.bExpanded ? ( this.toggleExpand(), this.focus() ) : this.parent && this.parent.parent && this
                .parent.focus();
              break;
            case 39:
              !this.bExpanded && ( this.childList || this.data.isLazy ) ? ( this.toggleExpand(), this.focus() ) :
                this.childList && this.childList[ 0 ].focus();
              break;
            case 38:
              n = this.getPrevSibling();
              while ( n && n.bExpanded && n.childList ) n = n.childList[ n.childList.length - 1 ];
              !n && this.parent && this.parent.parent && ( n = this.parent ), n && n.focus();
              break;
            case 40:
              if ( this.bExpanded && this.childList ) n = this.childList[ 0 ];
              else {
                var r = this._parentList( !1, !0 );
                for ( var i = r.length - 1; i >= 0; i-- ) {
                  n = r[ i ].getNextSibling();
                  if ( n ) break
                }
              }
              n && n.focus();
              break;
            default:
              t = !1
          }
          t && e.preventDefault()
        },
        _onKeypress: function ( e ) {},
        _onFocus: function ( e ) {
          var t = this.tree.options;
          if ( e.type == "blur" || e.type == "focusout" ) t.onBlur && t.onBlur.call( this.tree, this ), this.tree
            .tnFocused && $( this.tree.tnFocused.span ).removeClass( t.classNames.focused ), this.tree.tnFocused =
            null, t.persist && $.cookie( t.cookieId + "-focus", "", t.cookie );
          else if ( e.type == "focus" || e.type == "focusin" ) this.tree.tnFocused && this.tree.tnFocused !==
            this && ( this.tree.logDebug( "dtnode.onFocus: out of sync: curFocus: %o", this.tree.tnFocused ), $(
              this.tree.tnFocused.span ).removeClass( t.classNames.focused ) ), this.tree.tnFocused = this, t
            .onFocus && t.onFocus.call( this.tree, this ), $( this.tree.tnFocused.span ).addClass( t.classNames
              .focused ), t.persist && $.cookie( t.cookieId + "-focus", this.data.key, t.cookie )
        },
        visit: function ( e, t ) {
          var n = !0;
          if ( t === !0 ) {
            n = e( this );
            if ( n === !1 || n == "skip" ) return n
          }
          if ( this.childList )
            for ( var r = 0, i = this.childList.length; r < i; r++ ) {
              n = this.childList[ r ].visit( e, !0 );
              if ( n === !1 ) break
            }
          return n
        },
        visitParents: function ( e, t ) {
          if ( t && e( this ) === !1 ) return !1;
          var n = this.parent;
          while ( n ) {
            if ( e( n ) === !1 ) return !1;
            n = n.parent
          }
          return !0
        },
        remove: function () {
          if ( this === this.tree.root ) throw "Cannot remove system root";
          return this.parent.removeChild( this )
        },
        removeChild: function ( e ) {
          var t = this.childList;
          if ( t.length == 1 ) {
            if ( e !== t[ 0 ] ) throw "removeChild: invalid child";
            return this.removeChildren()
          }
          e === this.tree.activeNode && e.deactivate(), this.tree.options.persist && ( e.bSelected && this.tree
            .persistence.clearSelect( e.data.key ), e.bExpanded && this.tree.persistence.clearExpand( e.data
              .key ) ), e.removeChildren( !0 ), this.ul && this.ul.removeChild( e.li );
          for ( var n = 0, r = t.length; n < r; n++ )
            if ( t[ n ] === e ) {
              this.childList.splice( n, 1 );
              break
            }
        },
        removeChildren: function ( e, t ) {
          this.tree.logDebug( "%s.removeChildren(%o)", this, e );
          var n = this.tree,
            r = this.childList;
          if ( r ) {
            for ( var i = 0, s = r.length; i < s; i++ ) {
              var o = r[ i ];
              o === n.activeNode && !t && o.deactivate(), this.tree.options.persist && !t && ( o.bSelected && this
                .tree.persistence.clearSelect( o.data.key ), o.bExpanded && this.tree.persistence.clearExpand( o
                  .data.key ) ), o.removeChildren( !0, t ), this.ul && $( "li", $( this.ul ) ).remove()
            }
            this.childList = null
          }
          e || ( this._isLoading = !1, this.render() )
        },
        setTitle: function ( e ) {
          this.fromDict( {
            title: e
          } )
        },
        reload: function ( e ) {
          throw "Use reloadChildren() instead"
        },
        reloadChildren: function ( e ) {
          if ( this.parent === null ) throw "Use tree.reload() instead";
          if ( !this.data.isLazy ) throw "node.reloadChildren() requires lazy nodes.";
          if ( e ) {
            var t = this,
              n = "nodeLoaded.dynatree." + this.tree.$tree.attr( "id" ) + "." + this.data.key;
            this.tree.$tree.bind( n, function ( r, i, s ) {
              t.tree.$tree.unbind( n ), t.tree.logDebug( "loaded %o, %o, %o", r, i, s );
              if ( i !== t ) throw "got invalid load event";
              e.call( t.tree, i, s )
            } )
          }
          this.removeChildren(), this._loadContent()
        },
        _loadKeyPath: function ( e, t ) {
          var n = this.tree;
          n.logDebug( "%s._loadKeyPath(%s)", this, e );
          if ( e === "" ) throw "Key path must not be empty";
          var r = e.split( n.options.keyPathSeparator );
          if ( r[ 0 ] === "" ) throw "Key path must be relative (don't start with '/')";
          var i = r.shift();
          if ( this.childList )
            for ( var s = 0, o = this.childList.length; s < o; s++ ) {
              var u = this.childList[ s ];
              if ( u.data.key === i ) {
                if ( r.length === 0 ) t.call( n, u, "ok" );
                else if ( !u.data.isLazy || u.childList !== null && u.childList !== undefined ) t.call( n, u,
                  "loaded" ), u._loadKeyPath( r.join( n.options.keyPathSeparator ), t );
                else {
                  n.logDebug( "%s._loadKeyPath(%s) -> reloading %s...", this, e, u );
                  var a = this;
                  u.reloadChildren( function ( i, s ) {
                    s ? ( n.logDebug( "%s._loadKeyPath(%s) -> reloaded %s.", i, e, i ), t.call( n, u,
                      "loaded" ), i._loadKeyPath( r.join( n.options.keyPathSeparator ), t ) ) : ( n
                      .logWarning( "%s._loadKeyPath(%s) -> reloadChildren() failed.", a, e ), t.call( n, u,
                        "error" ) )
                  } )
                }
                return
              }
            }
          t.call( n, undefined, "notfound", i, r.length === 0 ), n.logWarning( "Node not found: " + i );
          return
        },
        resetLazy: function () {
          if ( this.parent === null ) throw "Use tree.reload() instead";
          if ( !this.data.isLazy ) throw "node.resetLazy() requires lazy nodes.";
          this.expand( !1 ), this.removeChildren()
        },
        _addChildNode: function ( e, t ) {
          var n = this.tree,
            r = n.options,
            i = n.persistence;
          e.parent = this, this.childList === null ? this.childList = [] : t || this.childList.length > 0 && $(
            this.childList[ this.childList.length - 1 ].span ).removeClass( r.classNames.lastsib );
          if ( t ) {
            var s = $.inArray( t, this.childList );
            if ( s < 0 ) throw "<beforeNode> must be a child of <this>";
            this.childList.splice( s, 0, e )
          } else this.childList.push( e );
          var o = n.isInitializing();
          r.persist && i.cookiesFound && o ? ( i.activeKey === e.data.key && ( n.activeNode = e ), i
            .focusedKey === e.data.key && ( n.focusNode = e ), e.bExpanded = $.inArray( e.data.key, i
              .expandedKeyList ) >= 0, e.bSelected = $.inArray( e.data.key, i.selectedKeyList ) >= 0 ) : ( e
            .data.activate && ( n.activeNode = e, r.persist && ( i.activeKey = e.data.key ) ), e.data.focus && (
              n.focusNode = e, r.persist && ( i.focusedKey = e.data.key ) ), e.bExpanded = e.data.expand === !0,
            e.bExpanded && r.persist && i.addExpand( e.data.key ), e.bSelected = e.data.select === !0, e
            .bSelected && r.persist && i.addSelect( e.data.key ) ), r.minExpandLevel >= e.getLevel() && ( this
            .bExpanded = !0 );
          if ( e.bSelected && r.selectMode == 3 ) {
            var u = this;
            while ( u ) u.hasSubSel || u._setSubSel( !0 ), u = u.parent
          }
          return n.bEnableUpdate && this.render(), e
        },
        addChild: function ( e, t ) {
          if ( typeof e == "string" ) throw "Invalid data type for " + e;
          if ( !e || e.length === 0 ) return;
          if ( e instanceof DynaTreeNode ) return this._addChildNode( e, t );
          e.length || ( e = [ e ] );
          var n = this.tree.enableUpdate( !1 ),
            r = null;
          for ( var i = 0, s = e.length; i < s; i++ ) {
            var o = e[ i ],
              u = this._addChildNode( new DynaTreeNode( this, this.tree, o ), t );
            r || ( r = u ), o.children && u.addChild( o.children, null )
          }
          return this.tree.enableUpdate( n ), r
        },
        append: function ( e ) {
          return this.tree.logWarning( "node.append() is deprecated (use node.addChild() instead)." ), this
            .addChild( e, null )
        },
        appendAjax: function ( e ) {
          var t = this;
          this.removeChildren( !1, !0 ), this.setLazyNodeStatus( DTNodeStatus_Loading );
          if ( e.debugLazyDelay ) {
            var n = e.debugLazyDelay;
            e.debugLazyDelay = 0, this.tree.logInfo( "appendAjax: waiting for debugLazyDelay " + n ), setTimeout(
              function () {
                t.appendAjax( e )
              }, n );
            return
          }
          var r = e.success,
            i = e.error,
            s = "nodeLoaded.dynatree." + this.tree.$tree.attr( "id" ) + "." + this.data.key,
            o = $.extend( {}, this.tree.options.ajaxDefaults, e, {
              success: function ( e, n, i ) {
                var u = t.tree.phase;
                t.tree.phase = "init", o.postProcess ? e = o.postProcess.call( this, e, this.dataType ) : e &&
                  e.hasOwnProperty( "d" ) && ( e = typeof e.d == "string" ? $.parseJSON( e.d ) : e.d ), ( !$
                    .isArray( e ) || e.length !== 0 ) && t.addChild( e, null ), t.tree.phase = "postInit",
                  r && r.call( o, t, e, n ), t.tree.logDebug( "trigger " + s ), t.tree.$tree.trigger( s, [ t,
                    !0
                  ] ), t.tree.phase = u, t.setLazyNodeStatus( DTNodeStatus_Ok ), $.isArray( e ) && e
                  .length === 0 && ( t.childList = [], t.render() )
              },
              error: function ( e, n, r ) {
                t.tree.logWarning( "appendAjax failed:", n, ":\n", e, "\n", r ), i && i.call( o, t, e, n, r ),
                  t.tree.$tree.trigger( s, [ t, !1 ] ), t.setLazyNodeStatus( DTNodeStatus_Error, {
                    info: n,
                    tooltip: "" + r
                  } )
              }
            } );
          $.ajax( o )
        },
        move: function ( e, t ) {
          var n;
          if ( this === e ) return;
          if ( !this.parent ) throw "Cannot move system root";
          if ( t === undefined || t == "over" ) t = "child";
          var r = this.parent,
            i = t === "child" ? e : e.parent;
          if ( i.isDescendantOf( this ) ) throw "Cannot move a node to it's own descendant";
          if ( this.parent.childList.length == 1 ) this.parent.childList = this.parent.data.isLazy ? [] : null,
            this.parent.bExpanded = !1;
          else {
            n = $.inArray( this, this.parent.childList );
            if ( n < 0 ) throw "Internal error";
            this.parent.childList.splice( n, 1 )
          }
          this.parent.ul && this.parent.ul.removeChild( this.li ), this.parent = i;
          if ( i.hasChildren() ) switch ( t ) {
            case "child":
              i.childList.push( this );
              break;
            case "before":
              n = $.inArray( e, i.childList );
              if ( n < 0 ) throw "Internal error";
              i.childList.splice( n, 0, this );
              break;
            case "after":
              n = $.inArray( e, i.childList );
              if ( n < 0 ) throw "Internal error";
              i.childList.splice( n + 1, 0, this );
              break;
            default:
              throw "Invalid mode " + t
          } else i.childList = [ this ];
          i.ul || ( i.ul = document.createElement( "ul" ), i.ul.style.display = "none", i.li.appendChild( i
            .ul ) ), this.li && i.ul.appendChild( this.li );
          if ( this.tree !== e.tree ) throw this.visit( function ( t ) {
            t.tree = e.tree
          }, null, !0 ), "Not yet implemented.";
          r.isDescendantOf( i ) || r.render(), i.isDescendantOf( r ) || i.render()
        },
        lastentry: undefined
      };
      var DynaTreeStatus = Class.create();
      DynaTreeStatus._getTreePersistData = function ( e, t ) {
        var n = new DynaTreeStatus( e, t );
        return n.read(), n.toDict()
      }, getDynaTreePersistData = DynaTreeStatus._getTreePersistData, DynaTreeStatus.prototype = {
        initialize: function ( e, t ) {
          e === undefined && ( e = $.ui.dynatree.prototype.options.cookieId ), t = $.extend( {}, $.ui.dynatree
              .prototype.options.cookie, t ), this.cookieId = e, this.cookieOpts = t, this.cookiesFound =
            undefined, this.activeKey = null, this.focusedKey = null, this.expandedKeyList = null, this
            .selectedKeyList = null
        },
        _log: function ( e ) {
          Array.prototype.unshift.apply( arguments, [ "debug" ] ), _log.apply( this, arguments )
        },
        read: function () {
          this.cookiesFound = !1;
          var e = $.cookie( this.cookieId + "-active" );
          this.activeKey = e === null ? "" : e, e !== null && ( this.cookiesFound = !0 ), e = $.cookie( this
              .cookieId + "-focus" ), this.focusedKey = e === null ? "" : e, e !== null && ( this.cookiesFound = !
              0 ), e = $.cookie( this.cookieId + "-expand" ), this.expandedKeyList = e === null ? [] : e.split(
              "," ), e !== null && ( this.cookiesFound = !0 ), e = $.cookie( this.cookieId + "-select" ), this
            .selectedKeyList = e === null ? [] : e.split( "," ), e !== null && ( this.cookiesFound = !0 )
        },
        write: function () {
          $.cookie( this.cookieId + "-active", this.activeKey === null ? "" : this.activeKey, this.cookieOpts ), $
            .cookie( this.cookieId + "-focus", this.focusedKey === null ? "" : this.focusedKey, this.cookieOpts ),
            $.cookie( this.cookieId + "-expand", this.expandedKeyList === null ? "" : this.expandedKeyList.join(
              "," ), this.cookieOpts ), $.cookie( this.cookieId + "-select", this.selectedKeyList === null ? "" :
              this.selectedKeyList.join( "," ), this.cookieOpts )
        },
        addExpand: function ( e ) {
          $.inArray( e, this.expandedKeyList ) < 0 && ( this.expandedKeyList.push( e ), $.cookie( this.cookieId +
            "-expand", this.expandedKeyList.join( "," ), this.cookieOpts ) )
        },
        clearExpand: function ( e ) {
          var t = $.inArray( e, this.expandedKeyList );
          t >= 0 && ( this.expandedKeyList.splice( t, 1 ), $.cookie( this.cookieId + "-expand", this
            .expandedKeyList.join( "," ), this.cookieOpts ) )
        },
        addSelect: function ( e ) {
          $.inArray( e, this.selectedKeyList ) < 0 && ( this.selectedKeyList.push( e ), $.cookie( this.cookieId +
            "-select", this.selectedKeyList.join( "," ), this.cookieOpts ) )
        },
        clearSelect: function ( e ) {
          var t = $.inArray( e, this.selectedKeyList );
          t >= 0 && ( this.selectedKeyList.splice( t, 1 ), $.cookie( this.cookieId + "-select", this
            .selectedKeyList.join( "," ), this.cookieOpts ) )
        },
        isReloading: function () {
          return this.cookiesFound === !0
        },
        toDict: function () {
          return {
            cookiesFound: this.cookiesFound,
            activeKey: this.activeKey,
            focusedKey: this.activeKey,
            expandedKeyList: this.expandedKeyList,
            selectedKeyList: this.selectedKeyList
          }
        },
        lastentry: undefined
      };
      var DynaTree = Class.create();
      DynaTree.version = "$Version:$", DynaTree.prototype = {
          initialize: function ( e ) {
            this.phase = "init", this.$widget = e, this.options = e.options, this.$tree = e.element, this.timer =
              null, this.divTree = this.$tree.get( 0 ), _initDragAndDrop( this )
          },
          _load: function ( e ) {
            var t = this.$widget,
              n = this.options,
              r = this;
            this.bEnableUpdate = !0, this._nodeCount = 1, this.activeNode = null, this.focusNode = null, n
              .rootVisible !== undefined && this.logWarning( "Option 'rootVisible' is no longer supported." ), n
              .minExpandLevel < 1 && ( this.logWarning( "Option 'minExpandLevel' must be >= 1." ), n
                .minExpandLevel = 1 ), n.classNames !== $.ui.dynatree.prototype.options.classNames && ( n
                .classNames = $.extend( {}, $.ui.dynatree.prototype.options.classNames, n.classNames ) ), n
              .ajaxDefaults !== $.ui.dynatree.prototype.options.ajaxDefaults && ( n.ajaxDefaults = $.extend( {}, $
                .ui.dynatree.prototype.options.ajaxDefaults, n.ajaxDefaults ) ), n.dnd !== $.ui.dynatree.prototype
              .options.dnd && ( n.dnd = $.extend( {}, $.ui.dynatree.prototype.options.dnd, n.dnd ) ), n.imagePath ||
              $( "script" ).each( function () {
                var e = /.*dynatree[^\/]*\.js$/i;
                if ( this.src.search( e ) >= 0 ) return this.src.indexOf( "/" ) >= 0 ? n.imagePath = this.src
                  .slice( 0, this.src.lastIndexOf( "/" ) ) + "/skin/" : n.imagePath = "skin/", r.logDebug(
                    "Guessing imagePath from '%s': '%s'", this.src, n.imagePath ), !1
              } ), this.persistence = new DynaTreeStatus( n.cookieId, n.cookie ), n.persist && ( $.cookie || _log(
                "warn", "Please include jquery.cookie.js to use persistence." ), this.persistence.read() ), this
              .logDebug( "DynaTree.persistence: %o", this.persistence.toDict() ), this.cache = {
                tagEmpty: "<span class='" + n.classNames.empty + "'></span>",
                tagVline: "<span class='" + n.classNames.vline + "'></span>",
                tagExpander: "<span class='" + n.classNames.expander + "'></span>",
                tagConnector: "<span class='" + n.classNames.connector + "'></span>",
                tagNodeIcon: "<span class='" + n.classNames.nodeIcon + "'></span>",
                tagCheckbox: "<span class='" + n.classNames.checkbox + "'></span>",
                lastentry: undefined
              }, ( n.children || n.initAjax && n.initAjax.url || n.initId ) && $( this.divTree ).empty();
            var i = this.$tree.find( ">ul:first" ).hide();
            this.tnRoot = new DynaTreeNode( null, this, {} ), this.tnRoot.bExpanded = !0, this.tnRoot.render(), this
              .divTree.appendChild( this.tnRoot.ul );
            var s = this.tnRoot,
              o = n.persist && this.persistence.isReloading(),
              u = !1,
              a = this.enableUpdate( !1 );
            this.logDebug( "Dynatree._load(): read tree structure..." ), n.children ? s.addChild( n.children ) : n
              .initAjax && n.initAjax.url ? ( u = !0, s.data.isLazy = !0, this._reloadAjax( e ) ) : n.initId ? this
              ._createFromTag( s, $( "#" + n.initId ) ) : ( this._createFromTag( s, i ), i.remove() ), this
              ._checkConsistency(), !u && n.selectMode == 3 && s._updatePartSelectionState(), this.logDebug(
                "Dynatree._load(): render nodes..." ), this.enableUpdate( a ), this.logDebug(
                "Dynatree._load(): bind events..." ), this.$widget.bind(), this.logDebug(
                "Dynatree._load(): postInit..." ), this.phase = "postInit", n.persist && this.persistence.write(),
              this.focusNode && this.focusNode.isVisible() && ( this.logDebug( "Focus on init: %o", this
                .focusNode ), this.focusNode.focus() ), u || ( n.onPostInit && n.onPostInit.call( this, o, !1 ),
                e && e.call( this, "ok" ) ), this.phase = "idle"
          },
          _reloadAjax: function ( e ) {
            var t = this.options;
            if ( !t.initAjax || !t.initAjax.url ) throw "tree.reload() requires 'initAjax' mode.";
            var n = this.persistence,
              r = $.extend( {}, t.initAjax );
            r.addActiveKey && ( r.data.activeKey = n.activeKey ), r.addFocusedKey && ( r.data.focusedKey = n
                .focusedKey ), r.addExpandedKeyList && ( r.data.expandedKeyList = n.expandedKeyList.join( "," ) ), r
              .addSelectedKeyList && ( r.data.selectedKeyList = n.selectedKeyList.join( "," ) ), r.success && this
              .logWarning( "initAjax: success callback is ignored; use onPostInit instead." ), r.error && this
              .logWarning( "initAjax: error callback is ignored; use onPostInit instead." );
            var i = n.isReloading();
            r.success = function ( n, r, s ) {
              t.selectMode == 3 && n.tree.tnRoot._updatePartSelectionState(), t.onPostInit && t.onPostInit.call( n
                .tree, i, !1 ), e && e.call( n.tree, "ok" )
            }, r.error = function ( n, r, s, o ) {
              t.onPostInit && t.onPostInit.call( n.tree, i, !0, r, s, o ), e && e.call( n.tree, "error", r, s, o )
            }, this.logDebug( "Dynatree._init(): send Ajax request..." ), this.tnRoot.appendAjax( r )
          },
          toString: function () {
            return "Dynatree '" + this.$tree.attr( "id" ) + "'"
          },
          toDict: function () {
            return this.tnRoot.toDict( !0 )
          },
          serializeArray: function ( e ) {
            var t = this.getSelectedNodes( e ),
              n = this.$tree.attr( "name" ) || this.$tree.attr( "id" ),
              r = [];
            for ( var i = 0, s = t.length; i < s; i++ ) r.push( {
              name: n,
              value: t[ i ].data.key
            } );
            return r
          },
          getPersistData: function () {
            return this.persistence.toDict()
          },
          logDebug: function ( e ) {
            this.options.debugLevel >= 2 && ( Array.prototype.unshift.apply( arguments, [ "debug" ] ), _log.apply(
              this, arguments ) )
          },
          logInfo: function ( e ) {
            this.options.debugLevel >= 1 && ( Array.prototype.unshift.apply( arguments, [ "info" ] ), _log.apply(
              this, arguments ) )
          },
          logWarning: function ( e ) {
            Array.prototype.unshift.apply( arguments, [ "warn" ] ), _log.apply( this, arguments )
          },
          isInitializing: function () {
            return this.phase == "init" || this.phase == "postInit"
          },
          isReloading: function () {
            return ( this.phase == "init" || this.phase == "postInit" ) && this.options.persist && this.persistence
              .cookiesFound
          },
          isUserEvent: function () {
            return this.phase == "userEvent"
          },
          redraw: function () {
            this.tnRoot.render( !1, !1 )
          },
          renderInvisibleNodes: function () {
            this.tnRoot.render( !1, !0 )
          },
          reload: function ( e ) {
            this._load( e )
          },
          getRoot: function () {
            return this.tnRoot
          },
          enable: function () {
            this.$widget.enable()
          },
          disable: function () {
            this.$widget.disable()
          },
          getNodeByKey: function ( e ) {
            var t = document.getElementById( this.options.idPrefix + e );
            if ( t ) return t.dtnode ? t.dtnode : null;
            var n = null;
            return this.visit( function ( t ) {
              if ( t.data.key === e ) return n = t, !1
            }, !0 ), n
          },
          getActiveNode: function () {
            return this.activeNode
          },
          reactivate: function ( e ) {
            var t = this.activeNode;
            t && ( this.activeNode = null, t.activate(), e && t.focus() )
          },
          getSelectedNodes: function ( e ) {
            var t = [];
            return this.tnRoot.visit( function ( n ) {
              if ( n.bSelected ) {
                t.push( n );
                if ( e === !0 ) return "skip"
              }
            } ), t
          },
          activateKey: function ( e ) {
            var t = e === null ? null : this.getNodeByKey( e );
            return t ? ( t.focus(), t.activate(), t ) : ( this.activeNode && this.activeNode.deactivate(), this
              .activeNode = null, null )
          },
          loadKeyPath: function ( e, t ) {
            var n = e.split( this.options.keyPathSeparator );
            return n[ 0 ] === "" && n.shift(), n[ 0 ] == this.tnRoot.data.key && ( this.logDebug(
                "Removed leading root key." ), n.shift() ), e = n.join( this.options.keyPathSeparator ), this.tnRoot
              ._loadKeyPath( e, t )
          },
          selectKey: function ( e, t ) {
            var n = this.getNodeByKey( e );
            return n ? ( n.select( t ), n ) : null
          },
          enableUpdate: function ( e ) {
            return this.bEnableUpdate == e ? e : ( this.bEnableUpdate = e, e && this.redraw(), !e )
          },
          count: function () {
            return this.tnRoot.countChildren()
          },
          visit: function ( e, t ) {
            return this.tnRoot.visit( e, t )
          },
          _createFromTag: function ( parentTreeNode, $ulParent ) {
            var self = this;
            $ulParent.find( ">li" ).each( function () {
              var $li = $( this ),
                $liSpan = $li.find( ">span:first" ),
                $liA = $li.find( ">a:first" ),
                title, href = null,
                target = null,
                tooltip;
              if ( $liSpan.length ) title = $liSpan.html();
              else if ( $liA.length ) title = $liA.html(), href = $liA.attr( "href" ), target = $liA.attr(
                "target" ), tooltip = $liA.attr( "title" );
              else {
                title = $li.html();
                var iPos = title.search( /<ul/i );
                iPos >= 0 ? title = $.trim( title.substring( 0, iPos ) ) : title = $.trim( title )
              }
              var data = {
                title: title,
                tooltip: tooltip,
                isFolder: $li.hasClass( "folder" ),
                isLazy: $li.hasClass( "lazy" ),
                expand: $li.hasClass( "expanded" ),
                select: $li.hasClass( "selected" ),
                activate: $li.hasClass( "active" ),
                focus: $li.hasClass( "focused" ),
                noLink: $li.hasClass( "noLink" )
              };
              href && ( data.href = href, data.target = target ), $li.attr( "title" ) && ( data.tooltip = $li
                .attr( "title" ) ), $li.attr( "id" ) && ( data.key = "" + $li.attr( "id" ) );
              if ( $li.attr( "data" ) ) {
                var dataAttr = $.trim( $li.attr( "data" ) );
                if ( dataAttr ) {
                  dataAttr.charAt( 0 ) != "{" && ( dataAttr = "{" + dataAttr + "}" );
                  try {
                    $.extend( data, eval( "(" + dataAttr + ")" ) )
                  } catch ( e ) {
                    throw "Error parsing node data: " + e + "\ndata:\n'" + dataAttr + "'"
                  }
                }
              }
              var childNode = parentTreeNode.addChild( data ),
                $ul = $li.find( ">ul:first" );
              $ul.length && self._createFromTag( childNode, $ul )
            } )
          },
          _checkConsistency: function () {},
          _setDndStatus: function ( e, t, n, r, i ) {
            var s = e ? $( e.span ) : null,
              o = $( t.span );
            this.$dndMarker || ( this.$dndMarker = $( "<div id='dynatree-drop-marker'></div>" ).hide().css( {
              "z-index": 1e3
            } ).prependTo( $( this.divTree ).parent() ) );
            if ( r === "after" || r === "before" || r === "over" ) {
              var u = "0 0";
              switch ( r ) {
                case "before":
                  this.$dndMarker.removeClass( "dynatree-drop-after dynatree-drop-over" ), this.$dndMarker.addClass(
                    "dynatree-drop-before" ), u = "0 -8";
                  break;
                case "after":
                  this.$dndMarker.removeClass( "dynatree-drop-before dynatree-drop-over" ), this.$dndMarker
                    .addClass( "dynatree-drop-after" ), u = "0 8";
                  break;
                default:
                  this.$dndMarker.removeClass( "dynatree-drop-after dynatree-drop-before" ), this.$dndMarker
                    .addClass( "dynatree-drop-over" ), o.addClass( "dynatree-drop-target" ), u = "8 0"
              }
              this.$dndMarker.show().position( {
                my: "left top",
                at: "left top",
                of: o,
                offset: u
              } )
            } else o.removeClass( "dynatree-drop-target" ), this.$dndMarker.hide();
            r === "after" ? o.addClass( "dynatree-drop-after" ) : o.removeClass( "dynatree-drop-after" ), r ===
              "before" ? o.addClass( "dynatree-drop-before" ) : o.removeClass( "dynatree-drop-before" ), i === !0 ?
              ( s && s.addClass( "dynatree-drop-accept" ), o.addClass( "dynatree-drop-accept" ), n.addClass(
                "dynatree-drop-accept" ) ) : ( s && s.removeClass( "dynatree-drop-accept" ), o.removeClass(
                "dynatree-drop-accept" ), n.removeClass( "dynatree-drop-accept" ) ), i === !1 ? ( s && s.addClass(
                "dynatree-drop-reject" ), o.addClass( "dynatree-drop-reject" ), n.addClass(
                "dynatree-drop-reject" ) ) : ( s && s.removeClass( "dynatree-drop-reject" ), o.removeClass(
                "dynatree-drop-reject" ), n.removeClass( "dynatree-drop-reject" ) )
          },
          _onDragEvent: function ( e, t, n, r, i, s ) {
            var o = this.options,
              u = this.options.dnd,
              a = null,
              f = $( t.span ),
              l, c;
            switch ( e ) {
              case "helper":
                var h = $( "<div class='dynatree-drag-helper'><span class='dynatree-drag-helper-img' /></div>" )
                  .append( $( r.target ).closest( ".dynatree-title" ).clone() );
                $( "ul.dynatree-container", t.tree.divTree ).append( h ), h.data( "dtSourceNode", t ), a = h;
                break;
              case "start":
                t.isStatusNode() ? a = !1 : u.onDragStart && ( a = u.onDragStart( t ) ), a === !1 ? ( this.logDebug(
                  "tree.onDragStart() cancelled" ), i.helper.trigger( "mouseup" ), i.helper.hide() ) : f.addClass(
                  "dynatree-drag-source" );
                break;
              case "enter":
                a = u.onDragEnter ? u.onDragEnter( t, n ) : null, a ? a = {
                  over: a === !0 || a === "over" || $.inArray( "over", a ) >= 0,
                  before: a === !0 || a === "before" || $.inArray( "before", a ) >= 0,
                  after: a === !0 || a === "after" || $.inArray( "after", a ) >= 0
                } : a = !1, i.helper.data( "enterResponse", a );
                break;
              case "over":
                c = i.helper.data( "enterResponse" ), l = null;
                if ( c !== !1 )
                  if ( typeof c == "string" ) l = c;
                  else {
                    var p = f.offset(),
                      d = {
                        x: r.pageX - p.left,
                        y: r.pageY - p.top
                      },
                      v = {
                        x: d.x / f.width(),
                        y: d.y / f.height()
                      };
                    c.after && v.y > .75 ? l = "after" : !c.over && c.after && v.y > .5 ? l = "after" : c.before &&
                      v.y <= .25 ? l = "before" : !c.over && c.before && v.y <= .5 ? l = "before" : c.over && ( l =
                        "over" ), u.preventVoidMoves && ( t === n ? l = null : l === "before" && n && t === n
                        .getNextSibling() ? l = null : l === "after" && n && t === n.getPrevSibling() ? l = null :
                        l === "over" && n && n.parent === t && n.isLastSibling() && ( l = null ) ), i.helper.data(
                        "hitMode", l )
                  } l === "over" && u.autoExpandMS && t.hasChildren() !== !1 && !t.bExpanded && t.scheduleAction(
                  "expand", u.autoExpandMS );
                if ( l && u.onDragOver ) {
                  a = u.onDragOver( t, n, l );
                  if ( a === "over" || a === "before" || a === "after" ) l = a
                }
                this._setDndStatus( n, t, i.helper, l, a !== !1 && l !== null );
                break;
              case "drop":
                var m = i.helper.hasClass( "dynatree-drop-reject" );
                l = i.helper.data( "hitMode" ), l && u.onDrop && !m && u.onDrop( t, n, l, i, s );
                break;
              case "leave":
                t.scheduleAction( "cancel" ), i.helper.data( "enterResponse", null ), i.helper.data( "hitMode",
                  null ), this._setDndStatus( n, t, i.helper, "out", undefined ), u.onDragLeave && u.onDragLeave(
                  t, n );
                break;
              case "stop":
                f.removeClass( "dynatree-drag-source" ), u.onDragStop && u.onDragStop( t );
                break;
              default:
                throw "Unsupported drag event: " + e
            }
            return a
          },
          cancelDrag: function () {
            var e = $.ui.ddmanager.current;
            e && e.cancel()
          },
          lastentry: undefined
        }, $.widget( "ui.dynatree", {
          _init: function () {
            if ( versionCompare( $.ui.version, "1.8" ) < 0 ) return this.options.debugLevel >= 0 && _log( "warn",
                "ui.dynatree._init() was called; you should upgrade to jquery.ui.core.js v1.8 or higher." ),
              this._create();
            this.options.debugLevel >= 2 && _log( "debug",
              "ui.dynatree._init() was called; no current default functionality." )
          },
          _create: function () {
            var e = this.options;
            e.debugLevel >= 1 && logMsg( "Dynatree._create(): version='%s', debugLevel=%o.", $.ui.dynatree
              .version, this.options.debugLevel ), this.options.event += ".dynatree";
            var t = this.element.get( 0 );
            this.tree = new DynaTree( this ), this.tree._load(), this.tree.logDebug( "Dynatree._init(): done." )
          },
          bind: function () {
            function t( e ) {
              e = $.event.fix( e || window.event );
              var t = $.ui.dynatree.getNode( e.target );
              return t ? t._onFocus( e ) : !1
            }
            this.unbind();
            var e = "click.dynatree dblclick.dynatree";
            this.options.keyboard && ( e += " keypress.dynatree keydown.dynatree" ), this.element.bind( e,
              function ( e ) {
                var t = $.ui.dynatree.getNode( e.target );
                if ( !t ) return !0;
                var n = t.tree,
                  r = n.options;
                n.logDebug( "event(%s): dtnode: %s", e.type, t );
                var i = n.phase;
                n.phase = "userEvent";
                try {
                  switch ( e.type ) {
                    case "click":
                      return r.onClick && r.onClick.call( n, t, e ) === !1 ? !1 : t._onClick( e );
                    case "dblclick":
                      return r.onDblClick && r.onDblClick.call( n, t, e ) === !1 ? !1 : t._onDblClick( e );
                    case "keydown":
                      return r.onKeydown && r.onKeydown.call( n, t, e ) === !1 ? !1 : t._onKeydown( e );
                    case "keypress":
                      return r.onKeypress && r.onKeypress.call( n, t, e ) === !1 ? !1 : t._onKeypress( e )
                  }
                } catch ( s ) {
                  var o = null;
                  n.logWarning( "bind(%o): dtnode: %o, error: %o", e, t, s )
                } finally {
                  n.phase = i
                }
              } );
            var n = this.tree.divTree;
            n.addEventListener ? ( n.addEventListener( "focus", t, !0 ), n.addEventListener( "blur", t, !0 ) ) : n
              .onfocusin = n.onfocusout = t
          },
          unbind: function () {
            this.element.unbind( ".dynatree" )
          },
          enable: function () {
            this.bind(), $.Widget.prototype.enable.apply( this, arguments )
          },
          disable: function () {
            this.unbind(), $.Widget.prototype.disable.apply( this, arguments )
          },
          getTree: function () {
            return this.tree
          },
          getRoot: function () {
            return this.tree.getRoot()
          },
          getActiveNode: function () {
            return this.tree.getActiveNode()
          },
          getSelectedNodes: function () {
            return this.tree.getSelectedNodes()
          },
          lastentry: undefined
        } ), versionCompare( $.ui.version, "1.8" ) < 0 && ( $.ui.dynatree.getter =
          "getTree getRoot getActiveNode getSelectedNodes" ), $.ui.dynatree.version = "$Version:$", $.ui.dynatree
        .getNode = function ( e ) {
          if ( e instanceof DynaTreeNode ) return e;
          e.selector !== undefined && ( e = e[ 0 ] );
          while ( e ) {
            if ( e.dtnode ) return e.dtnode;
            e = e.parentNode
          }
          return null
        }, $.ui.dynatree.getPersistData = DynaTreeStatus._getTreePersistData, $.ui.dynatree.prototype.options = {
          title: "Dynatree",
          minExpandLevel: 1,
          imagePath: null,
          children: null,
          initId: null,
          initAjax: null,
          autoFocus: !0,
          keyboard: !0,
          persist: !1,
          autoCollapse: !1,
          clickFolderMode: 3,
          activeVisible: !0,
          checkbox: !1,
          selectMode: 2,
          fx: null,
          noLink: !1,
          onClick: null,
          onDblClick: null,
          onKeydown: null,
          onKeypress: null,
          onFocus: null,
          onBlur: null,
          onQueryActivate: null,
          onQuerySelect: null,
          onQueryExpand: null,
          onPostInit: null,
          onActivate: null,
          onDeactivate: null,
          onSelect: null,
          onExpand: null,
          onLazyRead: null,
          onCustomRender: null,
          onCreate: null,
          onRender: null,
          postProcess: null,
          dnd: {
            onDragStart: null,
            onDragStop: null,
            autoExpandMS: 1e3,
            preventVoidMoves: !0,
            onDragEnter: null,
            onDragOver: null,
            onDrop: null,
            onDragLeave: null
          },
          ajaxDefaults: {
            cache: !1,
            timeout: 0,
            dataType: "json"
          },
          strings: {
            loading: "Loading&#8230;",
            loadError: "Load error!"
          },
          generateIds: !1,
          idPrefix: "dynatree-id-",
          keyPathSeparator: "/",
          cookieId: "dynatree",
          cookie: {
            expires: null
          },
          classNames: {
            container: "dynatree-container",
            node: "dynatree-node",
            folder: "dynatree-folder",
            empty: "dynatree-empty",
            vline: "dynatree-vline",
            expander: "dynatree-expander",
            connector: "dynatree-connector",
            checkbox: "dynatree-checkbox",
            nodeIcon: "dynatree-icon",
            title: "dynatree-title",
            noConnector: "dynatree-no-connector",
            nodeError: "dynatree-statusnode-error",
            nodeWait: "dynatree-statusnode-wait",
            hidden: "dynatree-hidden",
            combinedExpanderPrefix: "dynatree-exp-",
            combinedIconPrefix: "dynatree-ico-",
            nodeLoading: "dynatree-loading",
            hasChildren: "dynatree-has-children",
            active: "dynatree-active",
            selected: "dynatree-selected",
            expanded: "dynatree-expanded",
            lazy: "dynatree-lazy",
            focused: "dynatree-focused",
            partsel: "dynatree-partsel",
            lastsib: "dynatree-lastsib"
          },
          debugLevel: 2,
          lastentry: undefined
        }, versionCompare( $.ui.version, "1.8" ) < 0 && ( $.ui.dynatree.defaults = $.ui.dynatree.prototype.options ),
        $.ui.dynatree.nodedatadefaults = {
          title: null,
          key: null,
          isFolder: !1,
          isLazy: !1,
          tooltip: null,
          href: null,
          icon: null,
          addClass: null,
          noLink: !1,
          activate: !1,
          focus: !1,
          expand: !1,
          select: !1,
          hideCheckbox: !1,
          unselectable: !1,
          children: null,
          lastentry: undefined
        };
      var didRegisterDnd = !1,
        _registerDnd = function () {
          if ( didRegisterDnd ) return;
          $.ui.plugin.add( "draggable", "connectToDynatree", {
            start: function ( e, t ) {
              var n = $( this ).data( "ui-draggable" ) || $( this ).data( "draggable" ),
                r = t.helper.data( "dtSourceNode" ) || null;
              if ( r ) return n.offset.click.top = -2, n.offset.click.left = 16, r.tree._onDragEvent( "start",
                r, null, e, t, n )
            },
            drag: function ( e, t ) {
              var n = $( this ).data( "ui-draggable" ) || $( this ).data( "draggable" ),
                r = t.helper.data( "dtSourceNode" ) || null,
                i = t.helper.data( "dtTargetNode" ) || null,
                s = $.ui.dynatree.getNode( e.target );
              if ( e.target && !s ) {
                var o = $( e.target ).closest( "div.dynatree-drag-helper,#dynatree-drop-marker" ).length > 0;
                if ( o ) return
              }
              t.helper.data( "dtTargetNode", s ), i && i !== s && i.tree._onDragEvent( "leave", i, r, e, t, n ),
                s && ( !s.tree.options.dnd.onDrop || ( s === i ? s.tree._onDragEvent( "over", s, r, e, t, n ) :
                  s.tree._onDragEvent( "enter", s, r, e, t, n ) ) )
            },
            stop: function ( e, t ) {
              var n = $( this ).data( "ui-draggable" ) || $( this ).data( "draggable" ),
                r = t.helper.data( "dtSourceNode" ) || null,
                i = t.helper.data( "dtTargetNode" ) || null,
                s = n._mouseDownEvent,
                o = e.type,
                u = o == "mouseup" && e.which == 1;
              logMsg( "draggable-connectToDynatree.stop: targetNode(from event): %s, dtTargetNode: %s", i, t
                  .helper.data( "dtTargetNode" ) ), u || logMsg( "Drag was cancelled" ), i && ( u && i.tree
                  ._onDragEvent( "drop", i, r, e, t, n ), i.tree._onDragEvent( "leave", i, r, e, t, n ) ), r &&
                r.tree._onDragEvent( "stop", r, null, e, t, n )
            }
          } ), didRegisterDnd = !0
        }
    } )( jQuery );
  </script>

  <script type="text/javascript">
    'use strict';

    /* --- Snap2HTML Code --- */

    var dirs = []; // contains all directories

    /*
        Data format:
            Each index in "dirs" array is an array representing a directory:
                First item in array: "directory path*always 0*directory modified date"
                    Note that forward slashes are used instead of (Windows style) backslashes
                Then, for each each file in the directory: "filename*size of file*file modified date"
                Second to last item in array tells the total size of directory content
                Last item in array refrences IDs to all subdirectories of this dir (if any).
                    ID is the item index in dirs array.
            Note: Modified date is in UNIX format
                    
    */

    // to save space I create aliases for dirs array and push() method on Array object
    var D = dirs;
    Array.prototype.p = Array.prototype.push;

    D.p( [ "C:/Users/bryan/Downloads/front-end-temp*0*1624494903", 0, "1*3" ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/CSS_TechChallenge-master*0*1624494903",
      "chess.gif*2547071*1504046578", "chess.html*4708*1504046578", "README.md*797*1504046578", 2552576, "2"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/CSS_TechChallenge-master/img*0*1624494903",
      "bB.png*1405*1504046578", "bK.png*3009*1504046578", "bN.png*1875*1504046578", "bP.png*777*1504046578",
      "bQ.png*2648*1504046578", "bR.png*748*1504046578", "wB.png*2374*1504046578", "wK.png*2823*1504046578",
      "wN.png*2388*1504046578", "wP.png*1571*1504046578", "wQ.png*3812*1504046578", "wR.png*1097*1504046578", 24527,
      ""
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master*0*1624494903", ".gitignore*12*1504112255",
      "package.json*722*1504112255", "package-lock.json*132681*1504112255", "README.md*5259*1504112255",
      "webpack.config.js*669*1504112255", "yarn.lock*124504*1504112255", 263847, "4*12"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist*0*1624494903",
      "bundle.js*831140*1504112255", "index.html*1914*1504112255", "style.css*761*1504112255", 833815, "5"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib*0*1624494903", 0, "6" ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard*0*1624494903", 0,
      "7*8*11"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard/css*0*1624494903",
      "chessboard-0.3.0.css*1275*1504112255", "chessboard-0.3.0.min.css*833*1504112255", 2108, ""
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard/img*0*1624494903", 0,
      "9"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard/img/chesspieces*0*1624494903",
      0, "10"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard/img/chesspieces/wikipedia*0*1624494903",
      "bB.png*1405*1504112255", "bK.png*3009*1504112255", "bN.png*1875*1504112255", "bP.png*777*1504112255",
      "bQ.png*2648*1504112255", "bR.png*748*1504112255", "wB.png*2374*1504112255", "wK.png*2823*1504112255",
      "wN.png*2388*1504112255", "wP.png*1571*1504112255", "wQ.png*3812*1504112255", "wR.png*1097*1504112255", 24527,
      ""
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/dist/lib/chessboard/js*0*1624494903",
      "chessboard-0.3.0.js*47574*1504112255", "chessboard-0.3.0.min.js*15008*1504112255", 62582, ""
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/src*0*1624494903",
      "ChessBoardFactory.js*1001*1504112255", "helpers.js*1052*1504112255", "index.js*1652*1504112255", 3705, "13"
    ] )
    D.p( [ "C:/Users/bryan/Downloads/front-end-temp/JS_TechChallenge-master/src/Blockchain*0*1624494903",
      "block.hbs*587*1504112255", "Block.js*2000*1504112255", "Blockchain.js*2851*1504112255", 5438, ""
    ] )



    delete( Array.prototype.p ); // remove alias added above

    $( document ).ready( function () {

      var numberOfFiles = 46;

      var linkFiles = true;
      var linkProtocol = "file://";
      var linkRoot = "C:/Users/bryan/Downloads/front-end-temp/";
      var sourceRoot = "C:/Users/bryan/Downloads/front-end-temp";
      var sourceParent = sourceRoot.substring( 0, sourceRoot.lastIndexOf( "/" ) + 1 );
      var originalHash = location.hash.replace( /#/, "" );
      var SelectedFolderID = "-1";
      var currentView;
      var onlyLinkExtensions = []; // example: ["jpg","png"]

      /* ---  Init --- */

      $( "#tot_size" ).text( bytesToSize( $( "#tot_size" ).text() ) );

      $( "#loading" ).remove();
      $( "#content" ).show();

      // set size of areas
      $( "#content" ).height( $( "#wrapper" ).outerHeight( true ) - $( "#app_header" ).outerHeight( true ) - 1 );
      setTimeout( function () {
        $( "#list_files" ).height( $( "#content" ).height() - $( "#list_header" ).outerHeight( true ) - $(
          "#list_footer" ).outerHeight( true ) - 1 );
      }, 1 );

      $( "#content" ).splitter( {
        sizeLeft: 200
      } );

      // build parent folder lookup
      window.parent_folders = [];
      parent_folders[ 0 ] = 0;
      var numDirs = dirs.length;
      for ( var id = 0; id < numDirs; id++ ) {
        var subdirs = getSubdirs( id );
        if ( subdirs != "" ) {
          for ( var c = 0; c < subdirs.length; c++ ) {
            parent_folders[ subdirs[ c ] ] = id;
          }
        }
      }


      $.tablesorter.addParser( {
        // set a unique id
        id: 'datasort',
        is: function ( s, table, cell, $cell ) {
          // return false so this parser is not auto detected
          return false;
        },
        format: function ( s, table, cell, cellIndex ) {
          var $cell = $( cell );
          // returns data-attribute, or cell text (s) if it doesn't exist
          return $cell.attr( 'data-sort' ) || s;
        },
        // flag for filter widget (true = ALWAYS search parsed values; false = search cell text)
        parsed: false,
        // set type, either numeric or text
        type: 'numeric'
      } );





      /* --- Events --- */

      $( "#search_form" ).submit( function () {
        return false;
      } );

      var addFolderClickEventHandlers = function () {
        $( "#list_files a.folder_link" ).click( function () {
          expandToFolder( $( this ).attr( 'id' ) );
          return false;
        } );
      }

      // handle clicks on folders in file list
      $( "body" ).delegate( "a.folder_link", "click", function () {
        expandToFolder( $( this ).attr( 'id' ) );
        return false;
      } );

      // Handle window resize
      var resizeHandler = debounce( function () {
        // resize is mostly automatic, but we need set the height manually and to tell the splitter to redraw
        $( "#content" ).height( $( "#wrapper" ).outerHeight( true ) - $( "#app_header" ).outerHeight( true ) -
          1 );
        $( "#content" ).trigger( "resize" );
        // for some reason it still did not redraw correctly unless I added a second resize trigger...
        $( "#content" ).height( $( "#wrapper" ).outerHeight( true ) - $( "#app_header" ).outerHeight( true ) -
          1 );
        $( "#content" ).trigger( "resize" );
        // also re-calculate height of file list
        $( "#list_files" ).height( $( "#content" ).height() - $( "#list_header" ).outerHeight( true ) - $(
          "#list_footer" ).outerHeight( true ) - 1 );
      }, 250 );
      window.addEventListener( 'resize', resizeHandler );


      /* --- Search for files --- */

      var searchDelay = 250;
      if ( numberOfFiles > 1000 ) searchDelay = 1000;

      var searchKeyPressHandler = debounce( function ( keyEvent ) {
        // cancel debounced event if no keyEvent
        if ( !keyEvent ) return;

        // skip searching on keys: tab, shift, ctrl, alt, end, home, arrows
        var keysToSkip = [ 9, 16, 17, 18, 35, 36, 37, 38, 39, 40 ];
        if ( keysToSkip.indexOf( keyEvent.keyCode ) !== -1 ) {
          return;
        }

        // on mobile, skip auto search on keypress
        if ( /Mobi/.test( navigator.userAgent ) ) {
          return;
        }

        doSearch( false );
      }, searchDelay );
      document.getElementById( "search_text" ).addEventListener( 'input',
      searchKeyPressHandler ); // for handling pressing the x
      document.getElementById( "search_text" ).addEventListener( 'keypress', searchKeyPressHandler );
      document.getElementById( "search_text" ).addEventListener( 'keypress', function ( keyEvent ) {
        if ( keyEvent.keyCode == 13 ) { // on enter key search immediately
          searchKeyPressHandler( null ); // cancel any current debounced event
          doSearch( true );
        }
      } );


      var SearchFilenames = [];
      var SearchLocations = [];
      var SearchLocationsRaw = [];
      var SearchLocationsID = [];
      var SearchIsDir = [];
      var PreviouslySelectedNode = null;
      var PreviousSearchFor = "";
      var PreviousSearchForMode = "all";
      var currentDir = "";
      var currentDirID = -1;

      function doSearch( enterPressed ) {

        var SearchFor = $( "#search_text" ).val().toLowerCase();

        if ( String.prototype.trim ) { // in case not available in browser
          SearchFor = SearchFor.trim();
        }

        // prevent automatic search for short queries
        if ( SearchFor.length > 0 && SearchFor.length <= 2 && !enterPressed ) return;

        // search only current folder and optionally subfolders using > and >>
        var SearchForMode = "all";
        var searchThisDirOnly = false;
        var searchThisDirOnlyIncludeSubdirs = false;
        if ( SearchFor.indexOf( ">" ) === 0 ) {
          searchThisDirOnly = true;
          SearchForMode = "dir";
          SearchFor = SearchFor.substr( 1 ); // removes first character
          if ( SearchFor.indexOf( ">" ) === 0 ) {
            searchThisDirOnlyIncludeSubdirs = true;
            SearchFor = SearchFor.substr( 1 );
            SearchForMode = "subdirs";
          }
        }

        // prevent searching twice
        if ( SearchFor === PreviousSearchFor && PreviousSearchForMode === SearchForMode ) return;
        PreviousSearchFor = SearchFor;
        PreviousSearchForMode = SearchForMode;

        if ( SearchFor === "" ) {
          if ( PreviouslySelectedNode != null ) {
            PreviouslySelectedNode.activate();
            PreviouslySelectedNode = null;
          }
          return;
        }

        var showLocationColumn = true;

        if ( numberOfFiles > 5000 ) {
          $( "#search_indicator" ).show();
          //$("#list_header").html( "Searching..." );
          showLocationColumn = false;
        }

        location.hash = "";

        setTimeout( function () { // timeout allows redrawing screen before possible time consuming search

          if ( SelectedFolderID != -1 ) {
            PreviouslySelectedNode = $( "#treeview" ).dynatree( "getActiveNode" );
            SelectedFolderID = "-1";
            $( "#treeview" ).dynatree( "getActiveNode" ).deactivate();
          }

          var hide_root = ( sourceRoot.length > 3 );
          var numDirs = dirs.length;
          var c;

          // if no previous search, do some pre-processing for faster search
          if ( SearchFilenames.length === 0 ) {
            var nFound = 0;
            for ( c = 1; c < numDirs; c++ ) // dirs first...
            {
              SearchFilenames[ nFound ] = dirs[ c ][ 0 ].split( "*" );
              SearchFilenames[ nFound ][ 0 ] = getDirName( c );
              SearchFilenames[ nFound ][ 3 ] = SearchFilenames[ nFound ][
              0 ]; // keep original name (in non-lowercase)
              SearchFilenames[ nFound ][ 0 ] = SearchFilenames[ nFound ][ 0 ].toLowerCase();
              //SearchFilenames[nFound][1] = Number(SearchFilenames[nFound][1]);
              SearchFilenames[ nFound ][ 1 ] = Number( getDirTreeSize( c ) );
              SearchLocationsRaw[ nFound ] = getDirNameAndPath( c );
              if ( hide_root )
                SearchLocations[ nFound ] = SearchLocationsRaw[ nFound ].substring( sourceParent.length );
              else
                SearchLocations[ nFound ] = SearchLocationsRaw[ nFound ];
              SearchLocations[ nFound ] = SearchLocations[ nFound ].replace( /\//g,
                "\\" ) // replace forward slash / with windows style \ backslash
              SearchLocationsID[ nFound ] = c;
              SearchIsDir[ nFound ] = true;
              nFound++;
            }
            for ( c = 0; c < numDirs; c++ ) // ...then all files
            {
              var arrLength = dirs[ c ].length;
              for ( var c2 = 1; c2 < arrLength - 2; c2++ ) {
                SearchFilenames[ nFound ] = dirs[ c ][ c2 ].split( "*" );
                SearchFilenames[ nFound ][ 3 ] = SearchFilenames[ nFound ][
                0 ]; // keep original name (in non-lowercase)
                SearchFilenames[ nFound ][ 0 ] = SearchFilenames[ nFound ][ 0 ].toLowerCase();
                SearchFilenames[ nFound ][ 1 ] = Number( SearchFilenames[ nFound ][ 1 ] );
                SearchLocationsRaw[ nFound ] = getDirNameAndPath( c );
                if ( hide_root )
                  SearchLocations[ nFound ] = SearchLocationsRaw[ nFound ].substring( sourceParent.length );
                else
                  SearchLocations[ nFound ] = SearchLocationsRaw[ nFound ];
                SearchLocations[ nFound ] = SearchLocations[ nFound ].replace( /\//g,
                  "\\" ) // replace forward slash / with windows style \ backslash
                SearchLocationsID[ nFound ] = c;
                SearchIsDir[ nFound ] = false;
                nFound++;
              }
            }
          }

          var locationHtml = "";

          if ( showLocationColumn ) locationHtml = "<th>Folder</th>";

          currentView = [];
          var table_html = "";
          table_html += "<table id='files' class='tablesorter'><thead><tr><th>Name</th>" +
            locationHtml +
            "<th>Size</th><th>Modified</th></tr></thead><tbody>";

          var countFiles = 0;
          var countDirs = 0;
          var sizeFiles = 0;
          var sizeDirs = 0;

          function foundItem( index ) {
            var dir_tmp = getDirNameAndPath( SearchLocationsID[ index ] );

            if ( searchThisDirOnly ) {
              var path = getPathToDir( SearchLocationsID[ index ] );

              if ( path.indexOf( currentDirID ) === -1 ) {
                // skip items not in current path
                return;
              }

              if ( path[ path.length - 1 ] === currentDirID ) {
                // file in current dir --> ok for both searchThisDirOnly and searchThisDirOnlyIncludeSubdirs
                if ( SearchIsDir[ index ] && SearchLocationsID[ index ] == currentDirID ) {
                  // always skip current dir which appears here
                  return;
                }
                console.log( "   file in current dir" );
              } else if ( SearchIsDir[ index ] && path[ path.length - 2 ] === currentDirID ) {
                // dir in current dir are also ok
              } else if ( path.indexOf( currentDirID ) !== -1 ) {
                // item is in a subdir: ok for searchThisDirOnlyIncludeSubdirs
                if ( !searchThisDirOnlyIncludeSubdirs ) {
                  return;
                }
              }
            }

            dir_tmp = dir_tmp.substring( sourceRoot.length );
            if ( dir_tmp != "" ) dir_tmp += "/";

            if ( SearchIsDir[ index ] === true ) {
              countDirs++;
              sizeDirs += SearchFilenames[ index ][ 1 ];
              var subdir_id = parent_folders[ SearchLocationsID[ index ] ];

              var timestamp = timestampToDate( SearchFilenames[ index ][ 2 ] );

              locationHtml = "";
              if ( showLocationColumn ) {
                var located_in = SearchLocations[ index ];
                if ( located_in === "" ) located_in = "[.]"
                located_in = located_in.substring( 0, located_in.lastIndexOf( "\\" ) );
                locationHtml = "<td><span class='file_folder'><a href=\"#\" class=\"folder_link\" id=\"" +
                  subdir_id + "\"> " + located_in + "</a></span></td>";
              }

              table_html +=
                "<tr>" +
                "<td><span class='file_folder'><a href=\"#\" class=\"folder_link\" id=\"" + SearchLocationsID[
                  index ] + "\"> " + SearchFilenames[ index ][ 3 ] + "</a></span></td>" +
                locationHtml +
                "<td class='size' data-sort='" + SearchFilenames[ index ][ 1 ] + "'>" + bytesToSize(
                  SearchFilenames[ index ][ 1 ] ) + "</td>" +
                "<td class='date' data-sort='" + SearchFilenames[ index ][ 2 ] + "'>" + timestamp + "</td>" +
                "</tr>";
              currentView.push( {
                "name": SearchFilenames[ index ][ 3 ],
                "path": SearchLocationsRaw[ index ].replace( /\//g, "\\" ),
                "type": "dir",
                "size": SearchFilenames[ index ][ 1 ],
                "date": SearchFilenames[ index ][ 2 ]
              } );
            } else // files
            {
              sizeFiles += SearchFilenames[ index ][ 1 ];
              countFiles++;

              var file_tmp = SearchFilenames[ index ][ 3 ];

              if ( linkFiles ) {
                var ext = file_tmp.split( '.' ).pop();
                if ( onlyLinkExtensions.length === 0 || onlyLinkExtensions.indexOf( ext ) !== -1 ) {

                  file_tmp = linkProtocol + linkRoot + dir_tmp.replace( "\\", "/" ) + SearchFilenames[ index ][
                    3
                  ] + "\">";
                  if ( navigator.userAgent.toLowerCase().indexOf( "msie" ) !== -1 && linkProtocol.indexOf(
                      "file:" ) !== -1 ) {
                    file_tmp =
                      "javascript:alert('Internet Explorer does not allow linking to local files...')" + "\">";
                  }
                  if ( file_tmp.substr( 0, 1 ) === "/" ) file_tmp = file_tmp.substr( 1 );
                  file_tmp = file_tmp.replace( /\\/g, "/" );
                  file_tmp = file_tmp.replace( /#/g, "%23" );

                  var indx = file_tmp.indexOf( "://" );
                  if ( indx !== -1 ) {
                    var protocol_tmp = file_tmp.substr( 0, indx + 3 );
                    file_tmp = file_tmp.substr( indx + 3 );
                    file_tmp = file_tmp.replace( /\/\//g, "/" );
                    file_tmp = protocol_tmp + file_tmp;
                  } else {
                    file_tmp = file_tmp.replace( /\/\//g, "/" );
                  }

                  file_tmp = "<a href=\"" + file_tmp + SearchFilenames[ index ][ 3 ] + "</a>";
                }
              }

              locationHtml = "";
              if ( showLocationColumn ) {
                var located_in = SearchLocations[ index ];
                if ( located_in === "" ) located_in = "[.]"
                locationHtml = "<td><span class='file_folder'><a href=\"#\" class=\"folder_link\" id=\"" +
                  SearchLocationsID[ index ] + "\"> " + located_in + "</a></span></td>";
              }


              var timestamp = timestampToDate( SearchFilenames[ index ][ 2 ] );
              table_html +=
                "<tr>" +
                "<td><span class='file'>" + file_tmp + "</span></td>" +
                locationHtml +
                "<td class='size' data-sort='" + SearchFilenames[ index ][ 1 ] + "'>" + bytesToSize(
                  SearchFilenames[ index ][ 1 ] ) + "</td>" +
                "<td class='date' data-sort='" + SearchFilenames[ index ][ 2 ] + "'>" + timestamp + "</td>" +
                "</tr>";

              currentView.push( {
                "name": SearchFilenames[ index ][ 3 ],
                "path": SearchLocationsRaw[ index ].replace( /\//g, "\\" ),
                "type": "file",
                "size": SearchFilenames[ index ][ 1 ],
                "date": SearchFilenames[ index ][ 2 ]
              } );

            }
          }

          // search for matches
          // optimization: use indexOf if no wildcards since it's faster
          if ( SearchFor.indexOf( "*" ) !== -1 || SearchFor.indexOf( "?" ) !== -1 ) {
            var SearchForEscaped = SearchFor.replace( /[\-\[\]\/\{\}\(\)\+\.\\\^\$\|]/g, "\\$&" );
            SearchForEscaped = SearchForEscaped.replace( /\*/g, ".*" );
            SearchForEscaped = SearchForEscaped.replace( /\?/g, "." );
            var regEx = new RegExp( SearchForEscaped );

            for ( c = 0; c < SearchFilenames.length; c++ ) {
              if ( regEx.test( SearchFilenames[ c ][ 0 ] ) ) {
                foundItem( c );
              }
            }
          } else {
            for ( c = 0; c < SearchFilenames.length; c++ ) {
              if ( SearchFilenames[ c ][ 0 ].indexOf( SearchFor ) !== -1 ) {
                foundItem( c );
              }
            }
          }

          table_html += "</tbody></table>";

          $( "#list_header" ).html( "Search Results <span class='path_divider'></span>" );
          document.getElementById( "list_files" ).innerHTML = table_html;
          $( "#search_indicator" ).hide();
          addFolderClickEventHandlers();

          var tablesorterHeaders = {
            1: {
              sorter: 'datasort'
            },
            2: {
              sorter: 'datasort'
            }
          }
          if ( showLocationColumn ) {
            tablesorterHeaders = {
              2: {
                sorter: 'datasort'
              },
              3: {
                sorter: 'datasort'
              }
            }
          }

          $( "#files" ).tablesorter( {
            sortInitialOrder: "desc",
            headers: tablesorterHeaders
          } );

          var sFiles = " files";
          if ( countFiles === 1 ) sFiles = " file";
          var sDirs = " folders";
          if ( countDirs === 1 ) sDirs = " folder";
          $( "#list_footer_info_label" ).html( countDirs + sDirs + " (" + bytesToSize( sizeDirs, 0 ) + "), " +
            countFiles + sFiles + " (" + bytesToSize( sizeFiles, 0 ) + ")" );

        }, 50 ); // end setTimeout before search
      }; // end doSearch()


      /* --- Show content of a folder --- */

      function ShowFolder( FolderID ) {
        var c;

        if ( SelectedFolderID === FolderID ) return false;
        $( "#treeview #" + SelectedFolderID ).removeClass( "treeview_bold" );
        SelectedFolderID = FolderID;

        $( "#search_text" ).val( "" );
        PreviousSearchFor = "";

        var path = getPathToDir( FolderID );
        var currentViewPath = getDirNameAndPath( FolderID ).replace( /\//g, "\\" );
        var breadcrumbs = "";
        for ( c = 0; c < path.length; c++ ) {
          var dirName = getDirName( path[ c ] );
          if ( c === 0 ) {
            dirName = dirName.replace( /\:\//g, "" ); // remove :\ from volume labels
          }
          breadcrumbs += "<a href=\"#\" class=\"folder_link\" id=\"" + path[ c ] + "\">" + dirName + "</a>" +
            "<span class='path_divider'></span>";
        }

        currentDir = getDirNameAndPath( FolderID );
        currentDirID = Number( FolderID );

        location.hash = '#' + currentDir;

        $( "#list_header" ).html( breadcrumbs );

        var table_html = "";
        var showParentFolderClass = "";
        if ( FolderID != 0 ) {
          showParentFolderClass = " has-parent-folder"
          table_html += "<span id='parent_folder' class='file_folder'><a href=\"#\" class=\"folder_link\" id=\"" +
            parent_folders[ FolderID ] + "\"> [..]</a></span>\n";
          table_html += "<div id='parent_folder_border'></div>";
        }
        table_html += "<table id='files' class='tablesorter" + showParentFolderClass +
          "'><thead><th>Name</th><th>Size</th><th>Modified</th></tr></thead><tbody>\n";

        currentView = [];
        var countFiles = 0;
        var countDirs = 0;
        var subdirTotSizes = 0;

        // folders
        var subdirs = getSubdirs( SelectedFolderID );
        if ( subdirs != "" ) {
          for ( c = 0; c < subdirs.length; c++ ) {
            countDirs++;
            var sTmp = dirs[ subdirs[ c ] ][ 0 ].split( "*" );
            var name = sTmp[ 0 ].substring( sTmp[ 0 ].lastIndexOf( "/" ) + 1 );
            var dirSize = getDirTreeSize( subdirs[ c ] );
            subdirTotSizes += dirSize;
            var timestamp = timestampToDate( sTmp[ 2 ] );
            table_html +=
              "<tr>" +
              "<td><span class='file_folder'><a href=\"#\" class=\"folder_link\" id=\"" + subdirs[ c ] + "\"> " +
              name + "</a></span></td>" +
              "<td class='size' data-sort='" + dirSize + "'>" + bytesToSize( dirSize ) + "</td>" +
              "<td class='date' data-sort='" + sTmp[ 2 ] + "'>" + timestamp + "</td>" +
              "</tr>\n";
            currentView.push( {
              "name": name,
              "path": currentViewPath,
              "type": "dir",
              "size": dirSize,
              "date": sTmp[ 2 ]
            } );
          }
        }

        // files
        for ( c = 1; c < dirs[ SelectedFolderID ].length - 2; c++ ) {
          countFiles++;
          var sTmp = dirs[ SelectedFolderID ][ c ].split( "*" );
          var file_tmp = sTmp[ 0 ];
          var dir_tmp = getDirNameAndPath( SelectedFolderID ).substring( sourceRoot.length );
          if ( dir_tmp != "" ) dir_tmp += "/";
          if ( linkFiles ) {

            var ext = file_tmp.split( '.' ).pop();
            if ( onlyLinkExtensions.length === 0 || onlyLinkExtensions.indexOf( ext ) !== -1 ) {
              file_tmp = linkProtocol + linkRoot + dir_tmp + sTmp[ 0 ] + "\">";
              if ( navigator.userAgent.toLowerCase().indexOf( "msie" ) !== -1 && linkProtocol.indexOf( "file:" ) !==
                -1 ) {
                file_tmp = "javascript:alert('Internet Explorer does not allow linking to local files...')" + "\">";
              }
              if ( file_tmp.substr( 0, 1 ) === "/" ) file_tmp = file_tmp.substr( 1 );
              file_tmp = file_tmp.replace( /\\/g, "/" );
              file_tmp = file_tmp.replace( /#/g, "%23" );

              var indx = file_tmp.indexOf( "://" );
              if ( indx !== -1 ) {
                var protocol_tmp = file_tmp.substr( 0, indx + 3 );
                file_tmp = file_tmp.substr( indx + 3 );
                file_tmp = file_tmp.replace( /\/\//g, "/" );
                file_tmp = protocol_tmp + file_tmp;
              } else {
                file_tmp = file_tmp.replace( /\/\//g, "/" );
              }

              file_tmp = "<a href=\"" + file_tmp + sTmp[ 0 ] + "</a>";
            }
          }

          var timestamp = timestampToDate( sTmp[ 2 ] );

          table_html +=
            "<tr>" +
            "<td><span class='file'>" + file_tmp + "</span></td>" +
            "<td class='size' data-sort='" + sTmp[ 1 ] + "'>" + bytesToSize( sTmp[ 1 ] ) + "</td>" +
            "<td class='date' data-sort='" + sTmp[ 2 ] + "'>" + timestamp + "</td>" +
            "</tr>\n";
          currentView.push( {
            "name": sTmp[ 0 ],
            "path": currentViewPath,
            "type": "file",
            "size": sTmp[ 1 ],
            "date": sTmp[ 2 ]
          } );
        }

        table_html += "</tbody></table>\n";

        document.getElementById( "list_files" ).innerHTML = table_html;
        addFolderClickEventHandlers();
        $( "#files" ).tablesorter( {
          sortInitialOrder: "desc",
          headers: {
            1: {
              sorter: 'datasort'
            },
            2: {
              sorter: 'datasort'
            }
          }
        } );


        var sFiles = " files";
        if ( countFiles === 1 ) sFiles = " file";
        var sDirs = " folders";
        if ( countDirs === 1 ) sDirs = " folder";
        $( "#list_footer_info_label" ).html( countDirs + sDirs + " (" + bytesToSize( subdirTotSizes ) + "), " +
          countFiles + sFiles + " (" + bytesToSize( dirs[ SelectedFolderID ][ dirs[ SelectedFolderID ].length -
            2 ] ) + ")" );

        $( "#treeview #" + SelectedFolderID ).addClass( "treeview_bold" );

        return false;
      }


      /* --- Treeview --- */

      function PopulateTreeviewNode( node ) {
        var subdirs = getSubdirs( node.data.key );
        if ( subdirs != "" ) {
          var len = subdirs.length;
          for ( var c = 0; c < len; c++ ) {
            var newNode = node.addChild( {
              title: getDirName( subdirs[ c ] ),
              key: subdirs[ c ],
              unselectable: true,
              isFolder: true,
              tooltip: bytesToSize( getDirTreeSize( subdirs[ c ] ) ),
            } );
            PopulateTreeviewNode( newNode )
          }
        }
      }

      $( "#treeview" ).dynatree( {
        clickFolderMode: 1,
        minExpandLevel: 2,
        fx: {
          height: "toggle",
          duration: 100
        },
        onActivate: function ( node ) {
          ShowFolder( node.data.key );
        },
        onDblClick: function ( node ) {
          node.expand( !node.isExpanded() );
        },
      } );

      // init treeview items
      var rootNode = $( "#treeview" ).dynatree( "getRoot" ).addChild( {
        title: getDirName( 0 ).replace( /\//, "\\" ),
        key: "0",
        isFolder: true,
        tooltip: bytesToSize( getDirTreeSize( 0 ) ),
      } );
      rootNode.tree.enableUpdate( false );
      PopulateTreeviewNode( rootNode );
      rootNode.tree.enableUpdate( true );
      rootNode.activate();

      // browse directly to folder at startup
      if ( originalHash !== "" ) {
        var folderId = getFolderIdFromPath( originalHash );
        if ( folderId ) {
          expandToFolder( folderId )
        } else {
          location.hash = "";
        }
      }

      /* --- Export LightBox --- */

      function populateExport() {
        var output_plain = "";
        var output_json = [];
        var output_csv = "";

        // get the settings
        var showFiles = $( "#export_checkbox_files" ).prop( "checked" )
        var showDirs = $( "#export_checkbox_dirs" ).prop( "checked" )
        var fullPath = $( "#export_checkbox_path" ).prop( "checked" )

        var colPath = $( "#export_checkbox_col_path" ).prop( "checked" )
        var colType = $( "#export_checkbox_col_type" ).prop( "checked" )
        var colSize = $( "#export_checkbox_col_size" ).prop( "checked" )
        var colDate = $( "#export_checkbox_col_date" ).prop( "checked" )

        var type = $( "#export_lightbox input[type='radio']:checked" ).val();

        // set csv header
        var csv_line = "\"Name\"";
        if ( colPath ) csv_line += ",\"Path\"";
        if ( colType ) csv_line += ",\"Type\"";
        if ( colSize ) csv_line += ",\"Size\"";
        if ( colDate ) csv_line += ",\"Date\"";
        output_csv = csv_line + "\n";

        // collect and format items
        for ( var i = 0; i < currentView.length; i++ ) {

          var path = "";
          if ( fullPath ) path = currentView[ i ].path + "\\";

          var json_line = {
            "name": ( path + currentView[ i ].name )
          }
          if ( colPath ) json_line.path = currentView[ i ].path;
          if ( colType ) json_line.type = currentView[ i ].type;
          if ( colSize ) json_line.size = currentView[ i ].size;
          if ( colDate ) json_line.date = timestampToIsoString( currentView[ i ].date );

          var csv_line = "\"" + path + currentView[ i ].name + "\"";
          if ( colPath ) csv_line += ",\"" + currentView[ i ].path + "\"";
          if ( colType ) csv_line += ",\"" + currentView[ i ].type + "\"";
          if ( colSize ) csv_line += ",\"" + currentView[ i ].size + "\"";
          if ( colDate ) csv_line += ",\"" + timestampToIsoString( currentView[ i ].date ) + "\"";

          if ( showFiles && currentView[ i ].type == "file" ) {
            output_plain += path + currentView[ i ].name + "\n";
            output_json.push( json_line );
            output_csv += csv_line + "\n";
          }
          if ( showDirs && currentView[ i ].type == "dir" ) {
            output_plain += path + currentView[ i ].name + "\n";
            output_json.push( json_line );
            output_csv += csv_line + "\n";
          }
        }

        // print items
        var output = "";
        if ( type == "plain" ) {
          output = output_plain;
        } else if ( type == "json" ) {
          output = JSON.stringify( output_json ).replace( /},/g, "},\n" ).replace( /^\[/, "[\n" ).replace( /\]$/,
            "\n]" );
        } else if ( type == "csv" ) {
          output = output_csv;
        }
        $( "#export_text" ).text( output ).focus().select();
      }

      $( "#list_footer_open_export" ).click( function () {
        var windowHeight = $( "body" ).height();
        $( "#export_checkbox_files" ).prop( "checked", true );
        $( "input[id^=export_checkbox_col]" ).attr( "disabled", true );
        $( "#export_options_columns" ).css( "opacity", "0.5" );
        populateExport();

        $( "#export_content" ).innerHeight( windowHeight - 80 );
        $( "#export_content" ).css( "top", 40 );
        $( "#export_lightbox" ).fadeIn( "fast", function () {
          $( "#export_text" ).focus().select();
        } );
      } );

      $( "#export_save" ).click( function () {
        var type = $( "#export_lightbox input[type='radio']:checked" ).val();
        if ( type == "plain" ) {
          downloadToFile( $( "#export_text" ).text(), 'snap2html_export.txt', 'text/plain;encoding:utf-8' );
        } else if ( type == "json" ) {
          downloadToFile( $( "#export_text" ).text(), 'snap2html_export.json',
            'application/json;encoding:utf-8' );
        } else if ( type == "csv" ) {
          downloadToFile( $( "#export_text" ).text(), 'snap2html_export.csv', 'text/csv;encoding:utf-8' );
        }
      } );


      $( "#export_close" ).click( function () {
        $( "#export_lightbox" ).fadeOut( "fast" );
      } );

      $( "#export_content" ).click( function ( event ) {
        event.stopPropagation();
      } );
      $( "#export_lightbox" ).click( function () {
        $( "#export_lightbox" ).fadeOut( "fast" );
      } );
      $( "#export_lightbox input[type=radio]" ).click( function () {
        var type = $( "#export_lightbox input[type='radio']:checked" ).val();
        if ( type !== "plain" ) {
          $( "input[id^=export_checkbox_col]" ).removeAttr( "disabled" );
          $( "#export_options_columns" ).css( "opacity", 1 );
        } else {
          $( "input[id^=export_checkbox_col]" ).attr( "disabled", true )
          $( "#export_options_columns" ).css( "opacity", 0.5 );
        }
      } );
      $( "#export_lightbox input[type=checkbox], #export_lightbox input[type=radio]" ).click( function () {
        populateExport();
      } );

      document.addEventListener( 'keypress', function ( keyEvent ) {
        if ( keyEvent.keyCode == 27 ) { // esc
          if ( $( "#csv_lightbox" ).length > 0 ) {
            $( "#csv_lightbox" ).fadeOut( "fast" );
          }
        }
      } );

      /* --- Helper Functions --- */

      function expandToFolder( id ) {
        var tree = $( "#treeview" ).dynatree( "getTree" );
        var node = tree.getNodeByKey( id.toString() );
        if ( node ) {
          node.activate();
        }
      }

      function getFolderIdFromPath( path ) {
        for ( var c = 0; c < numDirs; c++ ) {
          if ( dirs[ c ][ 0 ].split( "*" )[ 0 ] == path ) {
            return c;
          };
        }
        return null;
      }

      function getDirName( id ) {
        if ( dirs.length <= id ) return "";
        var tmp = dirs[ id ][ 0 ].split( "*" );
        var tmp2 = tmp[ 0 ].substring( tmp[ 0 ].lastIndexOf( "/" ) + 1 );
        if ( tmp2 === "" ) return tmp[ 0 ];
        else return tmp2;
      }

      function getDirNameAndPath( id ) {
        if ( dirs.length <= id ) return "";
        var tmp = dirs[ id ][ 0 ].split( "*" );
        return tmp[ 0 ];
      }

      function getSubdirs( id ) {
        if ( dirs.length <= id ) return "";
        return dirs[ id ][ dirs[ id ].length - 1 ].split( "*" );
      }

      function getPathToDir( id ) {
        var parentId = parent_folders[ id ];
        var path = [];
        if ( id != 0 ) {
          path.push( id );
        }
        while ( parentId > 0 ) {
          path.push( parentId );
          parentId = parent_folders[ parentId ];
        }
        path.push( 0 );
        return path.reverse();
      }

      function getDirSize( id ) {
        if ( dirs.length <= id ) return "0";
        return dirs[ id ][ dirs[ id ].length - 2 ];
      }

      function getDirTreeSize( id ) {
        if ( dirs.length <= id ) return "0";
        var totSize = getDirSize( id );
        var subdirs = getSubdirs( id );
        if ( subdirs != "" ) {
          var len = subdirs.length;
          for ( var c = 0; c < len; c++ ) {
            totSize += getDirTreeSize( subdirs[ c ] );
          }
        }
        return totSize;
      }

      function bytesToSize( bytes ) {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;

        if ( ( bytes >= 0 ) && ( bytes < kilobyte ) ) {
          return bytes + ' bytes';

        } else if ( ( bytes >= kilobyte ) && ( bytes < megabyte ) ) {
          return ( bytes / kilobyte ).toFixed( 0 ) + ' KB';

        } else if ( ( bytes >= megabyte ) && ( bytes < gigabyte ) ) {
          return ( bytes / megabyte ).toFixed( 1 ) + ' MB';

        } else if ( ( bytes >= gigabyte ) && ( bytes < terabyte ) ) {
          return ( bytes / gigabyte ).toFixed( 2 ) + ' GB';

        } else if ( bytes >= terabyte ) {
          return ( bytes / terabyte ).toFixed( 2 ) + ' TB';

        } else {
          return bytes + ' bytes';
        }
      }

      function timestampToDate( timestamp ) {
        // Convert UNIX timestamp to local date
        // If you don't like the date format, try something else, such as toLocaleDateString() manually formatting the date here
        return new Date( timestamp * 1000 ).toLocaleString();
      }

      function timestampToIsoString( timestamp ) {
        // Convert UNIX timestamp to ISO string (for use in export view)
        return new Date( timestamp * 1000 ).toISOString();
      }


      // debounce() from Underscore.js
      // Returns a function, that, as long as it continues to be invoked, will not
      // be triggered. The function will be called after it stops being called for
      // N milliseconds. If `immediate` is passed, trigger the function on the
      // leading edge, instead of the trailing.
      function debounce( func, wait, immediate ) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          var later = function () {
            timeout = null;
            if ( !immediate ) func.apply( context, args );
          };
          var callNow = immediate && !timeout;
          clearTimeout( timeout );
          timeout = setTimeout( later, wait );
          if ( callNow ) func.apply( context, args );
        };
      };

      // Save export to local file. Based on https://stackoverflow.com/a/29304414/1087811
      function downloadToFile( content, fileName, mimeType ) {
        var a = document.createElement( 'a' );
        mimeType = mimeType || 'application/octet-stream';

        if ( navigator.msSaveBlob ) { // IE10
          navigator.msSaveBlob( new Blob( [ content ], {
            type: mimeType
          } ), fileName );
        } else if ( URL && 'download' in a ) { //html5 A[download]
          a.href = URL.createObjectURL( new Blob( [ content ], {
            type: mimeType
          } ) );
          a.setAttribute( 'download', fileName );
          document.body.appendChild( a );
          a.click();
          document.body.removeChild( a );
        } else {
          location.href = 'data:application/octet-stream,' + encodeURIComponent(
          content ); // only this mime type is supported
        }
      }

    } ); 
    // end $(document).ready