package data.structures.java.recursion;

public class EggDrop
{
  //  Consider 10 floors and 2 eggs for a result of 4 (Floors: 4, 7, 9)
  //  Consider 105 floors and 2 eggs for a result of 14
  /*
  Drop  Floor   Delta (n * (n+1) / 2)
  -------------------
  1     14         13
  2     27         12
  3     39         11
  4     50         10
  5     60          9
  6     69          8
  7     77          7
  8     84          6
  9     90          5
  10    95          4
  11    99          3
  12    102         2
  13    104         1
  14    105

   This will be too slow if the number of floors is > 25.
   Use DP solution.
   */
  public static int drop(int topFloor, int eggs)
  {
    if(eggs == 1 || topFloor == 0 || topFloor == 1)
    {
      return topFloor;
    }

    int min = Integer.MAX_VALUE;

    for(int currentFloor = 1; currentFloor <= topFloor; ++currentFloor)
    {
      int max = Math.max(drop(currentFloor - 1, eggs - 1), drop(topFloor - currentFloor, eggs));
      min = Math.min(min, 1 + max);
    }

    return min;
  }

  public static int dropDynamic(int floor, int eggs)
  {
    return data.structures.java.dynamic.EggDrop.drop(floor, eggs);
  }

  public static int dropNumeric(int floor)
  {
    return data.structures.java.numbers.EggDrop.drop(floor);
  }

}
