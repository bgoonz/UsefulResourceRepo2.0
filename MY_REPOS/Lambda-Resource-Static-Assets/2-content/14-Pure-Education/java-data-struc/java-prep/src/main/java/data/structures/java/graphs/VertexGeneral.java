package data.structures.java.graphs;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class VertexGeneral<T>
{
  private T data;
  private boolean visited;
  private List<VertexGeneral<T>> adjacencyList = new ArrayList<>();

  public VertexGeneral(T data)
  {
    this.data = data;
  }

  public T getData()
  {
    return data;
  }

  public void add(VertexGeneral<T> vertex)
  {
    adjacencyList.add(vertex);
  }

  public boolean isVisited()
  {
    return visited;
  }

  public void setVisited(boolean visited)
  {
    this.visited = visited;
  }


  public List<VertexGeneral<T>> getAdjacencyList()
  {
    return adjacencyList;
  }

  public static<T> List<VertexGeneral<T>> bfs(VertexGeneral<T> vertex)
  {
    List<VertexGeneral<T>> result = new ArrayList<>();

    Queue<VertexGeneral<T>> queue = new LinkedList<>();
    queue.add(vertex);
    while(!queue.isEmpty())
    {
      vertex = queue.poll();
      if(!vertex.isVisited())
      {
        result.add(vertex);

        vertex.setVisited(true);
        queue.addAll(vertex.getAdjacencyList());
      }
    }
    return result;
  }
}
