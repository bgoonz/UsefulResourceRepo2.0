/*
Higher order functions warm-up

Run with: node e0-prepare-and-execute.js

Write a function `createExecutionChain` that will work like this:

Week 2 Day 4 -- closures / higher orders

*/

const createExecutionChain = () => {
    const fns = [];
    return (fnOrValue) => {
        if (typeof fnOrValue === "function") {
            // Do something.
            fns.push(fnOrValue);
        } else {
            // Do something else.
            let value = fnOrValue;
            fns.forEach((fn) => {
                value = fn(value);
            });
            // for (let i = 0; i < fns.length; i++) {
            //     value = fns[i](value);
            // }
            return value;
        }
    };
};

const prepareExecutionChain = createExecutionChain();
prepareExecutionChain(n => n + 1);
prepareExecutionChain(n => n * 5);
prepareExecutionChain(n => n / 2);
console.log(prepareExecutionChain(5)); // console.log is 15. 5+1->6*5->30/2->15