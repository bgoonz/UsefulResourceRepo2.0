using System;
using System.Threading;
using System.Runtime.Remoting;
using MathLibrary;
using ClientLibrary;

namespace MathClient
{
   class ClientMain
   {
      static void Main(string[] args)
      {
         Console.WriteLine("Main executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Load the configuration file
         RemotingConfiguration.Configure("MathClient.exe.config");

         // Create the remote object.
         SimpleMath math = new SimpleMath();

         // Create the object used for the client callback
         SimpleMathResult mathResult = new SimpleMathResult();

         // Call async version of Add. Pass the callback delegate.
         math.AsyncAdd(5, 2, 
            new SimpleMath.ClientCallbackDelegate(mathResult.MathCallback));
      
         // Ask user to press enter
         Console.WriteLine("Press enter to end");
         Console.ReadLine();  
      }
   }  
}


