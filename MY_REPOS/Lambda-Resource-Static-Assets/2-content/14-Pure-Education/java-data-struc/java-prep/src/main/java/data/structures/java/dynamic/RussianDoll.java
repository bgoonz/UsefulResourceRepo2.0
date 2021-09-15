package data.structures.java.dynamic;

import java.util.Arrays;
import java.util.Comparator;

public class RussianDoll
{
  //  You have a number of envelopes with widths and heights given as a pair of integers (w, h).
  //  One envelope can fit into another if and only if both the width and height of one envelope is greater
  //  than the width and height of the other envelope.
  //  What is the maximum number of envelopes can you Russian doll? (put one inside other)
  //  This is a MaxIncreasingSubSequence problem after the sort

  protected int [][] envelopes;
  public RussianDoll(int [][] envelopes)
  {
    this.envelopes = envelopes;
  }

  protected void sort()
  {
    Arrays.sort(envelopes, Comparator.comparingInt((int[] arr) -> arr[0])
        .thenComparing((int[] arr) -> arr[1], Comparator.reverseOrder()));
  }

  public int russianDollCount()
  {
    //  Sort by width ascending then by height descending
    /*
      Consider following envelopes:
        {9, 7},
        {9, 8},
        {9, 10},
        {10, 8},
      We can fit {9, 7} inside {10, 8} but not {9, 10}. If we sort y-coord in descending order
        {9, 10},
        {9, 8},
        {9, 7},
        {10, 8},
      We can now fit {9, 7} inside {10, 8}
     */
    sort();

    int[] dp = new int[envelopes.length];
    dp[0] = 1;

    for (int i = 1; i < envelopes.length; ++i)
    {
      if (envelopes[i][0] > envelopes[i - 1][0] && envelopes[i][1] > envelopes[i - 1][1])
      {
        dp[i] = dp[i - 1] + 1;
      }
      else
      {
        dp[i] = 1;
      }
    }

    return Arrays.stream(dp).max().getAsInt();
  }
}
