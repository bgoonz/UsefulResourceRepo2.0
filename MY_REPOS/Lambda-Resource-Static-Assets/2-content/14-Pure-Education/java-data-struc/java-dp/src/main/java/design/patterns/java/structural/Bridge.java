package design.patterns.java.structural;

public class Bridge
{
  //  decouple an abstraction from its implementation so that the two can vary independently
  //  The bridge uses encapsulation, aggregation, and can use inheritance to separate responsibilities into different classes.

  interface TV
  {
    void on();
    void off();
    void changeChannel(int channel);
  }

  static class SonyTV implements TV
  {
    @Override
    public void on()
    {
      System.out.println("Sony is on.");
    }

    @Override
    public void off()
    {
      System.out.println("Sony is off.");
    }

    @Override
    public void changeChannel(int channel)
    {
      System.out.println("Sony TV: channel - " + channel);
    }
  }

  static class ToshibaTV implements TV
  {

    @Override
    public void on()
    {
      System.out.println("Toshiba is on.");
    }

    @Override
    public void off()
    {
      System.out.println("Toshiba is off.");
    }

    @Override
    public void changeChannel(int channel)
    {
      System.out.println("Toshiba: channel - " + channel);
    }
  }

  static abstract class AbstractRemoteControl
  {
    private TV tv;

    public AbstractRemoteControl(TV tv)
    {
      this.tv = tv;
    }

    public void turnOn()
    {
      tv.on();
    }

    public void turnOff()
    {
      tv.off();
    }

    public void changeChannel(int channel)
    {
      tv.changeChannel(channel);
    }
  }

  static class LogitechRemoteControl extends AbstractRemoteControl
  {
    public LogitechRemoteControl(TV tv)
    {
      super(tv);
    }
  }

  public static void main(String[] args)
  {
    TV tv = new SonyTV();
    LogitechRemoteControl lrc = new LogitechRemoteControl(tv);
    lrc.turnOn();
    lrc.changeChannel(5);
    lrc.turnOff();

    tv = new ToshibaTV();
    lrc = new LogitechRemoteControl(tv);
    lrc.turnOn();
    lrc.changeChannel(5);
    lrc.turnOff();

  }
}
