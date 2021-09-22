Imports System.Messaging
Imports CustomerLibrary

Module SenderMain

   Sub Main      
      'Create the queue instance
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      Dim msg As New Message()

      'Place Customer type name (including assembly details) in message label
      msg.Label = GetType(Customer).AssemblyQualifiedName
    
      Do
	      'Construct Customer and send to queue
	      msg.Body = New Customer("Homer", "hsimpson@atomic.com", "5555")    
	      mq.Send(msg)
	   Loop Until Console.ReadLine()= "q"
	   
   End Sub
    
End Module
