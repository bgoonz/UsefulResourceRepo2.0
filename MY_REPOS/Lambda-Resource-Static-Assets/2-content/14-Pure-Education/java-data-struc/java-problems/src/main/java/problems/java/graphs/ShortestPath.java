package problems.java.graphs;


import java.util.*;
import java.util.stream.Collectors;

public class ShortestPath
{
    static class DijkstraShortestPath
    {
        private double[] distTo;
        private DirectedEdge[] edgeTo;
        private PriorityQueue<Integer> pq = new PriorityQueue<>();

        DijkstraShortestPath(EdgeWeightedDiGraph g, int source)
        {
            distTo = new double[g.V()];
            Arrays.fill(distTo, Double.MAX_VALUE);
            distTo[source] = 0.0;
            edgeTo = new DirectedEdge[g.V()];

            pq.offer(source);
            while(!pq.isEmpty())
            {
                int vertex = pq.poll();
                for(DirectedEdge e : g.adjList(vertex))
                {
                    relax(e);
                }
            }
        }

        double distanceTo(int v)
        {
            return distTo[v];
        }

        List<DirectedEdge> pathTo(int v)
        {
            Stack<DirectedEdge> path = new Stack<>();
            for(DirectedEdge e = edgeTo[v]; e != null; e = edgeTo[e.from()])
            {
                path.push(e);
            }

            return path.stream().collect(Collectors.toList());
        }

        private void relax(DirectedEdge e)
        {
            int from = e.from(), to = e.to();
            if(distTo[to] > distTo[from] + e.weight())
            {
                distTo[to] = distTo[from] + e.weight();
                edgeTo[to] = e;

                pq.offer(to);
            }
        }

        static boolean testsPass()
        {
            EdgeWeightedDiGraph g = new EdgeWeightedDiGraph(8);

            g.addEdge(new DirectedEdge(0, 1, 5.0));
            g.addEdge(new DirectedEdge(0, 4, 9.0));
            g.addEdge(new DirectedEdge(0, 7, 8.0));
            g.addEdge(new DirectedEdge(1, 7, 4.0));
            g.addEdge(new DirectedEdge(1, 2, 12.0));
            g.addEdge(new DirectedEdge(1, 3, 15.0));
            g.addEdge(new DirectedEdge(2, 3, 3.0));
            g.addEdge(new DirectedEdge(2, 6, 11.0));
            g.addEdge(new DirectedEdge(3, 6, 9.0));
            g.addEdge(new DirectedEdge(4, 5, 4.0));
            g.addEdge(new DirectedEdge(4, 7, 5.0));
            g.addEdge(new DirectedEdge(4, 6, 20.0));
            g.addEdge(new DirectedEdge(5, 2, 1.0));
            g.addEdge(new DirectedEdge(5, 6, 13.0));
            g.addEdge(new DirectedEdge(7, 2, 7.0));
            g.addEdge(new DirectedEdge(7, 5, 6.0));

            DijkstraShortestPath dsp = new DijkstraShortestPath(g, 0);

            boolean check = dsp.distanceTo(6) == 25 && dsp.distanceTo(3) == 17;
            if(!check)
            {
                return false;
            }

            List<DirectedEdge> path = dsp.pathTo(3);
            int[] a = path.stream().mapToInt(DirectedEdge::from).toArray();
            check = Arrays.equals(a, new int[] {2, 5, 4, 0});
            if(!check)
            {
                return false;
            }


            return true;
        }

        public static void main(String... args)
        {
            if(testsPass())
            {
                System.out.println("Tests passed");
            }
            else
            {
                System.out.println("Tests failed");
            }
        }
    }

    static class DirectedEdge
    {
        private int from;
        private int to;
        private double weight;

        DirectedEdge(int from, int to, double weight)
        {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }

        int from()
        {
            return from;
        }

        int to()
        {
            return to;
        }

        double weight()
        {
            return weight;
        }
    }

    static class EdgeWeightedDiGraph
    {
        private int V;
        private List<DirectedEdge>[] adjList;

        EdgeWeightedDiGraph(int V)
        {
            this.V = V;
            adjList = (List<DirectedEdge>[]) new List[V];
            for(int i = 0; i < V; ++i)
            {
                adjList[i] = new ArrayList<>();
            }
        }

        void addEdge(DirectedEdge e)
        {
            adjList[e.from].add(e);
        }

        List<DirectedEdge> adjList(int v)
        {
            return adjList[v];
        }

        int V()
        {
            return V;
        }
    }
}
