Imports System.Xml.Serialization
Imports System.IO
	
Module XmlMain

   Sub Main()
      'Create the customer and set the first name
      Dim cust As New Customer()
      cust.FirstName = "Homer"

      'Initialize XML Serializer to serialize a customer type
      Dim xs As New XmlSerializer(GetType(Customer))

      'Serialize customer to file
      Dim s As Stream = File.OpenWrite("Customer.xml")
      xs.Serialize(s, cust)
      s.Close()    
   End Sub

End Module

<XmlRoot("MyCustomRoot")> _
Public Class Customer
   Private mFirstName As String
   Private mId as Integer

   <XmlElement("MyCustomElement")> _
   Public Property FirstName() As String
      Get
         Return mFirstName
      End Get
      Set(value As String)
         mFirstName = value
      End Set
   End Property
   
   <XmlAttribute()> _
   Public Property ID() As Integer
      Get
         Return mId
      End Get
      Set(value As Integer)
         mId = value
      End Set
   End Property
End Class