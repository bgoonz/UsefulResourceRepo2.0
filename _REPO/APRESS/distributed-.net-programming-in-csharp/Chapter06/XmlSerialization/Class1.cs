using System;
using System.Xml.Serialization;
using System.Collections;
using System.IO;

namespace XmlTest
{
   class XmlMain
   {
      static void Main(string[] args)
      {     
         // Create the customer and set the first name and id
         Customer cust = new Customer();
         cust.FirstName = "Homer";
         cust.ID = 4;

         // Initialize XML Serializer to serialize a customer type
         XmlSerializer xs = new XmlSerializer(typeof(Customer));

         // Serialize customer to file
         Stream s = File.OpenWrite("Customer.xml");      
         xs.Serialize(s, cust); 
         s.Close();     
      }
   }

   [XmlRoot("MyCustomRoot")]
   public class Customer
   {
      private string mFirstName;
      private int mID;

      [XmlElement("MyCustomElement")]
      public string FirstName 
      {
         get{ return mFirstName;}
         set{ mFirstName = value;}
      }

      [XmlAttribute()]
      public int ID
      {
         get{ return mID; }
         set{ mID = value;}
      }
   }
}
