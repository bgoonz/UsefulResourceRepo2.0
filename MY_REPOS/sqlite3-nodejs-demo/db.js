/*
!<--------------------------------------Installing sqlite3 module-------------------------------------->
To interact with the SQLite database, 
you need to download and install sqlite3 module.
You can use npm to do so using the following command:
-> npm install sqlite3
After installing the sqlite3 module, you are ready to connect to a SQLite database from a Node.js application.
To connect to an SQLite database, you need to:
First, import the sqlite3 module
Second, call the Database() function of the sqlite3 module 
and pass the database information such as database file, opening mode, and a callback function.
!<--------------------------------------Connecting to the in-memory database-------------------------------------->
-To open a database connection to an in-memory database, you use the following steps.
First, import the sqlite3 module:
*/
//*     const sqlite3 = require('sqlite3').verbose();
/*
Notice that the execution mode is set to verbose to produce long stack traces.
Second, create a Database object:
*/
//*     let db = new sqlite3.Database(':memory:');
/*
The sqlite3.Database() returns a (Database object) and opens the database connection automatically.
-->The sqlite3.Database() accepts a callback function 
---->that will be called when the database opened successfully or when an error occurred.
-->The callback function has the error object as the first parameter. 
---->If an error occurred, the error object is //!not null,
---------------------------------------------------> otherwise, it is null.
-->If you don’t provide the callback function and an error occurred during opening the database, 
---->an error event will be emitted. 
-->In case the database is opened successfully, 
---->the open event is emitted regardless of whether a callback is provided or not.
-->So you now can open an SQLite database and provide the detailed information if an error occurred as follows:
*/
// let db = new sqlite3.Database(':memory:', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the in-memory SQlite database.');
//   });
/*
t is a good practice to close a database connection when you are done with it. 
To close a database connection:
---> you call the close() method of the Database object as follows:
*/
//db.close();
/*
The close() method will wait for all pending queries completed before actually closing the database.
Similar to the Database(), 
the close() method also accepts a callback ,
--->that indicates whether an error occurred during closing the database connection.
*/
// db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });
//
/*
The following illustrates the complete code for opening and closing an in-memory SQLite database:
*/
// const sqlite3 = require('sqlite3').verbose();
// 
// // open database in memory
// let db = new sqlite3.Database(':memory:', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });
// 
// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
/*
!RESULT:
bryan@LAPTOP-F699FFV1:/mnt/c/Users/15512/OneDrive/Documents/App_Academy_Personal/misc/30-sec/30-seconds-of-code-master/snippets/my-snippets/async-await-iteration$ node db.js
Connected to the in-memory SQlite database.
Close the database connection.
---------------------------
To connect to a disk file database, instead of passing the ':memory:' string, you pass the path to the database file.
For example, to connect to the chinook database file stored in the db folder, you use the following statement:
*/
// let db = new sqlite3.Database('./db/chinook.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to the chinook database.');
//   });
/*
There are three opening modes:
1.)     sqlite3.OPEN_READONLY: open the database for read-only.
2.)     sqlite3.OPEN_READWRITE : open the database for reading and writting.
3.)     sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.
-->The sqlite3.Database() accepts one or more mode as the second argument. 
---->By default, it uses the OPEN_READWRITE | OPEN_CREATE mode. 
It means that if the database does not exist, the new database will be created and is ready for read and write.
To open the chinook sample database for read and write, you can do it as follows:
*/
// let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to the chinook database.');
//   });
/*
the complete code for opening the chinook database, querying data from the playlists table, and closing the database connection.
*/
// const sqlite3 = require( 'sqlite3' ).verbose();
// 
// // open the database
// let db = new sqlite3.Database( './chinook.db', sqlite3.OPEN_READWRITE, ( err ) => {
//     if ( err ) {
//         console.error( err.message );
//     }
//     console.log( 'Connected to the chinook database.' );
// } );
// //The serialize() method puts the execution mode into serialized mode. It means that only one statement can execute at a time. Other statements will wait in a queue until all the previous statements are executed.
// //After the serialize() method returns, the execution mode is set to the original mode again.
// db.serialize( () => {
//     db.each( `SELECT PlaylistId as id,
//                   Name as name
//            FROM playlists`, ( err, row ) => {
//         if ( err ) {
//             console.error( err.message );
//         }
//         console.log( row.id + "\t" + row.name );
//     } );
// } );
// 
// db.close( ( err ) => {
//     if ( err ) {
//         console.error( err.message );
//     }
//     console.log( 'Close the database connection.' );
// } );
/*
!Result:
Connected to the chinook database.
1       Music
2       Movies
3       TV Shows
4       Audiobooks
5       90’s Music
6       Audiobooks
7       Movies
8       Music
9       Music Videos
10      TV Shows
11      Brazilian Music
12      Classical
13      Classical 101 - Deep Cuts
14      Classical 101 - Next Steps
15      Classical 101 - The Basics
16      Grunge
17      Heavy Metal Classic
18      On-The-Go 1
Close the database connection.
The serialize() method puts the execution mode into serialized mode. It means that only one statement can execute at a time. Other statements will wait in a queue until all the previous statements are executed.
After the serialize() method returns, the execution mode is set to the original mode again.
*/
/*
*<--------------------------------------Querying Data in SQLite Database from Node.js-------------------------------------->
The sqlite3 module provides you with some methods for querying data such as all(), each() and get().
!<--------------------------------------!Querying all rows with all() method------------------------------------->
The all() method allows you to execute an SQL query 
-->with specified parameters and call a callback to access the rows in the result set.
The following is the signature of the all() method:
--------------------------
db.all(sql,params,(err, rows ) => {
// process rows here    
});
--------------------------
The err argument stores the error detail 
--->in case there was an error occurred during the execution of the query.
Otherwise, 
--->the err will be null. 
If the query is executed successfully, 
--->the rows argument contains the result set of the query.
Because the all() method retrieves all rows and places them in the memory, 
therefore, //!for the large result set,
---> you should use the each() method.
how to query data from the playlists table in the sample database using the all() method:
*/
// const sqlite3 = require('sqlite3').verbose();
// // open the database
// let db = new sqlite3.Database("./chinook.db");
// 
// let sql = `SELECT DISTINCT Name name FROM playlists ORDER BY name`;
// //(method) Database.all(sql: string, params: any, callback?: 
// //(this: Statement, err: Error, rows: any[]) => void): Database (+2 overloads)
// db.all(sql, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row.name);
//   });
// });
// // close the database connection
// db.close();
//(method) Database.close(callback?: (err: Error) => void): void)
/*
! RESULT:
90’s Music
Audiobooks
Brazilian Music
Classical
Classical 101 - Deep Cuts
Classical 101 - Next Steps
Classical 101 - The Basics
Grunge
Heavy Metal Classic
Movies
Music
Music Videos
On-The-Go 1
TV Shows
-------------------
!<--------------------------------------Query the first row in the result set------------------------------------->
When you know that the result set contains zero or one row e.g.,
querying a row based on the primary key or querying with only one aggregate function ,
--->such as count, sum, max, min, etc., you can use the get() method of Database object.
db.get(sql, params, (err, row) => {
    // process the row here 
});
-->The get() method executes an SQL query and calls the callback function on the first result row
------>In case the result set is empty, the row argument is undefined.
! how to query a playlist by its id:
*/
// const sqlite3 = require('sqlite3').verbose();
// 
// // open the database
// let db = new sqlite3.Database('./chinook.db');
// let sql = `SELECT PlaylistId id,
//                   Name name
//            FROM playlists
//            WHERE PlaylistId  = ?`;
// // first row only
// let playlistId = 1;
// //------If you change the playlistId to 0 
// //let playlistId = 0;
// //! RESULT: ==> No playlist found with the id 0
// //--------------
// //let playlistId: number
// db.get(sql, [playlistId], (err, row) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   return row
//     ? console.log(row.id, row.name)
//     : console.log(`No playlist found with the id ${playlistId}`);
// 
// });
// 
// // close the database connection
// db.close();
/*
!RESULT:
1 Music
---------------------------
The output shows the Music playlist which is correct.
!<--------------------------------------Query rows with each() method------------------------------------->
The each() method executes an SQL query with specified parameters and 
-->calls a callback for every row in the result set.
b.each(sql,params, (err, result) => {
   // process each row here
});
-->If the result set is empty, the callback is never called
---->in case there is an error, the err parameter contains the detailed information.
- how to use the each() method to query customer’s data from the customers table.
//===> (USE OPEN FILE EXTENSION TO VIEW ON RIGHT CLICK)===>(  tutorial.png  )
*/
const sqlite3 =  require('sqlite3');
let db = new sqlite3.Database('./chinook.db');
let sql = `SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;
//each(sql: string, callback?: (this: Statement, err: Error, row: any) => void, complete?: (err: Error, count: number) => void): Database
//each(sql: string, ...params: any[]): Database
db.each(sql,['USA'],(err,row)=>{
    if(err){
        throw err;
    }
    console.log(`${row.firstName} ${row.lastName} - ${row.email}`)
});
db.close();
/*
!RESULT:
Dan Miller - dmiller@comcast.com
Frank Harris - fharris@google.com
Frank Ralston - fralston@gmail.com
Heather Leacock - hleacock@gmail.com
Jack Smith - jacksmith@microsoft.com
John Gordon - johngordon22@yahoo.com
Julia Barnett - jubarnett@gmail.com
Kathy Chase - kachase@hotmail.com
Michelle Brooks - michelleb@aol.com
Patrick Gray - patrick.gray@aol.com
Richard Cunningham - ricunningham@hotmail.com
Tim Goyer - tgoyer@apple.com
Victor Stevens - vstevens@yahoo.com
*/


