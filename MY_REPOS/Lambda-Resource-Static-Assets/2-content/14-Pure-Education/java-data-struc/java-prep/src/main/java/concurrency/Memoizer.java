package concurrency;

import java.util.concurrent.*;

import static concurrency.Common.launderThrowable;

interface Computable<A,V>
{
  V compute(A arg) throws InterruptedException;
}

public class Memoizer<A, V> implements Computable<A,V>
{
  private final ConcurrentMap<A, Future<V>> cache = new ConcurrentHashMap<>();
  private final Computable<A,V> computable;

  public Memoizer(Computable<A,V> computable)
  {
    this.computable = computable;
  }

  @Override
  public V compute(A arg) throws InterruptedException
  {
    while(true)
    {
      Future<V> future = cache.get(arg);
      if(future == null)
      {
        Callable<V> callable = () -> computable.compute(arg);
        FutureTask<V> f = new FutureTask<>(callable);
        future = cache.putIfAbsent(arg, f);
        if(future == null)
        {
          future = f;
          f.run();
        }
      }

      try
      {
        return future.get();
      }
      catch (CancellationException e)
      {
        cache.remove(arg, future);
      }
      catch (ExecutionException e)
      {
        throw launderThrowable(e.getCause());
      }
    }
  }
}
