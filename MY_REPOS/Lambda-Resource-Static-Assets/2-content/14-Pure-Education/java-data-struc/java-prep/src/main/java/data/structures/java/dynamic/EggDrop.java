package data.structures.java.dynamic;

public class EggDrop
{
  //  Time Complexity: O(nk^2) // n = eggs, k = floors
  //  Auxiliary Space: O(nk)
  //  See https://brilliant.org/wiki/egg-dropping/
  /*
  //  Initialize dp[eggs][floors + 1] array
      0 1 2 3 4 5 6 7 8 9 10
   -------------------------
  1 | 0 1
  0 | 0 1 2 3 4 5 6 7 8 9 10

   Example of computing subsequent values for index row 1, column 5
   1. Max:
      [1][4], [0,0]
      [1][3], [0,1]
      [1][2], [0,2]
      [1][1], [0,3]
      [1][0], [0,4]
    2. Min
      Min(min, 1 + Max)

   */
  public static int drop(int topFloor, int eggs)
  {
    int[][] dp = new int[eggs][topFloor + 1];

    for(int i = 0; i < eggs; ++i)
    {
      dp[i][1] = 1;
    }

    for(int i = 2; i <= topFloor; ++i)
    {
      dp[0][i] = i;
    }

    for(int egg = 1; egg < eggs; ++egg)
    {
      for(int j = 2; j <= topFloor; ++j)
      {
        int min = Integer.MAX_VALUE;
        for(int currentFloor = 1; currentFloor <= j; ++currentFloor) // floors
        {
          int max = Math.max(dp[egg - 1][currentFloor - 1], dp[egg][j - currentFloor]);
          min = Math.min(min, 1 + max);
        }
        dp[egg][j] = min;
      }
    }

    return dp[eggs - 1][topFloor];
  }

  public static int dropRecursive(int topFloor, int eggs)
  {
    return data.structures.java.recursion.EggDrop.drop(topFloor, eggs);
  }

  public static int dropNumeric(int topFloor)
  {
    return data.structures.java.numbers.EggDrop.drop(topFloor);
  }

}
