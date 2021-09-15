package problems.java.graphs;

import java.util.*;
import java.util.stream.Collectors;

public class MinSpanTree
{
    static class PrimMST
    {
        //  Start with node 0 and choose next node at min distance
        private boolean[] marked;
        private Queue<Edge> edges = new LinkedList<>();
        private PriorityQueue<Edge> minHeap = new PriorityQueue<>();

        PrimMST(EdgeWeightedGraph g)
        {
            marked = new boolean[g.V()];
            visit(g, 0);

            while(!minHeap.isEmpty())
            {
                Edge e = minHeap.poll();
                int v = e.either();
                int w = e.other(v);
                if(!(marked[v] && marked[w]))
                {
                    edges.offer(e);
                    if(!marked[v])
                    {
                        visit(g, v);
                    }
                    if(!marked[w])
                    {
                        visit(g, w);
                    }
                }
            }
        }

        private void visit(EdgeWeightedGraph g, int v)
        {
            marked[v] = true;
            for(Edge e : g.adjList[v])
            {
                if(!marked[e.other(v)])
                {
                    minHeap.offer(e);
                }
            }
        }

        double getMSTWeight()
        {
            return edges.stream().map(Edge::weight).reduce(0.0, Double::sum);
        }

        static boolean testsPass()
        {
            EdgeWeightedGraph g = new EdgeWeightedGraph(8);

            g.addEdge(new Edge(0, 2, 0.26));
            g.addEdge(new Edge(0, 7, 0.16));
            g.addEdge(new Edge(0, 4, 0.38));
            g.addEdge(new Edge(0, 6, 0.58));
            g.addEdge(new Edge(1, 3, 0.29));
            g.addEdge(new Edge(1, 5, 0.32));
            g.addEdge(new Edge(1, 7, 0.19));
            g.addEdge(new Edge(1, 2, 0.36));
            g.addEdge(new Edge(2, 6, 0.40));
            g.addEdge(new Edge(2, 7, 0.34));
            g.addEdge(new Edge(3, 6, 0.52));
            g.addEdge(new Edge(4, 5, 0.35));
            g.addEdge(new Edge(4, 6, 0.93));
            g.addEdge(new Edge(4, 7, 0.37));
            g.addEdge(new Edge(5, 7, 0.28));
            g.addEdge(new Edge(3, 2, 0.17));

            PrimMST mst = new PrimMST(g);

            boolean check = mst.getMSTWeight() == 1.81;
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

    ////////////////////////////////////////////////////////////////////////////////////
    static class KruskalMST
    {
        //  Complexity: E log E
        //  Add edges starting sorted by weight as long as they do not create a cycle
        //  E = V - 1 means we have an MST
        //  Use UnionFind to check if adding an edge would create a cycle O(log V)
        private Queue<Edge> edges = new LinkedList<>();

        KruskalMST(EdgeWeightedGraph g)
        {
            PriorityQueue<Edge> minHeap = new PriorityQueue<>();
            minHeap.addAll(g.edges);

            UnionFind uf = new UnionFind(g.V());
            while(!minHeap.isEmpty() && edges.size() < g.V() - 1)
            {
                Edge e = minHeap.poll();
                int v = e.either();
                int w = e.other(v);
                if(!uf.connected(v, w))
                {
                    uf.union(v, w);
                    edges.offer(e);
                }
            }
        }

        List<Edge> edges()
        {
            return edges.stream().collect(Collectors.toList());
        }

        double getMSTWeight()
        {
            return edges.stream().map(Edge::weight).reduce(0.0, Double::sum);
        }


        static boolean testsPass()
        {
            EdgeWeightedGraph g = new EdgeWeightedGraph(8);

            g.addEdge(new Edge(0, 2, 0.26));
            g.addEdge(new Edge(0, 7, 0.16));
            g.addEdge(new Edge(0, 4, 0.38));
            g.addEdge(new Edge(0, 6, 0.58));
            g.addEdge(new Edge(1, 3, 0.29));
            g.addEdge(new Edge(1, 5, 0.32));
            g.addEdge(new Edge(1, 7, 0.19));
            g.addEdge(new Edge(1, 2, 0.36));
            g.addEdge(new Edge(2, 6, 0.40));
            g.addEdge(new Edge(2, 7, 0.34));
            g.addEdge(new Edge(3, 6, 0.52));
            g.addEdge(new Edge(4, 5, 0.35));
            g.addEdge(new Edge(4, 6, 0.93));
            g.addEdge(new Edge(4, 7, 0.37));
            g.addEdge(new Edge(5, 7, 0.28));
            g.addEdge(new Edge(3, 2, 0.17));

            KruskalMST mst = new KruskalMST(g);

            boolean check = mst.getMSTWeight() == 1.81;
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

    ////////////////////////////////////////////////////////////////////////////////
    static class UnionFind
    {
        private int[] id;
        public UnionFind(int n)
        {
            id = new int[n];
            for(int i = 0; i < n; ++i)
            {
                id[i] = i;
            }
        }

        public boolean connected(int p, int q)
        {
            return root(p) == root(q);
        }

        public void union(int p, int q)
        {
            int i = root(p);
            int j = root(q);
            id[i] = j;
        }

        private int root(int i)
        {
            while(i != id[i])
            {
                i = id[i];
            }
            return i;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    static class Edge implements Comparable<Edge>
    {
        private double weight;
        private int v;
        private int w;

        Edge(int v, int w, double weight)
        {
            this.v = v;
            this.w = w;
            this.weight = weight;
        }

        int either()
        {
            return v;
        }

        int other(int vertex)
        {
            if(vertex == v)
            {
                return w;
            }
            return v;
        }

        double weight()
        {
            return weight;
        }

        @Override
        public int compareTo(Edge o)
        {
            return Double.compare(weight, o.weight);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    static class EdgeWeightedGraph
    {
        private int V;
        private List<Edge> edges = new ArrayList<>();
        private List<Edge>[] adjList;

        EdgeWeightedGraph(int v)
        {
            this.V = v;
            adjList = (List<Edge>[])new List[V];
            for(int i = 0; i < V; ++i)
            {
                adjList[i] = new ArrayList<>();
            }
        }

        void addEdge(Edge edge)
        {
            edges.add(edge);

            int v = edge.either();
            int w = edge.other(v);
            adjList[v].add(edge);
            adjList[w].add(edge);
        }

        int V()
        {
            return V;
        }

    }
}
