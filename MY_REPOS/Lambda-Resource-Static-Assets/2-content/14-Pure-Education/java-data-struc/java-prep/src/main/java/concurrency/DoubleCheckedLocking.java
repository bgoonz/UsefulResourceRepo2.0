package concurrency;

public class DoubleCheckedLocking
{
  static class Resource
  {
  }

  private static Resource resource;

  public static Resource getInstance()
  {
    if(resource == null)
    {
      synchronized (DoubleCheckedLocking.class)
      {
        if(resource == null)
        {
          resource = new Resource();
        }
      }
    }
    return resource;
  }
}
