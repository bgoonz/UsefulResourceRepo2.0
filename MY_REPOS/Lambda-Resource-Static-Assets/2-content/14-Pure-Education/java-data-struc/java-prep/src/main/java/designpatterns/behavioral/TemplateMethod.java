package designpatterns.behavioral;

public class TemplateMethod
{
  //  Defines the workflow for achieving a specific operation.
  //  Allows the subclasses to modify certain steps without changing the workflow's structure.

  static abstract class Vehicle
  {
    protected boolean status;

    protected abstract void start();
    protected abstract void run();
    protected abstract void stop();

    public static void testVehicle(Vehicle v)
    {
      v.start();
      if(v.status)
      {
        v.run();
        v.stop();
      }
    }
  }

  static class Car extends Vehicle
  {

    @Override
    protected void start()
    {
      status = true;
    }

    @Override
    protected void run()
    {
      System.out.println("Run fast");
    }

    @Override
    protected void stop()
    {
      System.out.println("Car stop");
    }
  }

  static class Truck extends Vehicle
  {

    @Override
    protected void start()
    {
      status = true;
    }

    @Override
    protected void run()
    {
      System.out.println("Run slowly");
    }

    @Override
    protected void stop()
    {
      System.out.println("Truck stop");
    }
  }

  public static void main(String[] args)
  {
    Car car = new Car();
    Vehicle.testVehicle(car);

    Truck truck = new Truck();
    Vehicle.testVehicle(truck);
  }
}
