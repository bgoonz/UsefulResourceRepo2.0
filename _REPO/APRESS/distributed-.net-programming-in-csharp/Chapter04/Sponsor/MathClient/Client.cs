using System;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Lifetime;
using MathLibrary;

namespace MathClient
{
   class ClientMain
   {
      static void Main(string[] args)
      {
         // Load the configuration file
         RemotingConfiguration.Configure("MathClient.exe.config");

         Customer cust = new Customer("Homer Simpson");

         
         // Register the client side sponsor
         ILease leaseInfo = (ILease)cust.GetLifetimeService();
         leaseInfo.Register(new CustomerClientSponsor());

         // Loop until user enters "q" to quit
         Console.WriteLine("Enter 'q' to quit: ");       
         do
         {
            Console.WriteLine("Server returns: {0}", cust.SayHello());
         }while (Console.ReadLine() != "q");
      }
   }

   
}
