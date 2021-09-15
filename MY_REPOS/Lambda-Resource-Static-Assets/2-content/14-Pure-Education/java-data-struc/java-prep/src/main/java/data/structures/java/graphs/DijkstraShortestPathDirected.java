package data.structures.java.graphs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class DijkstraShortestPathDirected
{
  //  Use Adjacency matrix for directed graphs
  static class Vertex implements Comparable<Vertex>
  {
    String name;
    List<Edge> adjList = new ArrayList<>();
    boolean visited;
    Vertex predecessor;
    int distance = Integer.MAX_VALUE;

    public Vertex(String name)
    {
      this.name = name;
    }

    public void addNeighbor(Edge edge)
    {
      adjList.add(edge);
    }

    @Override
    public int compareTo(Vertex o)
    {
      return Integer.compare(distance, o.distance);
    }

    @Override
    public String toString()
    {
      return "Vertex{" +
          "name='" + name + '\'' +
          '}';
    }
  }

  static class Edge
  {
    int weight;
    Vertex fromVertex;
    Vertex toVertex;

    public Edge(int weight, Vertex fromVertex, Vertex toVertex)
    {
      this.weight = weight;
      this.fromVertex = fromVertex;
      this.toVertex = toVertex;

      fromVertex.addNeighbor(this);
    }
  }

  public static void computePath(Vertex sourceVertex)
  {
    sourceVertex.distance = 0;

    PriorityQueue<Vertex> pq = new PriorityQueue<>();
    pq.add(sourceVertex);
    while(!pq.isEmpty())
    {
      Vertex vertex = pq.poll();
      if(!vertex.visited)
      {
        vertex.visited = true;
        for(Edge edge : vertex.adjList)
        {
          Vertex targetVertex = edge.toVertex;
          int distance = vertex.distance + edge.weight;
          if(targetVertex.distance > distance)
          {
            targetVertex.distance = distance;
            targetVertex.predecessor = vertex;
            pq.add(targetVertex);
          }
        }
      }
    }
  }

  public static int getShortestPath(Vertex targetVertex, List<Vertex> result)
  {
    for(Vertex vertex = targetVertex; vertex != null; vertex = vertex.predecessor)
    {
      result.add(vertex);
    }
    int distance = result.get(0).distance;
    Collections.reverse(result);
    return distance;
  }
}
