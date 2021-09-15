package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class PhoneNumbersWithKnight
{
  //  Note: first move is 0.
  //  In KnightTour the first move is 1 because it was set prior to calling the solve method
  private static int[][] MOVES = {{4,6},{6,8},{7,9},{4,8},{0,3,9},{},{1,7,0},{2,6},{1,3},{2,4}};
  private int numDigits;

  public PhoneNumbersWithKnight(int numDigits)
  {
    this.numDigits = numDigits;
  }

  public int count(int current, int move)
  {
    if(move == numDigits)
    {
      return 1;
    }

    int sum = 0;
    int numMoves = MOVES[current].length;
    for(int i = 0; i < numMoves; ++i)
    {
      sum += count(MOVES[current][i], move + 1);
    }
    return sum;
  }

  public List<String> countAndKeep(int current, int move)
  {
    List<String> result = new ArrayList<>();
    StringBuilder sb = new StringBuilder();
    countAndKeep(current, move, sb, result);
    return result;
  }

  private void countAndKeep(int current, int move, StringBuilder sb, List<String> result)
  {
    if(move == numDigits)
    {
      result.add(sb.toString());
      return;
    }

    int numMoves = MOVES[current].length;
    for(int i = 0; i < numMoves; ++i)
    {
      sb.delete(move, sb.length());
      sb.append(MOVES[current][i]);
      countAndKeep(MOVES[current][i], move + 1, sb, result);
    }
  }
}
