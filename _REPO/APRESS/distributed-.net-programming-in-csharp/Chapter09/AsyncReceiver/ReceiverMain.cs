using System;
using System.Messaging;
using System.Runtime.Remoting.Messaging;

namespace AsyncReceiver
{
   class ReceiverMain
   {
      static void Main(string[] args)
      {
         // Open queue
         MessageQueue mq = new MessageQueue(@".\private$\MyPrivateQ");

         // Create an array of types expected in the message body
         Type[] expectedTypes = new Type[] {typeof(string), typeof(float)};

         string[] expectedTypeNames;
         expectedTypeNames = new String[] {"System.String", "System.Single"};

         // Construct formatter with expected type names
         mq.Formatter = new XmlMessageFormatter(expectedTypeNames);

         IAsyncResult ar = mq.BeginReceive(
            TimeSpan.FromSeconds(5),      // Timeout value
            mq,                           // State object, the message queue
            new AsyncCallback(OnMessageArrival) // Callback
         );

         // The MessageQueue object also provides a ReceiveCompleted event.
         // Uncomment this line to register the event handler. 
         //mq.ReceiveCompleted += new ReceiveCompletedEventHandler(OnReceiveCompleted);

         // Simulate doing other work
         while(true)
         {
            Console.WriteLine("Doing other work ...");
            System.Threading.Thread.Sleep(1000);
         }
      }

      // The callback method
      static void OnMessageArrival(IAsyncResult ar)
      {
         // Cast the state object to MessageQueue
         MessageQueue mq = (MessageQueue)ar.AsyncState;
         try
         {          
            Message msg = mq.EndReceive(ar);
            Console.WriteLine(msg.Body.ToString());
         }
         catch
         {
            Console.WriteLine("Timeout!");
         }
         finally
         {
            mq.BeginReceive( TimeSpan.FromSeconds(5), mq, 
               new AsyncCallback(OnMessageArrival));
         }
      }

      // The Receive Completed event handler
      static void OnReceiveCompleted(object sender, ReceiveCompletedEventArgs e)
      {       
         MessageQueue mq = (MessageQueue)sender;
         try
         {          
            Message msg = mq.EndReceive(e.AsyncResult);
            Console.WriteLine(msg.Body.ToString());
         }
         catch( MessageQueueException mqError)
         {
            Console.WriteLine(mqError.Message);
         }
         finally
         {
            mq.BeginReceive(TimeSpan.FromSeconds(5));
         }
      }
   }
}
