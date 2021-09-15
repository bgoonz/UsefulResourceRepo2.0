package data.structures.java.recursion.backtracking;

public class PlaceQueens
{
  //  Since Grid is square, we do not need a double for loop
  //  Note isSafe on how to detect a match on the diagonal
  //  Call solve for each column. When col >= size, we have a base case.

  private int [][] solution;
  private int size;

  public PlaceQueens(int size)
  {
    this.size = size;
    this.solution = new int[size][size];
  }

  public boolean solve(int col)
  {
    if(col >= size)
    {
      return true;
    }

    for(int row = 0; row < size; ++row)
    {
      if(isSafe(row, col))
      {
        solution[row][col] = 1;
        if(solve(col + 1))
        {
          return true;
        }
        solution[row][col] = 0;
      }
    }
    return false;
  }

  public void printSolution()
  {
    for(int x = 0; x < size; ++x)
    {
      for(int y = 0; y < size; ++y)
      {
        System.out.print(String.format( " %2d ", solution[x][y]));
      }
      System.out.println("\n");
    }
  }

  private boolean isSafe(int x, int y)
  {
    if(x < 0 || x >= size || y < 0 || y >= size)
    {
      return false;
    }

    for(int i = 0; i < size; ++i)
    {
      if(solution[x][i] == 1)
      {
        return false;
      }
      if(solution[i][y] == 1)
      {
        return false;
      }
      for(int j = 0; j < size; ++j)
      {
        if(solution[i][j] == 1 && Math.abs(i - x) == Math.abs(j - y))
        {
          return false;
        }
      }
    }
    return true;
  }

  public static void main(String[] args)
  {
    PlaceQueens placeQueens = new PlaceQueens(8);
    if(placeQueens.solve(0))
    {
      placeQueens.printSolution();
    }
  }
}
