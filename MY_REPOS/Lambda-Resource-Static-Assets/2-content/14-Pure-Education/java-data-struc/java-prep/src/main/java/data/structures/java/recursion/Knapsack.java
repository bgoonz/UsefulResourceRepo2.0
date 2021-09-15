package data.structures.java.recursion;

public class Knapsack
{
  /*
  Consider following: (Note: items must be arranged in the ascending order)
  Capacity C = 2
  Weights: W[] = {1, 1, 1}
  Values:  V[] = {10, 20, 30}
  If the last and most valued item can't fit into the knapsack, move on to the next most valuable item
  If the last and most valued item can be fit into the knapsack, we have 2 options to consider:
  1.  Include last item, decrease Capacity and number of items
  2.  Exclude last item, keep same Capacity and decrease number of items
  Consider knapsack function K(C,n) where C is the knapsack capacity and n is the number of items
                     K(2, 3)
                      /   \
                     /     \
                 K(2,2)    K(1,2)
                  /\         /\
                 /  \       /  \
           K(2,1)  K(1,1) K(1,1) K(0,1)
           / \       / \
          /   \     /   \
         /     \   /     \
    K(2,0) K(1,0) K(1,0) K(0,0)

  If the last item can fit into the knapsack we have following options:
  1.  K(C - W[n-1], n-1, W[], V[]) + V[n-1] // include last item
  2.  K(C, n-1, W[], V[])                   // exclude last item
  Thus: the formula:
  max( (K(C - W[n-1], n-1, W[], V[]) + V[n-1]), K(C, n-1, W[], V[]) )

  Note repeated calls: K(1,1), K(1,0) which leads to suggest that this solution is not optimal.
  Consider dynamic programming solution. With:
  Rows:     index
  Columns:  capacity
  */

  public static int knapsack(int capacity, int[] weights, int[] values)
  {
    //  it does not matter if weights are values are sorted
    return knapsack(capacity, weights, values, values.length - 1);
  }

  private static int knapsack(int capacity, int[] weights, int[] values, int index)
  {
    if(capacity == 0 || index < 0)
    {
      return 0;
    }

    if(weights[index] > capacity)  //  Weight of last item is greater than capacity -> exclude last item
    {
      return knapsack(capacity, weights, values, index - 1);
    }

    int include = values[index] + knapsack(capacity - weights[index], weights, values, index - 1);
    int exclude = knapsack(capacity, weights, values, index - 1);
    return Math.max(include, exclude);
  }

  public static int knapsackDynamic(int capacity, int[] weights, int[] values)
  {
    return data.structures.java.dynamic.Knapsack.knapsack(capacity, weights, values);
  }

  //  =====================================================================================
  //  =====================================================================================
  //  =====================================================================================
  public static int elevator(int capacity, int[] weights)
  {
    return elevator(capacity, weights, weights.length - 1);
  }

  private static int elevator(int capacity, int [] weights, int index)
  {
    if(capacity == 0 || index < 0)
    {
      return 0;
    }

    if(weights[index] > capacity)
    {
      return elevator(capacity, weights, index - 1);
    }
    else
    {
      int include = weights[index] + elevator(capacity - weights[index], weights, index - 1);
      int exclude = elevator(capacity, weights, index - 1);
      return Math.max(include, exclude);
    }
  }
}
