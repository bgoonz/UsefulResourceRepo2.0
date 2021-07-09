using System;

namespace CustomerLibrary
{
   // The ICustomerService interface
   public interface ICustomerService
   {
      // A basic test to make sure remoting settings are working
      int Test();

      // A factory method to return an ICustomer object
      ICustomer CreateCustomer(string name);    
   }

   // The ICustomer interface
   public interface ICustomer
   {
      string SayHello();
   }
}
