package problems.java.concurrency;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class Preloader
{
    //  Demonstrates how to start future from a Thread
    static class ProductInfo
    {
        String info;
        ProductInfo(String info)
        {
            this.info = info;
        }
    }


    private FutureTask<ProductInfo> futureTask = new FutureTask<>(() -> loadProductInfo());
    private Thread thread = new Thread(futureTask);


    private ProductInfo loadProductInfo() throws InterruptedException
    {
        Thread.sleep(500);
        return new ProductInfo("My product");
    }

    public void start()
    {
        thread.start();
    }

    public ProductInfo get() throws InterruptedException
    {
        try
        {
            return futureTask.get();
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
                throw new IllegalStateException("Checked exception.", t);
            }
        }
    }

    static boolean testsPass() throws InterruptedException
    {
        Preloader preloader = new Preloader();
        preloader.start();
        ProductInfo productInfo = preloader.get();
        boolean check = productInfo.info.equals("My product");
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args) throws InterruptedException
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }
}
