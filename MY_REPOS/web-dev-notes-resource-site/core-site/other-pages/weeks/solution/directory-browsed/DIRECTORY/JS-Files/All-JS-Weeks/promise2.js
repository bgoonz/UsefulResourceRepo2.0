function grindTheBeans() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Done grinding the coffee...`);
            resolve();
        }, 2000);
    });
}

function heatTheWater() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Done heating the water.`);
            resolve();
        }, 500);
    });
}

function addBeansToWater() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Done adding beans to the water.`);
            resolve()
        }, 1000);
    });
}

grindTheBeans()
    .then(heatTheWater)
    .then(addBeansToWater);
