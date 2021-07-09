Imports System.Messaging
Imports System.Threading

Module ReceiverMain

   Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      'Create an array of types expected in the message body
      Dim expectedTypes() As Type 
      expectedTypes = New Type() {GetType(String), GetType(Single)}

      'Setup up the formatter (removed) ...

      'Construct formatter with expected types
      mq.Formatter = new XmlMessageFormatter(expectedTypes)

      'Construct timer to fire every 5 seconds. Note the message queue
      'reference is passed as the state object.
      Dim tm As New Timer(New TimerCallback(AddressOf OnTimer), mq, 5000, 5000)

      'Simulate doing other work
      Do While True
         Console.WriteLine("Doing other work on thread {0}", _
            Thread.CurrentThread.GetHashCode())
         Thread.Sleep(1000)
      Loop
   End Sub
    
   Sub OnTimer(state As Object)
      'Show current thread id
      Console.WriteLine("Checking queue for messages on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Time to check the queue, first get the queue from the state param
      Dim mq As MessageQueue = CType(state, MessageQueue)

      'Read queue, but only block for 1 second
      Dim msg As Message
      Try
         msg = mq.Receive(TimeSpan.FromSeconds(1))
         Console.WriteLine(msg.Body.ToString())
      Catch
         'No Messages, timeout occurred
         Console.WriteLine("No new messages")
      End Try
   End Sub    
End Module
