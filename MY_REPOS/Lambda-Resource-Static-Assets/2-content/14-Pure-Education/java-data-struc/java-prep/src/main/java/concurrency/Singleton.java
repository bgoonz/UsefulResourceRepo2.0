package concurrency;

public class Singleton
{
  static class Resource
  {
  }

  private static class Holder
  {
    public static Resource resource = new Resource();
  }

  public static Resource getResource()
  {
    return Holder.resource;
  }
}
