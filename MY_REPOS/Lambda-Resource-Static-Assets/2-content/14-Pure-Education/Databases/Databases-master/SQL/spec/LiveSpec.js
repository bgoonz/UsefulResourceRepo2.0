/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

import mysql from 'mysql';

import request from "request"; // You might need to npm install the request module!

describe("Persistent Node Chat Server", () => {
  let dbConnection;

  beforeEach(() => {
    dbConnection = mysql.createConnection({
    /* TODO: Fill this out with your mysql username */
      user: "root",
    /* and password. */
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    const tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query(`DELETE FROM ${tablename}`);
  });

  afterEach(() => {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", done => {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:8080/messages/general",
             json: {
                username: "Valjean",
                message: 'first message',
                roomname: 'general'
              }
            },
            (error, response, body) => {

              console.log("RESPONSE", response);
              dbConnection.query("SELECT * FROM messages",

                (err, results) => {
                  if(err){
                    console.log("THIS IS THE ERROR: ", err);
                  }
                  console.log("RESULT", results);
                  expect(results.length).toEqual(1);
                  expect(results[0].username).toEqual("Valjean");
                  expect(results[0].message).toEqual('first message');
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });

  it("Should output all messages from the DB", done => {
    // Let's insert a message into the db
    const queryString = "INSERT INTO messages SET ?";
    const queryArgs = {username: "Javert", message: "Men like you can never change!", roomname: 'general'};//["Javert", "Men like you can never change!"];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      (err, results, fields) => {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
         for(let i = 0; i <10000; i++){
           console.log(fields);
         }
        request("http://127.0.0.1:8080/messages/general",
          (error, response, body) => {
            console.log("THIS IS THE BODY",body);
            const messageLog = JSON.parse(body);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].message).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});