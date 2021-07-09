/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = s => {
    let number = 0;
    const map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    const length = s.length;

    number = map[s[length - 1]];
    for (let i = length - 2; i >= 0; i--) {
        if (map[s[i]] < map[s[i + 1]]) {
            number -= map[s[i]];
        } else {
            number += map[s[i]];
        }
    }

    return number;

};
