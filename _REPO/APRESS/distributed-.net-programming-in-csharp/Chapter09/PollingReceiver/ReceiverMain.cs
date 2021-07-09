using System;
using System.Messaging;
using System.Threading;


namespace PollingReceiver
{
   class ReceiverMain
   {
      static void Main(string[] args)
      {
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");

         string[] expectedTypeNames;
         expectedTypeNames = new String[] {"System.String", "System.Single"};

         // Construct formatter with expected type names
         mq.Formatter = new XmlMessageFormatter(expectedTypeNames);

         // Establish the timer
         Timer tm = new Timer(new TimerCallback(OnTimer), mq, 5000, 5000);

         // Simulate doing other work
         while (true)
         {
            Console.WriteLine("Doing other work on thread {0}", 
               Thread.CurrentThread.GetHashCode());
            Thread.Sleep(1000);
         }
      }

      static void OnTimer(object state)
      {
         // Show current thread id
         Console.WriteLine("Checking queue for messages on thread {0}",
            Thread.CurrentThread.GetHashCode());

         // Time to check the queue, first get the queue from the state param
         MessageQueue mq = (MessageQueue)state;

         // Read queue, but only block for 1 second
         try
         {
            Message msg = mq.Receive(TimeSpan.FromSeconds(1));
            Console.WriteLine(msg.Body.ToString());
         }
         catch 
         {
            // No Messages, timeout occurred
            Console.WriteLine("No new messages");
         }
      }
   }
}
