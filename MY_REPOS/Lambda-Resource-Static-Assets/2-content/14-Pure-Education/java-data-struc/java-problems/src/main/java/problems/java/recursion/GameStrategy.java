package problems.java.recursion;

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

    static int optimalStrategy(int[] coins)
    {
        return optimalStrategy(coins, 0, coins.length - 1);
    }

    static private int optimalStrategy(int[] coins, int left, int right)
    {
        if(left == right)
        {
            return coins[left];
        }
        if(left + 1 == right)
        {
            return Math.max(coins[left], coins[right]);
        }

        int leftMin = Math.min(optimalStrategy(coins, left + 2, right),
                optimalStrategy(coins, left + 1, right - 1));
        int rightMin = Math.min(optimalStrategy(coins, left, right - 2),
                optimalStrategy(coins, left + 1, right - 1));

        return Math.max(coins[left] + leftMin, coins[right] + rightMin);
    }

    static boolean testsPass()
    {
        boolean check =
                optimalStrategy(new int[] {5, 3, 7, 10}) == 15 &&
                        optimalStrategy(new int[] {8, 15, 3, 7}) == 22;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }
}
