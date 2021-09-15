package data.structures.java.numbers;

public class StaircaseHeight
{
  /*
  Given N blocks, how many steps can be made.
  1 block   - 1 step
  2 blocks  - 1 step
  3 blocks  - 2 steps
  ...
  Note that this is a consequtive sum problem: N = n(n+1) / 2
  n*n + n = 2N
  n*n + n - 2N = 0
  Where:
  a = 1, b = 1, c = -(2 * N)
  a(x*x) + bx + c = 0
  */
  public static int height(int blocks)
  {
    if(blocks < 2)
    {
      return blocks;
    }

    int a = 1, b = 1, c = -blocks * 2;
    double sqrt = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
    int root1 = (int)(-b + sqrt) / (2 * a);
    int root2 = (int)(-b - sqrt) / (2 * a);
    return root1 > 0 ? root1 : root2;
  }
}
