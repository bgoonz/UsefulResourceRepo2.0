package problems.java.concurrency;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;

public class BlockingQueues
{
    static void takeAndOfferNext(BlockingQueue<Integer> takeFrom, BlockingQueue<Integer> offerTo)
    {
        while(true)
        {
            try
            {
                int i = takeFrom.take();
                System.out.println(i);
                offerTo.offer(i + 1);
            }
            catch (InterruptedException e)
            {
                throw new IllegalStateException("Unexpected exception", e);
            }
        }
    }

    public static void main(String... args)
    {
        BlockingQueue<Integer> evens = new LinkedBlockingDeque<>();
        BlockingQueue<Integer> odds = new LinkedBlockingDeque<>();
        ExecutorService exec = Executors.newFixedThreadPool(2);
        exec.submit(() -> takeAndOfferNext(evens, odds));
        exec.submit(() -> takeAndOfferNext(odds, evens));
        evens.offer(0);
    }
}
