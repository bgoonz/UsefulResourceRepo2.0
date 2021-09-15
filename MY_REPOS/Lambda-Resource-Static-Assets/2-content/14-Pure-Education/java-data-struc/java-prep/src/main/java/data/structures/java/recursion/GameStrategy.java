package data.structures.java.recursion;

public class GameStrategy
{
  /*
  Consider a row of n coins of values v1 . . . vn, where n is even.
  We play a game against an opponent by alternating turns.
  In each turn, a player selects either the first or last coin from the row, removes it from the row permanently,
  and receives the value of the coin.
  Determine the maximum possible amount of money we can definitely win if we move first.
  Examples:
  5, 3, 7, 10 : The user collects maximum value as 15(10 + 5)
  8, 15, 3, 7 : The user collects maximum value as 22(7 + 15)

  Two strategies:
  1.  User chooses left coin, opponent chooses left or right
      User collects: Vi + min(F(i+2,j), F(i+1, j-1))
  2.  User chooses right coin, opponent chooses left or right
      User collects: Vj + min(F(i+1, j-1), F(i, j-2))

  Why:
    If I take Vi, the opponent can choose either Vi+1 or Vj leaving me the choice of:
      If the opponent takes Vi+1, I have a choice of: Vi+2 or Vj
      If the opponent takes Vj, I have a choice of: Vi+1 or Vj-1
    If I take Vj, the opponent can choose wither Vi or Vj-1
      If the opponent takes Vi, I have a choice of: Vi+1 or Vj-1
      If the opponent takes Vj-1, I have a choice of Vi ot Vj-2
   */

  public static int optimalStrategy(int [] coins)
  {
    return optimalStrategy(coins, 0, coins.length - 1);
  }

  private static int optimalStrategy(int [] coins, int leftIndex, int rightIndex)
  {
    if(leftIndex == rightIndex)
    {
      return coins[leftIndex];
    }
    if(rightIndex == leftIndex + 1)
    {
      return Math.max(coins[leftIndex], coins[rightIndex]);
    }

    int leftMin = Math.min(optimalStrategy(coins, leftIndex + 2, rightIndex),
        optimalStrategy(coins, leftIndex + 1, rightIndex - 1));
    int rightMin = Math.min(optimalStrategy(coins, leftIndex + 1, rightIndex - 1),
        optimalStrategy(coins, leftIndex, rightIndex - 2));

    return Math.max(coins[leftIndex] + leftMin, coins[rightIndex] + rightMin);
  }
}
