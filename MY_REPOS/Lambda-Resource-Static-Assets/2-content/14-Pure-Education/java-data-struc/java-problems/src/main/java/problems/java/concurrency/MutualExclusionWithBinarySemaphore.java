package problems.java.concurrency;

import java.util.concurrent.Semaphore;

public class MutualExclusionWithBinarySemaphore
{
    private Semaphore binSemaphore = new Semaphore(1);
    private int value;
    private boolean isEven = true;

    private void mutualExclusion()
    {
        while(true)
        {
            try
            {
                binSemaphore.acquire();
                System.out.printf("%s: %d\n", isEven ? "Even = " : "Odd = ", value);
                isEven = !isEven;
                value++;
            }
            catch(InterruptedException e)
            {
                throw new IllegalStateException("Unexpected interrupt", e);
            }
            finally
            {
                binSemaphore.release();
            }
        }
    }

    public static void main(String... args)
    {
        MutualExclusionWithBinarySemaphore evenOddWithBinarySemaphore = new MutualExclusionWithBinarySemaphore();
        new Thread(() -> evenOddWithBinarySemaphore.mutualExclusion()).start();
        new Thread(() -> evenOddWithBinarySemaphore.mutualExclusion()).start();
    }
}
