package problems.java.graphs;

import java.util.*;
import java.util.stream.Collectors;

public class Graph
{
    private int V;
    private List<Integer>[] adjList;

    public Graph(int V)
    {
        this.V = V;
        adjList = (List<Integer>[])new List[V];
        for(int i = 0; i < V; ++i)
        {
            adjList[i] = new ArrayList<>();
        }
    }

    public void addEdge(int v, int w)
    {
        adjList[v].add(w);
        adjList[w].add(v);
    }

    public List<Integer> adjacency(int v)
    {
        return adjList[v];
    }

    public int V()
    {
        return V;
    }


    static boolean testsPass()
    {
        Graph g = new Graph(13);

        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(0, 6);
        g.addEdge(0, 5);
        g.addEdge(6, 4);
        g.addEdge(4, 5);
        g.addEdge(5, 3);
        g.addEdge(3, 4);

        g.addEdge(7, 8);

        g.addEdge(9, 10);
        g.addEdge(9, 11);
        g.addEdge(9, 12);
        g.addEdge(11, 12);

        for(int v = 0; v < g.V(); ++v)
        {
            for(int w : g.adjacency(v))
            {
                System.out.println(v + "-" + w);
            }
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

    ////////////////////////////////////////////////////////////////////////////////////////
    static class DepthFirstSearch
    {
        private boolean[] marked;
        private int[] edgeTo;
        private int source;

        public DepthFirstSearch(Graph g, int source)
        {
            this.source = source;
            marked = new boolean[g.V()];
            edgeTo = new int[g.V()];
            dfs(g, source);
        }

        private void dfs(Graph g, int v)
        {
            marked[v] = true;
            for(int i : g.adjacency(v))
            {
                if(!marked[i])
                {
                    dfs(g, i);
                    edgeTo[i] = v;
                }
            }
        }

        public boolean hasPathTo(int v)
        {
            return marked[v];
        }

        public List<Integer> pathTo(int v)
        {
            if(!hasPathTo(v))
            {
                return null;
            }
            Stack<Integer> stack = new Stack<>();
            for(int i = v; i != source; i = edgeTo[i])
            {
                stack.push(i);
            }
            stack.push(source);
            return stack.stream().collect(Collectors.toList());
        }

        static boolean testsPass()
        {
            Graph g = new Graph(13);

            g.addEdge(0, 1);
            g.addEdge(0, 2);
            g.addEdge(0, 6);
            g.addEdge(0, 5);
            g.addEdge(6, 4);
            g.addEdge(4, 5);
            g.addEdge(5, 3);
            g.addEdge(3, 4);

            g.addEdge(7, 8);

            g.addEdge(9, 10);
            g.addEdge(9, 11);
            g.addEdge(9, 12);
            g.addEdge(11, 12);

            DepthFirstSearch dfs = new DepthFirstSearch(g, 0);

            boolean check = dfs.hasPathTo(6) && dfs.hasPathTo(5) &&
                    dfs.hasPathTo(4) && dfs.hasPathTo(1) &&
                    dfs.hasPathTo(2) && dfs.hasPathTo(3);
            if(!check)
            {
                return false;
            }

            List<Integer> path = dfs.pathTo(3);
            check = Arrays.equals(new int[] {3, 5, 4, 6, 0}, path.stream().mapToInt(x -> x).toArray());
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

    /////////////////////////////////////////////////////////////////////////////////////////
    static class BreadthFirstSearch
    {
        private int source;
        private boolean[] marked;
        private int[] edgeTo;

        public BreadthFirstSearch(Graph g, int source)
        {
            this.source = source;
            marked = new boolean[g.V()];
            edgeTo = new int[g.V()];
            bfs(g, source);
        }

        private void bfs(Graph g, int v)
        {
            Queue<Integer> queue = new LinkedList<>();
            queue.offer(v);
            while (!queue.isEmpty())
            {
                int vertex = queue.poll();
                for (int i : g.adjacency(vertex))
                {
                    if (!marked[i])
                    {
                        queue.offer(i);
                        marked[i] = true;
                        edgeTo[i] = vertex;
                    }
                }
            }
        }

        public boolean hasPathTo(int v)
        {
            return marked[v];
        }

        public List<Integer> pathTo(int v)
        {
            if (!hasPathTo(v))
            {
                return null;
            }
            Stack<Integer> stack = new Stack<>();
            for (int i = v; i != source; i = edgeTo[i])
            {
                stack.push(i);
            }
            stack.push(source);
            return stack.stream().collect(Collectors.toList());
        }


        static boolean testsPass()
        {
            Graph g = new Graph(13);

            g.addEdge(0, 1);
            g.addEdge(0, 2);
            g.addEdge(0, 6);
            g.addEdge(0, 5);
            g.addEdge(6, 4);
            g.addEdge(4, 5);
            g.addEdge(5, 3);
            g.addEdge(3, 4);

            g.addEdge(7, 8);

            g.addEdge(9, 10);
            g.addEdge(9, 11);
            g.addEdge(9, 12);
            g.addEdge(11, 12);

            BreadthFirstSearch bfs = new BreadthFirstSearch(g, 0);

            boolean check = bfs.hasPathTo(6) && bfs.hasPathTo(5) &&
                    bfs.hasPathTo(4) && bfs.hasPathTo(1) &&
                    bfs.hasPathTo(2) && bfs.hasPathTo(3);
            if (!check)
            {
                return false;
            }

            List<Integer> path = bfs.pathTo(3);
            check = Arrays.equals(new int[]{3, 5, 0}, path.stream().mapToInt(x -> x).toArray());
            if (!check)
            {
                return false;
            }

            return true;
        }

        public static void main(String... args)
        {
            if (testsPass())
            {
                System.out.println("Tests passed");
            } else
            {
                System.out.println("Tests failed");
            }
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    static class ConnectedComponent
    {
        //  Note: determine if nodes are connected in O(1) time
        private boolean[] marked;
        private int[] id;
        private int count;

        public ConnectedComponent(Graph g)
        {
            marked = new boolean[g.V()];
            id = new int[g.V()];
            for(int i = 0; i < g.V(); ++i)
            {
                if(!marked[i])
                {
                    dfs(g, i);
                    count++;
                }
            }
        }

        public int count()
        {
            return count;
        }

        public int id(int v)
        {
            return id[v];
        }

        public boolean connected(int v, int w)
        {
            return id[v] == id[w];
        }

        private void dfs(Graph g, int v)
        {
            marked[v] = true;
            id[v] = count;
            for(int i : g.adjacency(v))
            {
                if(!marked[i])
                {
                    dfs(g, i);
                }
            }
        }

        static boolean testsPass()
        {
            Graph g = new Graph(13);

            g.addEdge(0, 1);
            g.addEdge(0, 2);
            g.addEdge(0, 6);
            g.addEdge(0, 5);
            g.addEdge(6, 4);
            g.addEdge(4, 5);
            g.addEdge(5, 3);
            g.addEdge(3, 4);

            g.addEdge(7, 8);

            g.addEdge(9, 10);
            g.addEdge(9, 11);
            g.addEdge(9, 12);
            g.addEdge(11, 12);

            ConnectedComponent cc = new ConnectedComponent(g);

            boolean check = cc.connected(3, 6) && cc.connected(5, 2) &&
                    cc.connected(7, 8) && cc.connected(10, 12);
            if(!check)
            {
                return false;
            }

            check = !cc.connected(3, 7) && !cc.connected(5, 11) && !cc.connected(8, 10);
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
}
