package data.structures.java.recursion.backtracking;

public class Sudoku
{
  private Integer[][] board;

  public Sudoku(Integer[][] board)
  {
    this.board = board;
  }

  public void solveSudoku()
  {
    if(solve())
    {
      if(boardValid())
      {
        printSolution();
      }
    }
    else
    {
      System.out.println("Solution does not exist.");
    }
  }

  private boolean boardValid(int row, int col, Integer val)
  {
    for(int i = 0; i < 9; ++i)
    {
      //  patternMatch cols
      if(board[i][col] != null && board[i][col] == val)
      {
        return false;
      }
      // patternMatch rows
      if(board[row][i] != null && board[row][i] == val)
      {
        return false;
      }
       //  patternMatch boxes
      if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] != null &&
          board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == val)
      {
        return false;
      }
    }
    return true;
  }

  private boolean solve()
  {
    for(int row = 0; row < 9; ++row)
    {
      for(int col = 0; col < 9; ++col)
      {
        if(board[row][col] != null)
        {
          continue;
        }

        for(Integer val = 1; val <= 9; ++val)
        {
          if(boardValid(row, col, val))
          {
            board[row][col] = val;
            if(solve())
            {
              return true;
            }
            board[row][col] = null;
          }
        }
        return false;
      }
    }
    return true;
  }

  public boolean boardValid()
  {
    if(board == null || board.length != 9 || board[0].length != 9)
    {
      return false;
    }

    // for every row, patternMatch columns for unique numbers
    for(int row = 0; row < 9; ++row)
    {
      boolean [] m = new boolean[9];
      for(int col = 0; col < 9; ++col)
      {
        if(board[row][col] != null)
        {
          if(m[board[row][col] - 1])
          {
            return false;
          }
          m[board[row][col] - 1] = true;
        }
      }
    }

    // for every column, patternMatch rows for unique number
    for(int col = 0; col < 9; ++col)
    {
      boolean[] m = new boolean[9];
      for(int row = 0; row < 9; ++row)
      {
        if(board[row][col] != null)
        {
          if(m[board[row][col] - 1])
          {
            return false;
          }
          m[board[row][col] - 1] = true;
        }
      }
    }

    //  patternMatch each 3 x 3 matrix
    for(int block = 0; block < 9; ++block)
    {
      boolean[] m = new boolean[9];
      for(int row = block / 3 * 3; row < block / 3 * 3 + 3; ++row)
      {
        for(int col = block % 3 * 3; col < block % 3 * 3 + 3; ++col)
        {
          if(board[row][col] != null)
          {
            if(m[board[row][col] - 1])
            {
              return false;
            }
            m[board[row][col] - 1] = true;
          }
        }
      }
    }
    return true;
  }

  private void printSolution()
  {
    for(int x = 0; x < board.length; ++x)
    {
      for(int y = 0; y < board[0].length; ++y)
      {
        System.out.print(String.format( " %2d ", board[x][y]));
      }
      System.out.println("\n");
    }
  }

  public static void main(String[] args)
  {
    Integer[][] board = new Integer[][] {
        {5, 3, null, null, 7, null, null, null, null},
        {6, null, null, 1, 9, 5, null, null, null},
        {null, 9, 8, null, null, null, null, 6, null},
        {8, null, null, null, 6, null, null, null, 3},
        {4, null, null, 8, null, 3, null, null, 1},
        {7, null, null, null, 2, null, null, null, 6},
        {null, 6, null, null, null, null, 2, 8, null},
        {null, null, null, 4, 1, 9, null, null, 5},
        {null, null, null, null, 8, null, null, 7, 9}
    };

    Sudoku sudoku = new Sudoku(board);
    assert(sudoku.boardValid());
    sudoku.solveSudoku();
  }

}
