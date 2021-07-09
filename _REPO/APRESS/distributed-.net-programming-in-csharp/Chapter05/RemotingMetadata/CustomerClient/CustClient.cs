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
         
         // Create a proxy to the remote CustomerService object
         CustomerService custSvc = new CustomerService();

         // Execute the simple Test method
         Console.WriteLine(custSvc.Test());

         // Get a proxy to a remote Customer object
         Customer cust = custSvc.CreateCustomer("Homer");
         Console.WriteLine(cust.SayHello());

         // Get a proxy to the remote CAO Customer object
         CAOCustomer caoCust = new CAOCustomer("Marge");
         Console.WriteLine(caoCust.SayHello());

         Console.ReadLine();
      }
   }
}
