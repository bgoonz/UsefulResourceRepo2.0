package data.structures.java.graphs;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class GraphColoring
{
  //  Note the main method in this class.

  private int[][] adjMatrix;
  private char [] colors;
  Map<Integer,Character> vertexToColorMap = new HashMap<>();

  public GraphColoring(int[][] data, int m)
  {
    this.adjMatrix = data;
    colors = IntStream.range(0, m)
        .mapToObj(c -> Character.toString((char) (c + 'a')))
        .collect(Collectors.joining()).toCharArray();
  }

  public boolean canColor()
  {
    if(colors.length < 2 && adjMatrix.length > 1)
    {
      return false;
    }

    for(int vertex = 0; vertex < adjMatrix.length; ++vertex)
    {
      //  Check if all vertices have been colored
      if(vertexToColorMap.size() == adjMatrix.length)
      {
        return true;
      }
      //  Prepare all colors that may be used for this vertex
      String colorStr = new String(colors);
      List<Character> allColors = colorStr.chars().mapToObj(c -> (char) c).collect(Collectors.toList());
      //  Remove color of the current vertex
      Character vertexColor = vertexToColorMap.get(vertex);
      if(vertexColor == null)
      {
        vertexToColorMap.put(vertex, allColors.get(0));
        allColors.remove(0);
      }
      else
      {
        allColors.remove(vertexColor);
      }

      //  Check adjacent neighbors
      int[] neighbors = adjMatrix[vertex];
      for(int neighbor = 0; neighbor < neighbors.length; ++neighbor)
      {
        //  If the neighbor is not self and path exist to the neighbor
        if(neighbor != vertex && neighbors[neighbor] == 1)
        {
          Character neighborColor = vertexToColorMap.get(neighbor);
          if(neighborColor == null)
          {
            vertexToColorMap.put(neighbor, allColors.get(0));
            allColors.remove(0);
          }
          else
          {
            allColors.remove(vertexColor);
          }
        }
      }
    }

    return vertexToColorMap.size() == adjMatrix.length;
  }

  private void printSolution()
  {
    System.out.println("Following colors can be used:");
    for(Map.Entry<Integer,Character> e : vertexToColorMap.entrySet())
    {
      System.out.printf("VertexGeneral %d, color %c\n", e.getKey(), e.getValue());
    }
  }

  public static void main(String[] args)
  {
    int[][] adjMatrix = {
        {0, 1, 0, 1, 1},
        {1, 0, 1, 0, 1},
        {0, 1, 0, 1, 0},
        {1, 0, 1, 0, 1},
        {1, 1, 0, 1, 0},
    };

    GraphColoring graphColoring = new GraphColoring(adjMatrix, 4);
    if(graphColoring.canColor())
    {
      graphColoring.printSolution();
    }
  }
}
