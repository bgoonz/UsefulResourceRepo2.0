Imports System.Messaging
Imports System.Threading
Imports CustomerLibrary

Module ReceiverMain

   Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")
         
      'Set the formatter object to use the binary formatter
      mq.Formatter = new BinaryMessageFormatter()
	
      'Receive message
      Dim msg As Message = mq.Receive()
         
      'Retrieve the message body into customer object
      Dim cust As Customer = CType(msg.Body, Customer)

      'Process Customer data     
      Console.WriteLine(cust.Email)
   End Sub
   
End Module