using System;
using System.Threading;

namespace ClientLibrary
{
   public class SimpleMathResult : MarshalByRefObject
   {
      public void MathCallback(int result)
      {
         // Display the current thread ID
         Console.WriteLine("MathCallback executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         Console.WriteLine("Add result is {0}", result);

         // Simulate a long running callback
         Thread.Sleep(5000);
      }
   }
}
