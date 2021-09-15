const bcrypt = require( "bcryptjs" );
//!To hash a password:
const credentials = req.body;
const hash = bcrypt.hashSync( credentials.password, 14 );
credentials.password = hash;
// move on to save the user.
//!To verify a password:
const credentials = req.body;
// find the user in the database by it's username then
if ( !user || !bcrypt.compareSync( credentials.password, user.password ) ) {
  return res.status( 401 ).json( {
    error: 'Incorrect credentials'
  } );
}
// the user is valid, continue on



