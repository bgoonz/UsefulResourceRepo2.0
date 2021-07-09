using System;
using System.Threading;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Lifetime;
using MathLibrary;

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
         ClientCallbackSink callback = new ClientCallbackSink();

         // Call async version of Add. Pass the callback interface.
         math.AsyncAdd(5, 2, callback);
      
         // Ask user to press enter
         Console.WriteLine("Press enter to end");
         Console.ReadLine();  
      }
   }  

   public class ClientCallbackSink : MarshalByRefObject, IMathCallback
   {
      public void OnOperationComplete(int result)
      {
         // Display the current thread ID
         Console.WriteLine("ResultCallback executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         Console.WriteLine("Add result is {0}", result);
         
         // Simulate a long running callback
         Thread.Sleep(5000);
      }
   }
}


