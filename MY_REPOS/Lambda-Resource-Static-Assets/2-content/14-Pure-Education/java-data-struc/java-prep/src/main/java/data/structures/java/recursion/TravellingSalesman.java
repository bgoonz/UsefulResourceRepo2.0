package data.structures.java.recursion;

public class TravellingSalesman
{
  private int[][] distances;
  int VISITED_ALL;

  public TravellingSalesman(int[][] matrix)
  {
    this.distances = matrix;
    VISITED_ALL = (1 << distances.length) - 1;
  }

  public int tsp(int mask, int pos)
  {
    if(mask == VISITED_ALL)
    {
      return distances[pos][0];
    }

    int min = Integer.MAX_VALUE;
    for(int city = 0; city < distances.length; ++city)
    {
      if((mask & (1 << city)) == 0) // city has not been visited
      {
        int ans = distances[pos][city] + tsp(mask | (1 << city), city);
        min = Math.min(min, ans);
      }
    }
    return min;
  }
}
