package concurrency;

import java.util.Random;
import java.util.concurrent.*;

import static concurrency.Common.launderThrowable;

public class MultiThreadMaxFinder
{
  static class FindMaxTask implements Callable<Integer>
  {
    private int[] data;
    private int start;
    private int end;

    FindMaxTask(int[] data, int start, int end)
    {
      this.data = data;
      this.start = start;
      this.end = end;
    }

    @Override
    public Integer call() throws Exception
    {
      int max = data[start];
      for(int i = start + 1; i < end; ++i)
      {
        max = Math.max(max, data[i]);
      }
      return max;
    }
  }

  public static void main(String[] args) throws InterruptedException
  {
    int[] data = new Random().ints(100000, 1, 1000).toArray();

    FindMaxTask task1 = new FindMaxTask(data, 0, data.length / 2);
    FindMaxTask task2 = new FindMaxTask(data, data.length / 2, data.length);

    try
    {
      ExecutorService exec = Executors.newFixedThreadPool(2);
      Future<Integer> future1 = exec.submit(task1);
      Future<Integer> future2 = exec.submit(task2);
      System.out.printf("Max Value = %d\n", Math.max(future1.get(), future2.get()));
      exec.shutdown();
      exec.awaitTermination(10, TimeUnit.SECONDS);
    }
    catch (ExecutionException e)
    {
      throw launderThrowable(e.getCause());
    }
  }
}
