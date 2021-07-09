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

         // Create the delegate
         BinaryOperatorDelegate binOp;
         binOp = new BinaryOperatorDelegate(math.Add);
      
         // Call SimpleMath.Add(5, 2) remotely and asynchronously
         IAsyncResult ar = binOp.BeginInvoke(5, 2, null, null);

         // Do other work while waiting for Add to complete ...
         while (!ar.IsCompleted)
         {
            Console.WriteLine("Client main thread working ...");
            Thread.Sleep(1000);
         }

         // Get the result from SimpleMath.Add
         int result = binOp.EndInvoke(ar);
         Console.WriteLine("The result is {0}", result);
      
         // Ask user to press enter
         Console.Write("Press enter to end");
         Console.ReadLine();  
      }
   }
}
