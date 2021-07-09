using System;
using System.Threading;
using System.Runtime.Remoting;
using MathLibrary;

namespace MathClient
{
   class ClientMain
   {
      delegate int BinaryOperatorDelegate(int n1, int n2);

      static void Main(string[] args)
      {
         // Load the configuration file
         RemotingConfiguration.Configure("MathClient.exe.config");

         // Create the remote object.
         SimpleMath math = new SimpleMath();
         
         // Call the OneWay WriteToConsole method
         Console.WriteLine("Calling the OneWay method ...");
         math.WriteToConsole("Hello server!");

         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();  
      }
   }
}
