package data.structures.java.recursion.backtracking;


public class Maze
{
  int[][] solution;
  int[][] maze;

  public Maze(int[][] maze)
  {
    this.maze = maze;
    solution = new int[maze.length][maze[0].length];
  }

  private boolean isValid(int x, int y)
  {
    return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] == 1;
  }

  public boolean solve(int x, int y)
  {
    if(x == maze.length - 1 && y == maze[0].length - 1)
    {
      solution[x][y] = 1;
      return true;
    }

    if(isValid(x, y))
    {
      solution[x][y] = 1;
      if(solve(x + 1, y))
      {
        return true;
      }
      if(solve(x, y + 1))
      {
        return true;
      }
      solution[x][y] = 0;
    }
    return false;
  }

  private void printSolution()
  {
    for(int x = 0; x < solution.length; ++x)
    {
      for(int y = 0; y < solution[0].length; ++y)
      {
        System.out.print(String.format( " %2d ", solution[x][y]));
      }
      System.out.println("\n");
    }
  }

  public static void main(String[] args)
  {
    int[][] data = new int [][] {
        {1, 1, 0, 1},
        {0, 1, 1, 0},
        {0, 1, 1, 1},
        {0, 0, 1, 1},
        {0, 0, 1, 1}
    };
    Maze maze = new Maze(data);
    if(maze.solve(0, 0))
    {
      maze.printSolution();
    }
  }
}

