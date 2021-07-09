using System;

namespace CustomerLibrary
{
   public class Customer
   {
      public string Name;         // Public field
      private string mCreditCard; // Private field
      
      private string mEmail;  // Private field with public property
      public string Email
      { 
         get {return mEmail;}
         set {mEmail = value;}
      }

      public Customer(string name, string email, string ccNum)
      { 
         Name = name; mEmail = email; mCreditCard = ccNum;
      }  
      
      // Required for serialization    
      public Customer(){}
   }
}
