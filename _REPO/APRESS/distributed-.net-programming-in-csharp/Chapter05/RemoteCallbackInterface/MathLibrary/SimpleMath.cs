using System;
using System.Threading;
using System.Runtime.Remoting.Messaging;

namespace MathLibrary
{
   // The callback interface. A Client implements this to allow the 
   // server to notify it when the operation is complete.
   public interface IMathCallback
   {
      [OneWay()]
      void OnOperationComplete(int result);
   }

   public class SimpleMath : MarshalByRefObject
   {

      // This delegate is used on the server to call the Add and
      // Subtract methods asynchronously.
      private delegate int BinaryOperatorDelegate(int n1, int n2);

      
      public SimpleMath()
      {
         Console.WriteLine("SimpleMath ctor called");
      }

      public int Add(int n1, int n2)
      {
         // Display the current thread id
         Console.WriteLine("SimpleMath.Add() executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Waste some time
         Thread.Sleep(5000);

         return n1 + n2;
      }

      public int Subtract(int n1, int n2)
      {
         // Display the current thread id
         Console.WriteLine("SimpleMath.Subtract() executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Waste some time
         Thread.Sleep(5000);

         return n1 - n2;
      }

      public void AsyncAdd(int n1, int n2, IMathCallback callback)
      {
         // Display the current thread id
         Console.WriteLine("SimpleMath.AsyncAdd() executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Create the delegate to execute Add asynchronously
         BinaryOperatorDelegate binOp;
         binOp = new BinaryOperatorDelegate(Add);
         
         // Call Add(n1, n2) async. Also pass server callback, 
         // and client callback
         binOp.BeginInvoke(n1, n2, new AsyncCallback(DoClientCallback), callback);
      }

      private void DoClientCallback(IAsyncResult ar)
      {
         // Display the current thread ID
         Console.WriteLine("DoClientCallback executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Cast IAsyncResult to the AsyncResult class
         AsyncResult asyncResult = (AsyncResult)ar;

         // Use AsyncResult.AsyncDelegate property to retrieve delegate
         BinaryOperatorDelegate binOp;
         binOp = (BinaryOperatorDelegate)asyncResult.AsyncDelegate;

         // Call EndInvoke on delegate to get results
         int result = binOp.EndInvoke(ar);

         // Retrieve the client callback from the AsyncState property
         IMathCallback callback = (IMathCallback)ar.AsyncState;

         Console.WriteLine("Starting client callback ...");
         callback.OnOperationComplete(result);
         Console.WriteLine("Ending client callback ...");
      }
   }

   
}
