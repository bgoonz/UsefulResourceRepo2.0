/**
* Key: find the number of occurrences of the number and place the occurrences before the number
* Be careful about the last element.
*
* @param {number} n
* @return {string}
*/
const countAndSay = n => {
    let input = '1';
    let result = input;
    for (let i = 1; i < n; i++) {
        result = '';
        let count = 1;
        for (let j = 0; j < input.length; j++) {
            if (j === input.length - 1) {
                result = result + count + input[j];
                break;
              }
              if (input[j] === input[j+1]) {
                  count++;
              } else {
                  result = result + count + input[j];
                  count = 1;
              }
        }
        input = result;
    }
    return result;
};
