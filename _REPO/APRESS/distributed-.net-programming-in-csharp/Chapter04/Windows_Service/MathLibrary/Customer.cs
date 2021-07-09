using System;

namespace MathLibrary
{
   public class Customer : MarshalByRefObject
   {
      string mName;

      public Customer()
      {
         Console.WriteLine("Customer.ctor()");
      }

      public Customer(string name)
      {
         Console.WriteLine("Customer.ctor({0})", name);
         mName = name;
      }

      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello()");
         return "Hello " + mName;
      }
   }
}
