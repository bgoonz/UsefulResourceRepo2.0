using System;
using System.Messaging;
using CustomerLibrary;

namespace XmlReceiver
{
   class XmlReceiverMain
   {
      static void Main(string[] args)
      {
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");
      
         // read the message
         Message msg = mq.Receive();

         // Get the message type from the label
         string[] expectedTypeNames = new String[] {msg.Label};     

         // Set the formatter object for the message
         msg.Formatter = new XmlMessageFormatter(expectedTypeNames);

         // Retrieve the message
         object o = msg.Body;

         // process the message ...
         Console.WriteLine(o.ToString());
      }
   }
}
