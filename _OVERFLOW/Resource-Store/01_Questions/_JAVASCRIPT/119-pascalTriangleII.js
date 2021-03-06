/**
 * calculate the element in reverse, resultRow[i] += resultRow[i-1]
 * we don't have to keep resultRow[i] if we do it from back to start.
 * @param {number} rowIndex
 * @return {number[]}
 */
const getRow = rowIndex => {
    const resultRow = [1];
    for (let i = 1; i <= rowIndex; i++) {
        for (let j = i - 1; j > 0; j--) {
            resultRow[j] += resultRow[j - 1];
        }
        resultRow.push(1);
    }

    return resultRow;
};
