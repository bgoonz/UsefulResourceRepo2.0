/**
 * @param {number} numRows
 * @return {number[][]}
 */
 const generate = numRows => {
    if (numRows === 0) return [];
    const result = [[1]];
    for (let i = 1; i < numRows; i++) {
        const preRow = result[i - 1];
        const newRow = [1];
        for (let j = 1; j < i; j++) {
          newRow[j] = preRow[j-1] + preRow[j];
        }
        newRow.push(1);
        result.push(newRow);
    }
    return result;
 };
