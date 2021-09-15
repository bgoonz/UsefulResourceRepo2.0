package designpatterns.structural;

public class Facade
{
  //  hides complexity of a task and provides a simpler interface.
  //  For example, hide the complexity of the computer

  static class CPU
  {
    void process() {}
  }

  static class Memory
  {
    void load() {}
  }

  static class HardDisk
  {
    void read() {}
  }

  static class Computer
  {
    private CPU cpu = new CPU();
    private Memory memory = new Memory();
    private HardDisk hardDisk = new HardDisk();

    public void run()
    {
      cpu.process();
      memory.load();
      hardDisk.read();
    }
  }

  public static void main(String[] args)
  {
    Computer computer = new Computer();
    computer.run();
  }
}
