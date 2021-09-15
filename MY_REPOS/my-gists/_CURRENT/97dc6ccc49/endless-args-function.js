let myFunction = function(str, ...strs) {
        console.log("The first string is " + str);
        console.log("The rest of the strings are:");
        strs.forEach(function(str) {
            console.log(str);
        })
    }