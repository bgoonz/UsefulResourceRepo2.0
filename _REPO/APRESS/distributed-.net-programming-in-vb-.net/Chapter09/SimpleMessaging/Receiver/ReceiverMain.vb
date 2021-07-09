Imports System.Messaging

Module ReceiverMain

    Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      'Create an array of types expected in the message body
      'Dim expectedTypes() As Type 
      'expectedTypes = New Type() {GetType(String), GetType(Single)}

      'Construct formatter with expected types
      'mq.Formatter = new XmlMessageFormatter(expectedTypes)
      
      Dim expectedTypeNames() As String
      expectedTypeNames = New String(){"System.String", "System.Single"}
      mq.Formatter = new XmlMessageFormatter(expectedTypeNames)

      'Loop forever reading messages from the queue
      Do While True
         Dim msg As Message = mq.Receive()'<-- blocks until message arrives
         Console.WriteLine(msg.Body.ToString())
      Loop
    End Sub
End Module
