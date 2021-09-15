const spiralOrder = (matrix) => {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  //Use 4 pointes to create wall around square
  let rowBegin = 0,
    rowEnd = matrix.length - 1,
    colBegin = 0,
    colEnd = matrix[0].length - 1;

  let result = [];
  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    //move right
    for (let i = colBegin; i <= colEnd; i++) {
      result.push(matrix[rowBegin][i]);
    }
    rowBegin++; // mark row as traversed after moving right

    //move down
    for (let i = rowBegin; i <= rowEnd; i++) {
      result.push(matrix[i][colEnd]);
    }
    colEnd--; //mark column as traversed after moving down

    //move left
    if (rowBegin <= rowEnd) {
      for (let i = colEnd; i >= colBegin; i--) {
        result.push(matrix[rowEnd][i]);
      }
    }
    rowEnd--; //mark end row as traversed after moving left

    //move up
    if (colBegin <= colEnd) {
      for (let i = rowEnd; i >= rowBegin; i--) {
        result.push(matrix[i][colBegin]);
      }
    }
    colBegin++; //mark begining column as traversed after moving up
  }

  return result;
};
