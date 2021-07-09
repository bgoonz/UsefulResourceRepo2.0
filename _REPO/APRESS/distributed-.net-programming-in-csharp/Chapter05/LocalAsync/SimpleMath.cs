using System;
using System.Threading;

// In SimpleMath.cs
namespace MathLibrary
{
public class SimpleMath
{
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

