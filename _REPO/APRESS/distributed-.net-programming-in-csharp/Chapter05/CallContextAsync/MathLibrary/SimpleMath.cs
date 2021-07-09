using System;
using System.Runtime.Remoting.Messaging; // Call context stuff
using System.Threading;

namespace MathLibrary
{

   public interface ISimpleMath
   {
      int Add(int n1, int n2);
      int Subtract(int n1, int n2);
   }

   public class SimpleMath : MarshalByRefObject, ISimpleMath
   {
      public SimpleMath()
      {
         Console.WriteLine("SimpleMath ctor called");
      }

      public int Add(int n1, int n2)
      {
         // Display the current thread ID
         Console.WriteLine("SimpleMath.Add executing on thread {0}", 
            Thread.CurrentThread.GetHashCode());

         // Get call context
         CallContextData ctxData = (CallContextData)CallContext.GetData("token");
         string token = (string)ctxData.Data;

         //Validate security token
         Console.WriteLine("Call context data: {0}", token);

         // Set some context data for return
         ctxData = new CallContextData("Hello from server");
         CallContext.SetData("message", ctxData);

         return n1 + n2;
      }

         public int Subtract(int n1, int n2)
         {
            // Get call context
            CallContextData ctxData = (CallContextData)CallContext.GetData("token");
            string token = (string)ctxData.Data;

            //Validate security token
            Console.WriteLine("Call context data: {0}", token);

            return n1 - n2;
         }
      }
}
