import request from "request";

describe("Live Node Chat Server", () => {
 xit("Should respond to get requests for /log", done => {
   request("http://127.0.0.1:8080/classes/messages",
           (error, response, body) => {
             expect(body).toEqual("[]");
             done();
           });
 });

 it("Should accept posts to /send", done => {
   request({method: "POST",
            uri: "http://127.0.0.1:8080/classes/messages",
            json: {username: "Jono",
               message: "Do my bidding!"}
            },
           (error, {statusCode}, body) => {
             expect(statusCode).toEqual(201);
             // Now if we request the log, that message
             // we posted should be there:
             request("http://127.0.0.1:8080/classes/messages",
                     (error, response, body) => {
                       const messageLog = JSON.parse(body);
                       console.log(messageLog.results);
                       expect(messageLog.results[1].username).toEqual("Jono");
                       expect(messageLog.results[1].text).toEqual("Do my bidding!");
                       done();
                     });

           });
 });

 it("Should 404 when asked for a nonexistent file", done => {
   request("http://127.0.0.1:8080/arglebargle",
           (error, {statusCode}, body) => {
             expect(statusCode).toEqual(404);
             done();
           });
 });


});