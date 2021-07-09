using System;
using System.Messaging;
using CustomerLibrary;
using System.Runtime.Serialization.Formatters;

namespace Sender
{	
class BinarySenderMain
{	
   static void Main(string[] args)
   {        
      // Create the queue instance
      MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");
      
      Message msg = new Message();
      msg.Label = "A Customer object";
      msg.Formatter = new BinaryMessageFormatter();

      do
      {
         // Construct Customer and send to queue
         msg.Body = new Customer("Homer", "hsimpson@atomic.com", "333-33-3333");     
         mq.Send(msg);
      } while(Console.ReadLine() != "q");
   }
}
}
