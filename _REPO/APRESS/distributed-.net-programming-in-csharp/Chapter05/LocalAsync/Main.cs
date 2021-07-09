using System;
using MathLibrary;
using System.Threading;

namespace LocalAsync
{	
   class LocalAsyncMain
   {
      delegate int BinaryOperatorDelegate(int n1, int n2);

      static void Main(string[] args)
      {
         // Display the primary thread's ID
         Console.WriteLine("Main executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         SimpleMath math = new SimpleMath();

         // Create the delegate instance
         BinaryOperatorDelegate binOp = new BinaryOperatorDelegate(math.Add);

         // Call SimpleMath.Add(5, 2) asynchronously
         IAsyncResult asyncResult = binOp.BeginInvoke(5, 2, null, null);

         // Do other work ...
         while (!asyncResult.IsCompleted)
         {
            Console.WriteLine("Main thread working ...");
            Thread.Sleep(1000);
         }

         // Get the result from SimpleMath.Add
         int result = binOp.EndInvoke(asyncResult);
         Console.WriteLine("The result is {0}", result);

         Console.ReadLine();
      }
   }
}
