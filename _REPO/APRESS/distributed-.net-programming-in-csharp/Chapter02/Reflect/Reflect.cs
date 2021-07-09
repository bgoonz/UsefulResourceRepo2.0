using System;
using MathLibrary;
using System.Reflection;

namespace MathClient
{  
   public class MathClient
   {
      static void Main(string[] args)
      {
         
         // The many ways of getting a Type object ...
         Type t;

         // Use the static Type.GetType method.
         // String format: "<namespace>.<classname>, <assemblyname>"
         t = Type.GetType("MathLibrary.SimpleMath, MathLibrary");

         // Use the GetType method inherited from Object.
         SimpleMath math = new SimpleMath();
         t = math.GetType();
      
         // Use the typeof operator
         t = typeof(SimpleMath);

         foreach (MethodInfo mi in t.GetMethods())
         {
            Console.WriteLine(mi.ToString());
         }

         Console.ReadLine();
      }
   }
}
