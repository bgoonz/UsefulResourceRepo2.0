package data.structures.java.matrix;

public class RotateBy90
{
  /*
  Consider a 3 X 3 Matrix
  We need to consider following iterations for a 3 x 3 matrix
  First Iteration:      Second Iteration:
  i = 0                 i = 0
  j = 0                 j = 1
  rows - 1 - i = 2      rows - 1 - i = 2
  rows - 1 - j = 2      rows - 1 - j = 1

  Clockwise:
  1 2 3     7 4 1
  4 5 6  -> 8 5 2
  7 8 9     9 6 3

    First Iteration:  Second Iteration:
      7 2 1               7 4 1
      4 5 6               8 5 2
      9 8 3               9 6 3

    Second Iteration:
  Counter-Clockwise:
  1 2 3     3 6 9
  4 5 6  -> 2 5 8
  7 8 9     1 4 7
    First Iteration:  Second Iteration:
      3 2 9               3 6 9
      4 5 6               2 5 8
      1 8 7               1 4 7
  */
  public static void rotateClockwise(int[][] matrix)
  {
    int rows = matrix.length;
    for(int i = 0; i < rows / 2; ++i)
    {
      for(int j = i; j < rows - 1 - i; ++j)
      {
        int tmp = matrix[i][j];
        matrix[i][j] = matrix[rows - 1 - j][i];
        matrix[rows - 1 - j][i] = matrix[rows - 1 - i][rows - 1 - j];
        matrix[rows - 1 - i][rows - 1 - j] = matrix[j][rows - 1 - i];
        matrix[j][rows - 1 - i] = tmp;
      }
    }
  }

  public static void rotateCounterClockwise(int[][] matrix)
  {
    int rows = matrix.length;
    for(int i = 0; i < rows / 2; ++i)
    {
      for(int j = i; j < rows - 1 - i; ++j)
      {
        int tmp = matrix[i][j];
        matrix[i][j] = matrix[j][rows - 1 - i];
        matrix[j][rows - 1 - i] = matrix[rows - 1 - i][rows - 1 - j];
        matrix[rows - 1 - i][rows - 1 - j] = matrix[rows - 1 - j][i];
        matrix[rows - 1 - j][i] = tmp;
      }
    }
  }
}
