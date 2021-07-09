Imports System.Messaging
Imports System.Threading

Module ReceiverMain

   Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      'Create an array of types expected in the message body
      Dim expectedTypes() As Type 
      expectedTypes = New Type() {GetType(String), GetType(Single)}
      
      'Construct formatter with expected types
      mq.Formatter = new XmlMessageFormatter(expectedTypes)

      'Setup up the formatter (removed) ...
      
      'Param1: Timeout Value
      'Param2: State object, the message queue
      'Param3: Callback delegate
      Dim ar As IAsyncResult = mq.BeginReceive(TimeSpan.FromSeconds(5), mq, _
         new AsyncCallback(AddressOf OnMessageArrival))

      'Simulate doing other work
      Do While True
         Console.WriteLine("Doing other work on thread {0}", _
            Thread.CurrentThread.GetHashCode())
         Thread.Sleep(1000)
      Loop
   End Sub
         
   Sub OnMessageArrival(ar As IAsyncResult)

      'Cast the state object to MessageQueue
      Dim mq As MessageQueue = CType(ar.AsyncState, MessageQueue)
      Try 
               
         Dim msg As Message = mq.EndReceive(ar)
         Console.WriteLine(msg.Body.ToString())
         
      Catch
      
         Console.WriteLine("Timeout!")
         
      Finally
      
         mq.BeginReceive(TimeSpan.FromSeconds(5), mq, _
            New AsyncCallback(Addressof OnMessageArrival))
            
      End Try
   End Sub
End Module
