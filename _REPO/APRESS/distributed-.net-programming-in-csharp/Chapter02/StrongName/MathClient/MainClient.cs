using System;
using MathLibrary;

namespace MathClient
{  
   class MathClient
   {
      static void Main(string[] args)
      {
         Console.WriteLine(" 5 + 3 = {0}", MathLibrary.SimpleMath.Add(5,3));

         Console.WriteLine(" 5 - 3 = {0}", 
            MathLibrary.SimpleMath.Subtract(5,3));

         Console.ReadLine();
      }
   }
}
