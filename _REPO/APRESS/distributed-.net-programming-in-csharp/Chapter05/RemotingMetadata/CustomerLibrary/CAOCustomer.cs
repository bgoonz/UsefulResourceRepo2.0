using System;

namespace CustomerLibrary
{
   public class CAOCustomer : MarshalByRefObject
   {
      string mName;

      public CAOCustomer(string name)
      {
         Console.WriteLine("Customer.ctor(\"{0}\")", name);
         mName = name;
      }
      public string SayHello()
      {
         Console.WriteLine("Customer.SayHello");
         return "Hello " + mName;
      }
   }
}
