function mowTheLawn() {
    console.log(`Starting to mow the lawn.`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Done mowing the lawn!`);
            resolve('short grass');
        }, 3000);
    });
}

function doTheDishes() {
    console.log(`Started doing the dishes.`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Done doing the dishes.`);
            resolve('clean dishes');
        }, 2000);
    });
}


function walkTheDog() {
    console.log(`Starting to walk the dog.`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`WHAT HAPPENED`);
            console.log(`Done walking our dog!`);
            resolve('happy dog');
        }, 2500);
    });
}


const someChores = [mowTheLawn(), doTheDishes(), walkTheDog()];

Promise.all(someChores)
    .then((results) => {
        console.log(`CHORES COMPLETED`);
        console.log(results);
    })
    .catch((reason) => {
        console.log(`Error. Something went wrong`);
        console.log(reason);
    });

// Promise.all([mowTheLawn(), doTheDishes(), walkTheDog()])
//     .then(() => console.log(`All Chores COMPLETE`));

// mowTheLawn()
//     .then(doTheDishes)
//     .then(walkTheDog)
//     .then(() => console.log(`Chores are doneskii!`));
