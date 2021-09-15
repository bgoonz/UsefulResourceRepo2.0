// TODO: write a function called stretch
// - should return a promise
// - should console.log "done stretching" and fulfill the promise after 1 second


function stretch() {
    return new Promise((res,rej)=>{
        setTimeout(() => {
            console.log('done stretching')
            res();
        }, 1000);
    })

}
// stretch()


// - should return a promise
// - should console.log "done running on treadmill" and fulfill the promise
// after 0.5 seconds
// TODO: write a function called runOnTreadmill


function runOnTreadmill() {
    return new Promise((res,rej) =>{
        setTimeout(() => {
            console.log('done running on treadmill')
            res();
        }, 500);
    })

}
// runOnTreadmill()

// TODO: write a function called liftWeights
// - should return a promise
// - should console.log "done lifting weights" and fulfill the promise
// after 2 seconds


function liftWeights() {
    return new Promise((res,rej) => {
        setTimeout(() => {
            console.log('done lifting weights')
            res();
        }, 2000);
    })
}
// liftWeights()

// TODO: write a function called workout that runs the above functions in a way
// that ensures you begin runningOnTreadmill after you're finished stretching,
// you begin liftWeights after you've finished running on the treadmill
// and console.logs "done working out" after you've finished lifting weights


function workout() {
    stretch()
    .then(runOnTreadmill())
    .then(liftWeights())
    .then(() => console.log('done working out'))
    .catch((err) => console.log(err));

}

workout()

// TESTING:
// - run the file (node problem_1.js) to see if you get the expected output


// workout();
// done stretching
// done running on treadmill
// done lifting weights
// done working out