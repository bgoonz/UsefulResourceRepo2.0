Imports System.Messaging
Imports System.Threading

Module ReceiverMain

   Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")
	
      'Receive message
      Dim msg As Message = mq.Receive()
            
      'Get the message type from the label, and set expected type names
      Dim expectedTypeNames() As String = New String() {msg.Label}   

      'Set the formatter object for deserializing this message
      msg.Formatter = new XmlMessageFormatter(expectedTypeNames)

      'Retrieve the message body
      Dim o As Object = msg.Body

      'Use Customer object in a late bound fashion ...
      
      'Process Customer data     
      Console.WriteLine(o.ToString())
   End Sub
   
End Module