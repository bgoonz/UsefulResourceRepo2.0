package designpatterns.structural;

public class Adapter
{
  //  when you want to use an existing class, and its interface does not match the one you need,
  //  or you want to create a reusable class that cooperates with unrelated classes with incompatible interfaces.
  //  For example: adapt analog signal to digital signal

  interface AnalogSignal
  {
    void makeAnalogSignal();
  }

  interface DigitalSignal
  {
    void makeDigitalSignal();
  }

  static class TheAnalogSignal implements AnalogSignal
  {
    @Override
    public void makeAnalogSignal()
    {
      System.out.println("Analog signal");
    }
  }

  static class TheDigitalSignal implements DigitalSignal
  {
    @Override
    public void makeDigitalSignal()
    {
      System.out.println("Digital signal");
    }
  }

  static class AnalogToDigitalAdapter implements DigitalSignal
  {
    private AnalogSignal analogSignal;
    public AnalogToDigitalAdapter(AnalogSignal analogSignal)
    {
      this.analogSignal = analogSignal;
    }

    @Override
    public void makeDigitalSignal()
    {
      DigitalSignal digitalSignal = convertAnalogToDigital();
      System.out.println("Signal = " + digitalSignal);
    }

    private DigitalSignal convertAnalogToDigital()
    {
      return new TheDigitalSignal();
    }
  }

  public static void main(String[] args)
  {
    TheAnalogSignal analogSignal = new TheAnalogSignal();
    AnalogToDigitalAdapter adapter = new AnalogToDigitalAdapter(analogSignal);
    adapter.makeDigitalSignal();
  }
}
