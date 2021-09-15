package designpatterns.structural;

public class Decorator
{
  //  Used to modify functionality of an object at runtime
  //  For example, we may define a heirarchy for a SportsCar and a LuxuryCar
  //  However, sometimes we may need to create a Luxury Sports Car

  interface Car
  {
    void assemble();
  }

  static class BasicCar implements Car
  {
    @Override
    public void assemble()
    {
      System.out.println("Basic car.");
    }
  }

  static class CarDecorator implements Car
  {
    private Car car;

    public CarDecorator(Car car)
    {
      this.car = car;
    }

    @Override
    public void assemble()
    {
      car.assemble();
    }
  }

  static class SportsCar extends CarDecorator
  {
    public SportsCar(Car car)
    {
      super(car);
    }

    @Override
    public void assemble()
    {
      super.assemble();
      System.out.println("Adding features of a Sports Car");
    }
  }

  static class LuxuryCar extends CarDecorator
  {
    public LuxuryCar(Car car)
    {
      super(car);
    }

    @Override
    public void assemble()
    {
      super.assemble();
      System.out.println("Adding features of a Luxury Car");
    }
  }

  public static void main(String[] args)
  {
    Car sportsCar = new SportsCar(new BasicCar());
    sportsCar.assemble();

    Car luxuryCar = new LuxuryCar(new BasicCar());
    luxuryCar.assemble();

    Car luxurySportsCar = new LuxuryCar(new SportsCar(new BasicCar()));
    luxurySportsCar.assemble();
  }
}
