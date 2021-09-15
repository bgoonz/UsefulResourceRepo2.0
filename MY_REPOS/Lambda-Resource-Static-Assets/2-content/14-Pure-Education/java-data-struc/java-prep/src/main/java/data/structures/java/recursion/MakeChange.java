package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MakeChange
{
  static class ChangeWithLeastCoins
  {
    /*
    Use largest denomination first
    If remaining amount > largest denomination
      # of coins += amount / demonination
      # of coins remaining %= amount % denomination
      break;
     */
    private int amountRemaining;
    private int[] denominations; // largest currency must come first
    private int numberCoins;

    public ChangeWithLeastCoins(int amount, int[] denoms)
    {
      this.amountRemaining = amount;
      this.denominations = denoms;
    }

    public int makeChange()
    {
      if(amountRemaining == 0)
      {
        return numberCoins;
      }

      for(int i = 0; i < denominations.length; ++i)
      {
        if(amountRemaining >= denominations[i])
        {
          numberCoins += amountRemaining / denominations[i];
          amountRemaining %= denominations[i];
          break;
        }
      }
      return makeChange();
    }
  }

  //  =============================================================================
  //  =============================================================================
  //  =============================================================================
  public static int makeChangeForAnyCurrency(int amount, int[] coins)
  {
  /*
  Set of solutions can be divided into 2 sets:
  1.  Solutions that do not contain nth coin
  2.  Solutions that contain at least one nth coin
  C() --> count()
                               C({1,2,3}, 5)
                             /             \
                           /                \
               C({1,2,3}, 2)                 C({1,2}, 5)
              /       \                      /      \
             /         \                    /        \
  C({1,2,3}, -1)  C({1,2}, 2)        C({1,2}, 3)    C({1}, 5)
                 /    \             /     \           /     \
               /       \           /       \         /       \
      C({1,2},0)  C({1},2)   C({1,2},1) C({1},3)    C({1}, 4)  C({}, 5)
                     / \     / \        /\         /     \
                    /   \   /   \     /   \       /       \
                  .      .  .     .   .     .   C({1}, 3) C({}, 4)
                                                 / \
                                                /   \
  */
    return makeChangeForAnyCurrency(amount, coins, coins.length - 1);
  }

  private static int makeChangeForAnyCurrency(int amount, int[] coins, int index)
  {
    if(amount < 0 || index < 0)
    {
      return 0;
    }

    if(amount == 0)
    {
      return 1;
    }

    return makeChangeForAnyCurrency(amount - coins[index], coins, index) +
        makeChangeForAnyCurrency(amount, coins, index - 1);
  }

    //  =============================================================================
    //  =============================================================================
    //  =============================================================================
    public static int makeChangeForKnownCurrency(int total, int denom)
    {
      int nextDenom = 0;
      switch(denom)
      {
        case 25:
          nextDenom = 10;
          break;
        case 10:
          nextDenom = 5;
          break;
        case 5:
          nextDenom = 1;
          break;
        case 1:
          return 1;
      }

      int ways = 0;
      for(int i = 0; i * denom <= total; ++i)
      {
        ways += makeChangeForKnownCurrency(total - i * denom, nextDenom);
      }
      return ways;
    }

  //  =============================================================================
  //  =============================================================================
  //  =============================================================================
  public static List<int[]> makeChangeAndPrint(int amount, int[] coins)
  {
    List<int[]> result = new ArrayList<>();
    String s = "";
    makeChangeAndPrint(result, coins, coins.length - 1, amount, s);
    return result;
  }

  private static void makeChangeAndPrint(List<int []> result, int coins[], int index, int amount, String s)
  {
    if(amount == 0)
    {
      String[] vals = s.split(",");
      int[] ans = Arrays.stream(vals).mapToInt(Integer::valueOf).toArray();
      result.add(ans);
      return;
    }

    if(index < 0 || amount < 0)
    {
      return;
    }

    makeChangeAndPrint(result, coins, index - 1, amount, s);
    s += coins[index] + ",";
    makeChangeAndPrint(result, coins, index, amount - coins[index], s);
  }
}
