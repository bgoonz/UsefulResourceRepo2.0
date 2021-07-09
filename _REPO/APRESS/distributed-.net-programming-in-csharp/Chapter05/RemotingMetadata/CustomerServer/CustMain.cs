using System;
using System.Runtime.Remoting;

namespace CustomerServer
{
   class CustomerMain
   {
      static void Main(string[] args)
      {
         Console.WriteLine("Customer Server initializing ...");
         RemotingConfiguration.Configure("CustomerServer.exe.config");

         Console.WriteLine("Waiting for clients. Press 'q' to quit");

         string input;
         do
         {
            input = Console.ReadLine();
         }while(input != "q");
      }
   }
}
