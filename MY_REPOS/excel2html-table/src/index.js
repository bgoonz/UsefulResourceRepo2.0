"use strict";
let fs = require( 'fs' );
let process = require( 'process' );
let workingDirectory = process.cwd().slice( 2 );
let XLS = require( 'XLS' );
let workbook = XLS.readFile( process.argv[ 2 ] );
let sheets = workbook.Sheets;
let htmlFile = '';
let rowNumber;
let htmlArray;
if ( typeof process.argv[ 2 ] === 'undefined' ) {
  console.log( '\n' + 'Error:' + '\n' + 'You must enter the excel file you wish to build tables from as an argument' + '\n' + 'i.e., node toTable.js resolutions.XLS' );
  return;
} else {
  if ( process.argv[ 2 ].slice( -4 ) !== 'XLS' ) {
    console.log( '\n' + 'This program will only convert XLS files' + '\n' + 'Please enter correct file type' );
    return;
  } else {
    var fileName = process.argv[ 2 ];
    var newFileName = fileName.slice( 0, -4 ) + 'html';
  }
}

function getPosition( string, subString, index ) {
  return string.split( subString, index ).join( subString ).length;
}
for ( var sheet in sheets ) {
  if ( typeof sheet !== 'undefined' ) {
    htmlFile += '<table summary="" class="turntable">' + '\n' + '<thead>';
    for ( var cell in sheets[ sheet ] ) {
      if ( typeof sheets[ sheet ][ cell ].w !== 'undefined' ) {
        if ( cell === 'A1' ) {
          htmlFile += '\n' + '<tr>' + '\n' + '<th>' + sheets[ sheet ][ cell ].w.replace( '& ', '&amp;' ).replace( '-', '&ndash;' ).replace( '–', '&mdash;' ) + '</th>';
        } else {
          if ( cell === 'A2' ) {
            htmlFile += '\n' + '</tr>' + '\n' + '</thead>' + '\n' + '<tr>' + '\n' + '<th>' + sheets[ sheet ][ cell ].w.replace( '& ', '&amp;' ).replace( '-', '&ndash;' ).replace( '–', '&mdash;' ) + '</th>';
          } else {
            if ( cell.slice( 0, 1 ) === 'A' ) {
              htmlFile += '\n' + '</tr>' + '\n' + '<tr>' + '\n' + '<th>' + sheets[ sheet ][ cell ].w.replace( '& ', '&amp;' ).replace( '-', '&ndash;' ).replace( '–', '&mdash;' ) + '</th>';
            } else {
              htmlFile += '\n' + '<td>' + sheets[ sheet ][ cell ].w.replace( '& ', '&amp;' ).replace( '-', '&ndash;' ).replace( '–', '&mdash' ) + '</td>';
            }
          }
        }
      }
    }
    htmlFile += '\n' + '</tr>' + '\n' + '</table>' + '\n';
  }
}
fs.writeFile( newFileName, htmlFile, ( err ) => {
  if ( err ) throw err;
  console.log( '\n' + 'Your tables have been created in', newFileName );
} );
