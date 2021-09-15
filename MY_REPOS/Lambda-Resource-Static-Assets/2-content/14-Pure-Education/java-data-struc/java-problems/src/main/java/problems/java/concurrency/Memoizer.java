package problems.java.concurrency;

import java.util.concurrent.*;

interface Computable<A,V>
{
    V compute(A arg) throws ExecutionException, InterruptedException;
}

public class Memoizer<A,V> implements Computable<A,V>
{
    private ConcurrentMap<A, Future<V>> cache = new ConcurrentHashMap<>();
    private Computable<A,V> computable;

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
                FutureTask<V> task = new FutureTask<>(callable);
                future = cache.putIfAbsent(arg, task);
                if(future == null)
                {
                    future = task;
                    task.run();
                }
            }

            try
            {
                return future.get();
            }
            catch(CancellationException e)
            {
                cache.remove(arg, future);
            }
            catch(ExecutionException e)
            {
                Throwable t = e.getCause();
                if(t instanceof RuntimeException)
                {
                    throw (RuntimeException)t;
                }
                else if(t instanceof Error)
                {
                    throw (Error)t;
                }
                else
                {
                    throw new IllegalStateException("Checked exception", t);
                }
            }
        }
    }
}
