const functions = require( 'firebase-functions' );

exports.makeUppercase = functions.firestore.document( '/messages/{documentId}' )
    .onCreate( ( snap, context ) => {
        const original = snap.data().original;
        console.log( 'Uppercasing', context.params.documentId, original );
        const uppercase = original.toUpperCase();
        return snap.ref.set( { uppercase }, { merge: true } );
    } );
