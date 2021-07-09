using System;
using System.Runtime.Remoting.Lifetime;
using System.Runtime.Remoting;

namespace CustomerLibrary
{
   public class CustomerService : MarshalByRefObject
   {
	   public int Test()
      {
         Console.WriteLine("CustomerService.Test()");
         return 5;
      }
      public Customer CreateCustomer(string name)
      {
         Console.WriteLine("CustomerService.CreateCustomer(\"{0}\")", name);
         return new Customer(name);
      }
   }

   public class Customer : MarshalByRefObject
   {
      string mName;

      public Customer(string name)
      {
         Console.WriteLine("Customer.ctor(\"{0}\")", name);
         mName = name;
      }

      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello"); 
         return "Hello " + mName;
      }
   }
} // Namespace CustomerLibrary
