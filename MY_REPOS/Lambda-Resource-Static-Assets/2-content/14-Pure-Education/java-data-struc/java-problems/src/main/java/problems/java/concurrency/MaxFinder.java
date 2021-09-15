package problems.java.concurrency;

import java.util.Random;
import java.util.concurrent.*;

public class MaxFinder
{
    static class FindMaxTask implements Callable<Integer>
    {
        private int[] data;
        private int start, end;
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
            for(int i = 1; i < end; ++i)
            {
                max = Math.max(max, data[i]);
            }
            return max;
        }

        public static void main(String... args) throws ExecutionException, InterruptedException
        {
            int [] data = new Random().ints(10000, 1, 100000).toArray();
            FindMaxTask findMaxTask1 = new FindMaxTask(data, 0, data.length / 2);
            FindMaxTask findMaxTask2 = new FindMaxTask(data, data.length / 2, data.length);
            try
            {
                ExecutorService exec = Executors.newFixedThreadPool(2);
                Future<Integer> future1 = exec.submit(findMaxTask1);
                Future<Integer> future2 = exec.submit(findMaxTask2);
                System.out.printf("Max value = %d\n", Math.max(future1.get(), future2.get()));
                exec.shutdown();
                exec.awaitTermination(10, TimeUnit.SECONDS);
            }
            catch(Throwable t)
            {
                if(t instanceof RuntimeException || t instanceof Error)
                {
                    throw t;
                }
                else
                {
                    throw new IllegalStateException("Checked exception.", t);
                }
            }
        }
    }
}
