package concurrency;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

import static concurrency.Common.launderThrowable;

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

  static class DataLoadException extends Exception {}

  private ProductInfo loadProductInfo() throws InterruptedException, DataLoadException
  {
    Thread.sleep(500);
    throw new DataLoadException();
  }

  //  This must be FutureTask, not Future to pass into thread constructor
  private final FutureTask<ProductInfo> future = new FutureTask<>(() -> loadProductInfo());
  private final Thread thread = new Thread(future);

  public void start()
  {
    thread.start();
  }

  public ProductInfo get() throws InterruptedException
  {
    try
    {
      return future.get();
    }
    catch (ExecutionException e)
    {
      throw launderThrowable(e.getCause());
    }
  }

  public static void main(String[] args) throws InterruptedException
  {
    Preloader preloader = new Preloader();
    preloader.start();
    ProductInfo productInfo = preloader.get();
  }
}
