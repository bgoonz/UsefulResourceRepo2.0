using System;
using System.Messaging;
using System.Xml.Serialization;

namespace XmlReceiver
{
   class XmlReceiverMain
   {
      static void Main(string[] args)
      {
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");
         // Create an array of types expected in the message body
         Type[] expectedTypes = new Type[] {typeof(FooBar)};

         // Construct formatter with expected type names
         mq.Formatter = new XmlMessageFormatter(expectedTypes);

         // Receive message
         Message msg = mq.Receive();
         FooBar foo = (FooBar)msg.Body;
         Console.WriteLine(foo.Bar);
      }
   }

   [System.Xml.Serialization.XmlRoot("Customer")]
   public struct FooBar
   {
      [XmlElement("Name")]
      public string Foo; 
      
      [XmlElement("Email")]
      public string Bar;
   }
}
