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

         // Create the object. Will be activated in the server domain
         SimpleMath math = new SimpleMath();

         // Use the remote object
         Console.WriteLine("5 + 2 = {0}", math.Add(5,2));
         Console.WriteLine("5 - 2 = {0}", math.Subtract(5,2));

         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();
        
      }
   }
}
