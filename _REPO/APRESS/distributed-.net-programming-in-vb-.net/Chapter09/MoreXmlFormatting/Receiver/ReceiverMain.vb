Imports System.Messaging
Imports System.Threading
Imports System.Xml
Imports System.Xml.Serialization

Module ReceiverMain

   Sub Main()
      'Open queue
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")
      
      'Create an array of types expected in the message body
      Dim expectedTypes() As Type = New Type(){GetType(FooBar)}

      'Set the formatter object for deserializing this message
      mq.Formatter = new XmlMessageFormatter(expectedTypes)

      'Receive message
      Dim msg As Message = mq.Receive()

      'Retrieve the message body
      Dim foo As FooBar = CType(msg.Body, FooBar)

      'Process Customer data     
      Console.WriteLine("Email = {0}", foo.Bar)
   End Sub
End Module

Public Structure Customer
	Public Name As String  
	Public Email As String
End Structure

<System.Xml.Serialization.XmlRoot("Customer")> _
Public Structure FooBar

   <XmlElement("Name")> _
   Public Foo As String

   <XmlElement("Email")> _
   Public Bar As String
   
End Structure

