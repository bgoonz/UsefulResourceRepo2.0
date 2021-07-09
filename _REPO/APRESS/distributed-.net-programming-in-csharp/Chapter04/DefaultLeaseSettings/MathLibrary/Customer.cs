using System;
using System.Runtime.Remoting.Lifetime;


namespace MathLibrary
{
   public class Customer : MarshalByRefObject
   {
      string mName;

      public Customer()
      {
         Console.WriteLine("Customer.ctor()");
      }

      public Customer(string name)
      {
         Console.WriteLine("Customer.ctor({0})", name);
         mName = name;
      }

      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello()");

         // Show the lease information for this object
         Diagnostics.ShowLeaseInfo((ILease)this.GetLifetimeService());

         return "Hello " + mName;
      }
   }

}
