
    let obj = {
        name: "Rose",
        cats: 2
    };
    for (let currentKey in obj) {
        console.log(currentKey);
        console.log(obj[currentKey]);
    }
    // prints out:
    // name
    // cats
    // Rose
    // 2
