using System;
using System.Messaging;
using CustomerLibrary;

namespace Sender
{	
   class SenderMain
   {	
      static void Main(string[] args)
      {        
         // Create the queue instance
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");
         
         Message msg = new Message();
         msg.Label = "Customer Message";

         do
         {
            // Construct Customer and send to queue
            msg.Body = new Customer("Homer", "hsimpson@atomic.com", "5555");     
            mq.Send(msg);
         } while(Console.ReadLine() != "q");
      }
   }
}
