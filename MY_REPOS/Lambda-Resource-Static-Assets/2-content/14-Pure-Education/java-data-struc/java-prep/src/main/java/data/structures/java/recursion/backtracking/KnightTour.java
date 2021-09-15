package data.structures.java.recursion.backtracking;

import java.util.Arrays;

public class KnightTour
{
  /*
  Notes:
  With backtracking, return true when it can be solved and return false at the end.
  See Maze problem.
   */
  private static int SIZE = 8;
  private int[][] solution = new int[SIZE][SIZE];
  private static int[] X_MOVES = {2, 1, -1, -2, -2, -1,  1,  2};
  private static int[] Y_MOVES = {1, 2,  2,  1, -1, -2, -2, -1};

  public KnightTour()
  {
    for(int i = 0; i < SIZE; ++i)
    {
      Arrays.fill(solution[i], -1);
    }

    //  First move is created here.
    solution[0][0] = 0;
    if(solve(0, 0, 1))
    {
      printSolution();
    }
    else
    {
      System.out.println("Solution does not exist");
    }
  }

  private boolean isSafe(int x, int y)
  {
    return x >=0 && x < solution.length && y >= 0 && y < solution[0].length && solution[x][y] == -1;
  }

  public boolean solve(int x, int y, int move)
  {
    if(move == SIZE * SIZE)
    {
      return true;
    }

    for(int i = 0; i < SIZE; ++i)
    {
      int nextX = x + X_MOVES[i];
      int nextY = y + Y_MOVES[i];
      if(isSafe(nextX, nextY))
      {
        solution[nextX][nextY] = move;
        if(solve(nextX, nextY, move + 1))
        {
          return true;
        }
        else
        {
          solution[nextX][nextY] = -1;
        }
      }
    }
    return false;
  }

  private void printSolution()
  {
    for(int x = 0; x < solution.length; ++x)
    {
      for(int y = 0; y < solution[0].length; ++y)
      {
        System.out.print(String.format( " %2d ", solution[x][y]));
      }
      System.out.println("\n");
    }
  }

  public static void main(String[] args)
  {
    new KnightTour();
  }
}
