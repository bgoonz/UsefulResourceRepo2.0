package design.patterns.java.structural;

public class Proxy
{
  //  Proxy and delegator have the same interface.
  //  The proxy can't do the job, but the delegator can

  interface Image
  {
    void displayImage();
  }

  static class RealImage implements Image
  {
    @Override
    public void displayImage()
    {
      System.out.println("Displaying image");
    }
  }

  static class ProxyImage implements Image
  {
    private RealImage realImage;

    public ProxyImage(RealImage realImage)
    {
      this.realImage = realImage;
    }

    @Override
    public void displayImage()
    {
      realImage.displayImage();
    }
  }

  public static void main(String[] args)
  {
    RealImage realImage = new RealImage();
    ProxyImage proxyImage = new ProxyImage(realImage);
    proxyImage.displayImage();
  }
}
