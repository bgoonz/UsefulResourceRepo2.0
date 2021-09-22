const fs = require( 'fs' );
const shell = require( 'shelljs' );
const fileName=require('./name-from-path.js')
const link = "https://developer.mozilla.org/en-US"


/*
const sed: shell.SedFunction( options: string, searchRegex: string | RegExp, replacement: string, ...files: string[] ) => shell.ShellString
Reads an input string from file and performs a JavaScript replace() on the input using the given search regex and replacement string or
function.

@param options
Available options:

  -i: Replace contents of 'file' in -place.Note that no backups will be created!
  @param searchRegex— The regular expression to use
for search.

@param replacement— The replacement.

@param files— The files to process.

@return— The new string after replacement.
*/

 shell.sed( '-n', 's/.*href="\([^"]*\).*/\1/p', link ).to(links.md);




let textByLine = fs.readFileSync( 'links.md' ).toString().split( "\n" );
function file2Arr ( lines ) {
  let lines = $( '#input' ).val().split( /\n/ );
  let output = [];
  let outputText = [];
  for ( let i = 0; i < lines.length; i++ ) {
    // only push this line if it contains a non whitespace character.
    if ( /\S/.test( lines[ i ] ) ) {
      outputText.push( '"' + $.trim( lines[ i ] ) + '"' );
      output.push( $.trim( lines[ i ] ) );
    }
    return output;
  }
}

  let linkArr = file2Arr( textByLine );


  function tagify ( arr ) {
    let tagsArr = [];
    for ( let i = 0; i < arr.length; i++ ) {

      let curPath = arr[ i ];
      let tag = '<div class="btn"><a class="btn" href="' + `${ curPath }` + `"` + `>${ curPath.fileName(curPath)}</a></div>`;
      console.log( tag );
      tagsArr.push( tag );
      tagsArr.push( '\n' );
      let tagStr = tagsArr.join( '' );
      console.log( 'tagStr: ', tagStr );

    }

    return tagStr;

  }
  let tagData = tagify( htmlArr2 );
  const pre = `<!doctype html><br>
<html class="no-js" lang="">${ n }<br>

< head > < br >
  < meta charset = "utf-8" > < br >
  < title > < /title><br>
  < meta name = "description"
  content = "" > < br >
  < meta name = "viewport"
  content = "width=device-width, initial-scale=1" > < br >


  < link rel = "apple-touch-icon"
  href = "icon.png" > < br >
 

  < link rel = "stylesheet"
  href = "" > < br >
  < link rel = "stylesheet"
  href = "" > < br >

  < meta name = "theme-color"
  content = "#fafafa" > < br >
< /head><br>

< body > < br >
< ul > < br > `;
  const suf = `
</ul><br>
</body><br>
<br>
</html><br>`;
  let data = `${ pre }<br>` + tagData + `${ suf }`;
  fs.writeFile( 'links.html', data, ( err ) => {

    // In case of a error throw err. 
    if ( err ) throw err;
  } );
