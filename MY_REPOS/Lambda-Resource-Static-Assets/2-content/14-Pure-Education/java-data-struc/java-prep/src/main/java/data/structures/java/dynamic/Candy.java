package data.structures.java.dynamic;

public class Candy
{
  //  There are N children standing in a line. Each child is assigned a rating value.
  //  Each child must have at least one candy.
  //  Children with a higher rating get more candies than their neighbors.
  //  What is the minimum candies you must give?
  //  Ratings:   1, 0, 2
  //  Left:      1, 1, 2
  //  Right:     2, 1, 2
  //
  //  Ratings:          2, 4, 2, 6, 1, 7, 8, 9, 2, 1
  //  Left:             1, 2, 1, 2, 1, 2, 3, 4, 1, 1
  //  Right:            1, 2, 1, 2, 1, 1, 1, 3, 2, 1
  //  Min(left,right):  1, 2, 1, 2, 1, 1, 1, 3, 1, 1
  //  Total:            14


  private int[] ratings;

  public Candy(int [] ratings)
  {
    this.ratings = ratings;
  }


  public int giveMinimumCandies()
  {
    int [] left = new int[ratings.length];
    left[0] = 1;

    for(int i = 1; i < ratings.length; ++i)
    {
      if(ratings[i] > ratings[i - 1])
      {
        left[i] = left[i - 1] + 1;
      }
      else
      {
        left[i] = 1;
      }
    }

    int[] right = new int[ratings.length];
    right[right.length - 1] = 1;
    for(int i = ratings.length - 2; i >= 0; --i)
    {
      if(ratings[i] > ratings[i + 1])
      {
        right[i] = right[i + 1] + 1;
      }
      else
      {
        right[i] = 1;
      }
    }

    int total = 0;
    for(int i = 0; i < ratings.length; ++i)
    {
      total += Math.min(left[i], right[i]);
    }
    return total;
  }
}
