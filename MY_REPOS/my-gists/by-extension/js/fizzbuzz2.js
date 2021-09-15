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

const resultFor = (number) => {
    return {
        using(rules) {
            let result

            try {
                rules.forEach((output, divisor) => {
                    result = maybe(output).if(number).divisibleBy(divisor)
                    if (result) throw rules
                })
            } catch (error) {
                if (error !== rules) {
                    throw error
                }
            }
            return result || number
        }
    }
}

const fizzBuzz = (min, max) => {
    const numbers = Array.from({length: max + 1}).map((_, index) => index).slice(min);
    const rules = new Map([
        [15, 'FizzBuzz'],
        [5, 'Buzz'],
        [3, 'Fizz']
    ])
    return numbers.map((number) => resultFor(number).using(rules))
}

const results = fizzBuzz(1, 100)
console.log(results.join('\n'))