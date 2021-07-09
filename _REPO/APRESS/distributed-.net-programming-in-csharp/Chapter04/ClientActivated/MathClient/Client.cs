using System;
using System.Runtime.Remoting;
using MathLibrary;

namespace MathClient
{
   class ClientMain
   {
      static void Main(string[] args)
      {
         // Load the configuration file
         RemotingConfiguration.Configure("MathClient.exe.config");

         Customer cust = new Customer("Homer");

         Console.WriteLine(cust.SayHello());
         Console.ReadLine();
      }
   }
}
