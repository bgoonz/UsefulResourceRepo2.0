package designpatterns.behavioral;

public class CommandDP
{
  // takes an operation and its arguments and wraps them up in an object to be executed, logged, etc.
  static class Computer
  {
    public void shutDown()
    {
      System.out.println("computer is shut down");
    }

    public void restart()
    {
      System.out.println("computer is restarted");
    }
  }

  interface Command
  {
    void execute();
  }

  static class ShutdownCommand implements Command
  {
    private Computer computer;

    public ShutdownCommand(Computer computer)
    {
      this.computer = computer;
    }

    @Override
    public void execute()
    {
      computer.shutDown();
    }
  }

  static class RestartCommand implements Command
  {
    private Computer computer;

    public RestartCommand(Computer computer)
    {
      this.computer = computer;
    }

    @Override
    public void execute()
    {
      computer.restart();
    }
  }

  public static void main(String[] args)
  {
    Computer computer = new Computer();
    Command shutdownCommand = new ShutdownCommand(computer);
    Command restartCommand = new RestartCommand(computer);

    shutdownCommand.execute();
    restartCommand.execute();
  }
}
