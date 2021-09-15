package problems.java.concurrency;



import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.*;
import java.util.stream.Collectors;

public class ProcessGraphInParallel
{
    static class Node<T>
    {
        private T data;
        private List<Node<T>> children;

        Node(T t)
        {
            data = t;
        }

        void addChildren(Node<T>... nodes)
        {
            children = Arrays.stream(nodes).collect(Collectors.toList());
        }

        T compute()
        {
            return data;
        }
    }

    static<T> Collection<T> getResults(List<Node<T>> nodes) throws InterruptedException
    {
        ExecutorService exec = Executors.newCachedThreadPool();
        Queue<T> queue = new ConcurrentLinkedQueue<>();
        parallelRecurse(exec, nodes, queue);
        exec.shutdown();
        exec.awaitTermination(Integer.MAX_VALUE, TimeUnit.SECONDS);
        return queue;
    }

    private static<T> void parallelRecurse(Executor exec, List<Node<T>> nodes, Collection<T> result)
    {
        if(nodes != null && !nodes.isEmpty())
        {
            for(Node<T> node : nodes)
            {
                exec.execute(() -> result.add(node.compute()));
                parallelRecurse(exec, node.children, result);
            }
        }
    }
}
