using System;
using System.Runtime.Remoting;
using CustomerLibrary;

namespace CustomerClient
{
   class CustomerMain
   {
      static void Main(string[] args)
      {
         RemotingConfiguration.Configure("CustomerClient.exe.config");
         
         // Build a proxy to the CustomerService object
         ICustomerService custSvc;
         custSvc = (ICustomerService)Activator.GetObject(
                      typeof(ICustomerService),
                      "http://localhost:13101/customer.soap"
                   );

         // Call ICustomerService.Test to confirm remoting settings
         Console.WriteLine(custSvc.Test());

         // Get a proxy to a remote Customer object
         ICustomer cust = custSvc.CreateCustomer("Homer");
         Console.WriteLine(cust.SayHello());

         Console.ReadLine();
      }
   }
}
