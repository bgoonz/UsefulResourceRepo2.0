using System;
using System.Messaging;

namespace Receiver
{
	class ReceiverMain
	{
		static void Main(string[] args)
		{
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");

         // Create an array of types expected in the message body
         Type[] expectedTypes = new Type[] {typeof(string), typeof(float)};

         // Construct formatter with expected types
         mq.Formatter = new XmlMessageFormatter(expectedTypes);

         // Loop forever reading messages from the queue
         while (true)
         {
            Message msg = mq.Receive(); // <-- blocks until message arrives
            Console.WriteLine(msg.Body.ToString());
         }

		}
	}
}
