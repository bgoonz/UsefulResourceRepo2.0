package problems.java.concurrency;

public class ComputeWith2Threads
{
    static class Add extends Thread
    {
        int value;
        public void run()
        {
            value = 2 + 8;
        }
    }

    static class Multiply extends Thread
    {
        int value;
        public void run()
        {
            value = 4 * 5;
        }
    }

    public static void main(String... args) throws InterruptedException
    {
        Add t1 = new Add();
        Multiply t2 = new Multiply();
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        int value = t2.value / t1.value;
        System.out.println(value);
    }
}
