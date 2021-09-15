"use strict";
{
    // This file contains code to convert between base64 strings and numbers
    // basically providing a total ordering on base64 strings

    const b64order = {
        atoi, itoa
    };

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const acode = chars.split( '' );
    const icode = acode.reduce( ( ro, c, i ) => ( ro[ c ] = i + 1, ro ), {} );

    try {
        Object.assign( self, { b64order } );
    } catch ( e ) {
        module.exports = b64order;
    }

    function atoi ( b64s ) {
        let num = 0;
        let mult = 65;
        for ( const char of b64s ) {
            num *= mult;
            num += icode[ char ];
        }
        return num;
    }

    function itoa ( i ) {
        let s = '';
        let n = i;
        while ( n ) {
            const code = ( n % 65 );
            s = acode[ code - 1 ] + s;
            n -= code;
            n /= 65;
        }
        return s;
    }
}
