let convert = (number, base = 2) => {
    if (isNaN(number) || number <= 0 || base < 2 || base > 17) return;

    let baseValues = [];
    let original = number;
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

    while (number > 0) {
        baseValues.push(nums[number % base]);
        number = Math.floor(number / base);
        // console.log(number);
    }

    let baseVal = baseValues.reverse().join('');
    return `Base 10: ${original}\nBase ${(base === 2) ? '2 (binary)' : (base === 8) ? '8 (octal)' : (base === 16) ? '16 (hexadecimal)' : base }: ${baseVal}\n`;
};

console.log(convert(4515, 16));
console.log(convert(231, 2));
console.log(convert(4324220, 3));