using System;
using System.Threading;

namespace MathLibrary
{
   public class SimpleMath : MarshalByRefObject
   {
      public SimpleMath()
      {
         Console.WriteLine("SimpleMath ctor called");
      }

      public SimpleMath(int n1, int n2)
      { // constructor implementation
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
   }
}
