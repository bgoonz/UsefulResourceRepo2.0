package data.structures.java.recursion;

public class Islands
{
  //  Explanation of Flood Fill which is a variation of the Islands algo
  /*
  Given a 2D screen, location of a pixel in the screen ie(x,y) and a color(K),
  your task is to replace color of the given pixel and all adjacent same colored pixels with
  the given color K.
  {1, 1, 1, 1, 1, 1, 1, 1},     {1, 1, 1, 1, 1, 1, 1, 1},
  {1, 1, 1, 1, 1, 1, 0, 0},     {1, 1, 1, 1, 1, 1, 0, 0},
  {1, 0, 0, 1, 1, 0, 1, 1},     {1, 0, 0, 1, 1, 0, 1, 1},
  {1, 2, 2, 2, 2, 0, 1, 0},     {1, 3, 3, 3, 3, 0, 1, 0},
  {1, 1, 1, 2, 2, 0, 1, 0},     {1, 1, 1, 3, 3, 0, 1, 0},
  {1, 1, 1, 2, 2, 2, 2, 0},     {1, 1, 1, 3, 3, 3, 3, 0},
  {1, 1, 1, 1, 1, 2, 1, 1},     {1, 1, 1, 1, 1, 3, 1, 1},
  {1, 1, 1, 1, 1, 2, 2, 1},     {1, 1, 1, 1, 1, 3, 3, 1},

  Notes:
  It may appear that following calls are not required:
    merge(x - 1, y);
    merge(x, y - 1);
  However, consider following matrix:
    0 0 0 0 0
    0 0 1 0 0
    0 1 1 1 0
    0 0 1 0 0
    0 0 0 0 0
  If we don't try moves in the negative directions, we end up with the following result:
    0 0 0 0 0
    0 0 0 0 0
    0 1 0 0 0
    0 0 0 0 0
    0 0 0 0 0
   */

  private int[][] grid;

  public Islands(int[][] grid)
  {
    this.grid = grid;
  }

  public int count()
  {
    int count = 0;
    for(int i = 0; i < grid.length; ++i)
    {
      for(int j = 0; j < grid[0].length; ++j)
      {
        if(grid[i][j] == 1)
        {
          count++;
          merge(i, j);
        }
      }
    }
    return count;
  }

  private void merge(int x, int y)
  {
    int rows = grid.length;
    int cols = grid[0].length;

    if(x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] == 0)
    {
      return;
    }

    grid[x][y] = 0;

    merge(x + 1, y);
    merge(x, y + 1);
    merge(x - 1, y);
    merge(x, y - 1);
  }

  public void floodFill(int fromColor, int toColor)
  {
    for(int i = 0; i < grid.length; ++i)
    {
      for (int j = 0; j < grid[0].length; ++j)
      {
        if(grid[i][j] == fromColor)
        {
          floodFill(i, j, fromColor, toColor);
        }
      }
    }
  }

  private void floodFill(int x, int y, int fromColor, int toColor)
  {
    if(x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] != fromColor)
    {
      return;
    }

    grid[x][y] = toColor;

    floodFill(x + 1, y, fromColor, toColor);
    floodFill(x, y + 1, fromColor, toColor);
    floodFill(x - 1, y, fromColor, toColor);
    floodFill(x, y - 1, fromColor, toColor);
  }

  public int[][] getGrid()
  {
    return grid;
  }

}
