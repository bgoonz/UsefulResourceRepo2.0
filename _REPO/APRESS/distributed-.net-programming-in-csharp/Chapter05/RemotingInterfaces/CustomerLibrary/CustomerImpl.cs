using System;
using System.Runtime.Remoting.Lifetime;

namespace CustomerLibrary
{
   public class CustomerService : MarshalByRefObject, ICustomerService
   {
	   public int Test()
      {
         Console.WriteLine("CustomerService.Test()");
         return 5;
      }
      public ICustomer CreateCustomer(string name)
      {
         Console.WriteLine("CustomerService.CreateCustomer(\"{0}\")", name);
         ICustomer cust = (ICustomer)new Customer(name);
         return cust;
      } 
   }

   public class Customer : MarshalByRefObject, ICustomer
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
