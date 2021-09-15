package concurrency;

import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.*;

public class SwingUtilities
{
  static class SwingThreadFactory implements ThreadFactory
  {
     @Override
    public Thread newThread(Runnable r)
    {
      swingThread = new Thread(r);
      return swingThread;
    }
  }

  private static ExecutorService exec = Executors.newSingleThreadExecutor(new SwingThreadFactory());
  private static volatile Thread swingThread;

  public static void invokeAndWait(Runnable r) throws InterruptedException, InvocationTargetException
  {
    Future<?> f = exec.submit(r);
    try
    {
      f.get();
    }
    catch(ExecutionException e)
    {
      throw new InvocationTargetException(e);
    }
  }

  public static void invokeLater(Runnable r)
  {
    exec.execute(r);
  }

  public static boolean isEvenDispatchThread()
  {
    return Thread.currentThread() == swingThread;
  }
}
