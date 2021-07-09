using System;
using System.Messaging;
using CustomerLibrary;

namespace BinaryReceiver
{
   class BinaryReceiverMain
   {
      static void Main(string[] args)
      {
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");

         // Construct formatter with expected type names
         mq.Formatter = new BinaryMessageFormatter();

         // Receive message and 
         Message msg = mq.Receive();

         // Deserialized body into customer object
         Customer cust = (Customer)msg.Body;
         
         // Use the object
         Console.WriteLine(cust.Email); 
      }
   }
}
