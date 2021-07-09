using System;

namespace CustomerLibrary
{
   // The CustomerService class stub code
   public class CustomerService : MarshalByRefObject
   {
      // A basic test to make sure remoting settings are working
      public int Test()
      {
         throw new NotSupportedException("Method cannot be run locally");
      }

      // A factory method to return an Customer object
      public Customer CreateCustomer(string name)
      {
         throw new NotSupportedException("Method cannot be run locally");
      }
   }

   // The Customer class stub code
   public class Customer : MarshalByRefObject
   {
      public string SayHello()
      {
         throw new NotSupportedException("Method cannot be run locally");
      }
   }
}
