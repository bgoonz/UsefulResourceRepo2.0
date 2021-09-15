fetch( "http://localhost:3000/kittens/comments", {
    method: "POST",
    headers: { //can rewrite default headers for fetch request...i.e. authorization header with a tolken or something
        "Content-Type": "application/json"
    },
    body: JSON.stringify( {
        comment
    } ) // comment is string from user input or an object from the fourm submission where user input is properties on the object.

} )
//
