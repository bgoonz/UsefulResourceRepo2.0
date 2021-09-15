const maybe = (result) => {
    return {
        if(number) {
            return {
                divisibleBy(divisor) {
                    return number % divisor === 0 && result;
                }
            }
        }
    }
}

const result = (Array.from({length: 100})).map((_, index) => {
    const number = index + 1
    return maybe('FizzBuzz').if(number).divisibleBy(15)
        || 
        maybe('Buzz').if(number).divisibleBy(5)
        ||
        maybe('Fizz').if(number).divisibleBy(3)
        ||
        number
}).join('\n')

console.log(result)