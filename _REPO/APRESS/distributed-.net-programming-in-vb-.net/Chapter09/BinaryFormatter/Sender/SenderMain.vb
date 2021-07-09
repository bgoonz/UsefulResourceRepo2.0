Imports System.Messaging
Imports CustomerLibrary

Module SenderMain

   Sub Main()
      'Create the queue instance
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      Dim msg As New Message()
      msg.Label = "A Customer object"
      msg.Formatter = New BinaryMessageFormatter()

      Do
         'Construct Customer and send to queue
         msg.Body = New Customer("Homer", "hsimpson@atomic.com", "5555")
         mq.Send(msg)
      Loop Until Console.ReadLine() = "q"

   End Sub

End Module
