using System;
using System.Runtime.Remoting.Lifetime;
using System.Threading;

namespace MathLibrary
{
   public class Customer : MarshalByRefObject, IDisposable
   {
      string mName;

      public Customer()
      {
         Console.WriteLine("Customer.ctor()");
      }

      public Customer(string name)
      {
         Console.WriteLine("Customer.ctor({0}) on thread {1}", name,
            Thread.CurrentThread.GetHashCode());
         mName = name;
      }

      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello() on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         return "Hello " + mName;
      }

      public override object InitializeLifetimeService()
      {  
         ILease leaseInfo = (ILease)base.InitializeLifetimeService();
         
         // Register a CustomerSponsor object as a sponsor.
         leaseInfo.Register(new CustomerSponsor());

         // Register a DisposingSponsor object
         leaseInfo.Register(new DisposingSponsor(this));
         return leaseInfo;
      }

      // Implements IDisposable.Dispose()
      public void Dispose()
      {
         Console.WriteLine("Customer.Dispose() on thread {0}", 
            Thread.CurrentThread.GetHashCode()
         );
         GC.SuppressFinalize(this);
      }

      // The Finalizer
      ~Customer()
      {
         Console.WriteLine("Customer.Finalize()");
      }
   }

   class CustomerSponsor : ISponsor
   {
      private int mRenewCount = 0;
      
      // Implements ISponsor.Renewal
      public TimeSpan Renewal(ILease leaseInfo)
      {
         if (mRenewCount < 3)
         {      
            mRenewCount++;

            // Just a trace message for testing
            Console.WriteLine("CustomerSponsor.Renewal()");
            return TimeSpan.FromSeconds(5);
         } 
         else 
         {
            Console.WriteLine("CustomerSponsor.Renewal() returning 0 time!");
            return TimeSpan.FromSeconds(0);
         }
      }
   }
}
