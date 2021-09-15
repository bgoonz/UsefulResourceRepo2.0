package concurrency;


import java.util.Collection;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.*;

public class RunningInParallel
{
  static class Node<T>
  {
    private T data;
    Node(T t)
    {
      data = t;
    }
    List<Node<T>> children;
    T compute() {return data;}
  }

  public static<T> Collection<T> getResults(List<Node<T>> nodes) throws InterruptedException
  {
    ExecutorService exec = Executors.newCachedThreadPool();
    Queue<T> queue = new ConcurrentLinkedDeque<>();
    parallelRecurse(exec, nodes, queue);
    exec.shutdown();
    exec.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS);
    return  queue;
  }

  public static<T> void parallelRecurse(final Executor exec, List<Node<T>> nodes, final Collection<T> result)
  {
    for(final Node<T> n : nodes)
    {
      exec.execute(() -> result.add(n.compute()));
      parallelRecurse(exec, n.children, result);
    }
  }

}
