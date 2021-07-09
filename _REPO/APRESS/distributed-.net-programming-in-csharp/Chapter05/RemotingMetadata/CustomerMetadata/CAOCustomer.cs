using System;

namespace CustomerLibrary
{
   // The "dummy" CAOCustomer implementation
   public class CAOCustomer : MarshalByRefObject
   {
      public CAOCustomer(string name)
      {
         throw new NotSupportedException("Method cannot be run locally");
      }
      public string SayHello()
      {
         throw new NotSupportedException("Method cannot be run locally");
      }
   }
}
