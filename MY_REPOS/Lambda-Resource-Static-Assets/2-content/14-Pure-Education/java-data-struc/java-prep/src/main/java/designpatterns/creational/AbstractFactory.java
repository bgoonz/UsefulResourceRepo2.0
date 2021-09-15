package designpatterns.creational;

public class AbstractFactory
{
  //  We want to build two types of computers: AMD and Intel.
  //  We want to make sure to use appropriate parts for each

  interface CPU
  {
    void process();
  }

  static class AmdCpu implements CPU
  {
    @Override
    public void process()
    {
      System.out.println("AMD CPU processing");
    }
  }

  static class IntelCpu implements CPU
  {
    @Override
    public void process()
    {
      System.out.println("Intel CPU processing");
    }
  }

  interface Motherboard
  {
    void process();
  }

  static class AmdMotherboard implements Motherboard
  {
    @Override
    public void process()
    {
      System.out.println("AMD Motherboard");
    }
  }

  static class IntelMotherboard implements Motherboard
  {
    @Override
    public void process()
    {
      System.out.println("Intel Motherboard");
    }
  }


  interface ComponentFactory
  {
    CPU produceCPU();
    Motherboard produceMotherboard();
  }

  static class AmdComponentFactory implements ComponentFactory
  {
    @Override
    public CPU produceCPU()
    {
      return new AmdCpu();
    }

    @Override
    public Motherboard produceMotherboard()
    {
      return new AmdMotherboard();
    }
  }

  static class IntelComponentFactory implements ComponentFactory
  {
    @Override
    public CPU produceCPU()
    {
      return new IntelCpu();
    }

    @Override
    public Motherboard produceMotherboard()
    {
      return new IntelMotherboard();
    }
  }

  static class Computer
  {
    private CPU cpu;
    private Motherboard motherboard;

    public Computer(ComponentFactory factory)
    {
      cpu = factory.produceCPU();
      motherboard = factory.produceMotherboard();
    }

    public void process()
    {
      cpu.process();
      motherboard.process();
    }
  }


  public static void main(String[] args)
  {
    System.out.println("Creating AMD Computer");
    Computer amdComputer = new Computer(new AmdComponentFactory());
    amdComputer.process();

    System.out.println("Creating Intel Computer");
    Computer intelComputer = new Computer(new IntelComponentFactory());
    intelComputer.process();
  }
}
