const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject(`FAIIIL`);
        resolve(`SUCCESSS`);
    }, 1000);
});

// myPromise.then(
//     (result) => {
//         console.log(`resolved`, result);
//     },
//     (reason) => {
//         console.log(`Error somewhere?`, reason);
//     });

console.log(myPromise);
myPromise
    .then((result) => {
        console.log(`Resolve 1: ${result}`);
        console.log(myPromise);
    })
    .catch((reason) => {
        console.log(`Error: ${reason}`)
        console.log(myPromise);
    });
