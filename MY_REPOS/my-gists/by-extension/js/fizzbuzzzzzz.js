//FizzBuzz algorithm using modern javascript

let fizzBuzz = (num, fizzNum, buzzNum) => {
    for (let i = 0; i <= num; i++) {
        if ((i % (fizzNum * buzzNum)) == 0) console.log("FizzBuzz  🔥 🔥 🔥");
        else if ((i % fizzNum) == 0) console.log("Fizz  👍 👍 👍");
        else if ((i % buzzNum) == 0) console.log("Buzz  👎 👎 👎");
        else console.log(`No fizzBuzz for: ${i} 🤷‍ 🤷‍ 🤷‍`);
    };
};

fizzBuzz(20, 3, 5);
fizzBuzz(50, 2, 4);
fizzBuzz(100, 3, 7);
