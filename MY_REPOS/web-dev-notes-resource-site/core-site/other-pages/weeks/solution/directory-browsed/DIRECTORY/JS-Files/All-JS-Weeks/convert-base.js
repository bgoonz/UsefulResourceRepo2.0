let convert = (number, base = 2) => {
    // Edge Cases
    if (isNaN(number) || number <= 0 || base < 2 || base > 9) return;
    // Where we store our remainders (which become our new value)
    let baseValues = [];
    // Store original number for reference in result
    let original = number;
    // This could be done recursively as well, but idk
    while (number > 0) {
        // Add the remainder of number / base to our array
        baseValues.push(number % base);
        // Actually divide number by base and floor it so we can eventually hit 0
        number = Math.floor(number / base);
    }
    // The array has our new value, but it's stored in reverse order in separate indices, therefore we need to reverse it, and concatenate them, then we turn that whole thing into a number.
    let baseVal = Number(baseValues.reverse().join(""));
    // The ternaries in the return simply add binary or octal if you chose 2 or 8 as your base
    return `Base 10: ${original}\nBase ${
        base === 2 ? "2 (binary)" : base === 8 ? "8 (octal)" : base
    }: ${baseVal}\n`;
};

console.log(
    convert(4515, 8)
); /* Base 10: 4515
                                     Base 8 (octal): 10643 */
console.log(
    convert(231, 2)
); /* Base 10: 231
                                     Base 2 (binary): 11100111 */
console.log(
    convert(4324220, 3)
); /* Base 10: 4324220
                                     Base 3: 22010200201022 */

//----------------------------------OR---------------------------------------------------------------------------------------------

let convert = (number, base = 2) => {
    if (isNaN(number) || number <= 0 || base < 2 || base > 17) return;

    let baseValues = [];
    let original = number;
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

    while (number > 0) {
        baseValues.push(nums[number % base]);
        number = Math.floor(number / base);
        // console.log(number);
    }

    let baseVal = baseValues.reverse().join("");
    return `Base 10: ${original}\nBase ${
        base === 2
            ? "2 (binary)"
            : base === 8
            ? "8 (octal)"
            : base === 16
            ? "16 (hexadecimal)"
            : base
    }: ${baseVal}\n`;
};

console.log(convert(4515, 16));
console.log(convert(231, 2));
console.log(convert(4324220, 3));
