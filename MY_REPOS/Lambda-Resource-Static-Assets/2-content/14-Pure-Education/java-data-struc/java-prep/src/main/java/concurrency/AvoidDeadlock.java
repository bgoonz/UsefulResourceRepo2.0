package concurrency;

public class AvoidDeadlock
{
  static class Account
  {
    public void credit(double amount) {}
    public void debit(double amount) {}
    public Double getBalance() { return  0.0; }
  }

  static class InsufficientFundsException extends Exception{}

  private static Object tieLock = new Object();

  //  Use lock ordering to avoid deadlocks
  public void transferMoney(final Account fromAccount, final Account toAccount, double amount) throws InsufficientFundsException
  {
    class Helper
    {
      public void transfer() throws InsufficientFundsException
      {
        if(fromAccount.getBalance().compareTo(amount) < 0)
        {
          throw new InsufficientFundsException();
        }
        else
        {
          fromAccount.debit(amount);
          toAccount.credit(amount);
        }
      }
    }

    int fromHash = System.identityHashCode(fromAccount);
    int toHash = System.identityHashCode(toAccount);
    if(fromHash < toHash)
    {
      synchronized (fromAccount)
      {
        synchronized (toAccount)
        {
          new Helper().transfer();
        }
      }
    }
    else if(toHash < fromHash)
    {
      synchronized (toAccount)
      {
        synchronized (fromAccount)
        {
          new Helper().transfer();
        }
      }
    }
    else
    {
      synchronized (tieLock)
      {
        synchronized (fromAccount)
        {
          synchronized (toAccount)
          {
            new Helper().transfer();
          }
        }
      }
    }
  }
}
