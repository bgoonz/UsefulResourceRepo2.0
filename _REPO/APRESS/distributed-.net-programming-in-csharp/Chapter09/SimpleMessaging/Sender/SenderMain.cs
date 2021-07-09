using System;
using System.Messaging;

namespace Sender
{
	class SenderMain
	{
      static void Main(string[] args)
      {
         // Create the queue instance
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");

         Message msg = new Message();
         msg.Label = "A message label";
         msg.Body = "The message body";

         // This message waits on the queue for a max of 20 seconds.
         msg.TimeToBeReceived = TimeSpan.FromSeconds(20);

         // If the message times out, delete it from destination queue and
         // add and entry to the dead letter queue.
         msg.UseDeadLetterQueue = true;

         // Send the message to the queue
         mq.Send(msg);
      }
	}
}
