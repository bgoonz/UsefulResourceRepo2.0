using System;
using System.Runtime.Remoting.Lifetime;

namespace CustomerLibrary
{
   public class CAOCustomer : MarshalByRefObject
   {
      string mName;
      public CAOCustomer(string name)
      {
         Console.WriteLine("Customer.ctor(\"{0}\")", name);
         mName = name;
      }
      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello");
         ILease lease = (ILease) this.GetLifetimeService();
         Diagnostics.ShowLeaseInfo(lease);

         return "Hello " + mName;
      }

      public override object InitializeLifetimeService()
      {
         ILease lease = (ILease)base.InitializeLifetimeService();
         Diagnostics.ShowLeaseInfo(lease);
         return lease;
      }
   }
}
