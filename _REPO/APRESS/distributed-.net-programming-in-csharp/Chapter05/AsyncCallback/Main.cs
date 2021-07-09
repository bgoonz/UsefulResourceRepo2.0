using System;
using System.Threading;
using MathLibrary;
using System.Runtime.Remoting.Messaging;

namespace LocalAsyncCallback
{	
   class AsyncCallbackMain
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

         // Call SimpleMath.Add(5, 2) asynchronously and specify callback
         IAsyncResult asyncResult = binOp.BeginInvoke(5, 2, 
            new AsyncCallback(AddCallback), "Async call complete");

         // This will block the main thread. Pressing "Enter" before the 
         // async call completes will end the entire application.
         Console.ReadLine();
      }

      static void AddCallback(IAsyncResult ar)
      {
         // Display the current thread ID
         Console.WriteLine("AddCallback executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Retrieve the informational object and cast it to string
         string msg = (string)ar.AsyncState;
         Console.WriteLine(msg);

         // Cast IAsyncResult to the AsyncResult class
         AsyncResult asyncResult = (AsyncResult)ar;

         // Use AsyncResult.AsyncDelegate property to retrieve delegate
         BinaryOperatorDelegate binOp;
         binOp = (BinaryOperatorDelegate)asyncResult.AsyncDelegate;

         // Call EndInvoke on delegate to get results
         int result = binOp.EndInvoke(ar);
         
         Console.WriteLine("Add result is {0}", result);
      }
   }
}
