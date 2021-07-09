Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Channels.Http

Imports CallCenter
Imports Representative

Public Class Client

Public Shared Sub Main()
  Console.WriteLine("Preparing server object references...")
  RemotingConfiguration.Configure("Default.cfg")
  Dim CSRep5 As New AreaPolicyDecorator(New IDPolicyDecorator(New CSR()))
  Dim EventCrd As New EventCoordinator()
  Console.WriteLine("Server object references are ready.")

  'Subscribe to the Call event.
  Console.WriteLine("Registering observer...")
  Dim callHandlerCSR5 As New CallEventHandler(AddressOf CSRep5.onCall)
  EventCrd.m_evntCall = callHandlerCSR5
  Console.WriteLine("Observer registered.")
  Console.WriteLine("")

  Console.WriteLine("First simulated call: " & _ 
                    "should be rejected because area code is not 408")
  Dim InfoItem1 As New InfoItem("Phone number", "000-0000")
  Dim InfoItem2 As New InfoItem("Member ID", "7654")
  Dim InfoItem3 As New InfoItem("Area Code", "650")
  EventCrd.Add(InfoItem1)
  EventCrd.Add(InfoItem2)
  EventCrd.Add(InfoItem3)
  EventCrd.fireCallEvent
  EventCrd.RemoveAll()

  Console.WriteLine("Second simulated call: " & _ 
          "should be rejected because MemberID is not between 100 and 200")
  InfoItem1 = New InfoItem("Phone number", "222-2222")
  InfoItem2 = New InfoItem("Member ID", "7654")
  InfoItem3 = New InfoItem("Area Code", "408")
  EventCrd.Add(InfoItem1)
  EventCrd.Add(InfoItem2)
  EventCrd.Add(InfoItem3)
  EventCrd.fireCallEvent
  EventCrd.RemoveAll()

  Console.WriteLine("Third simulated call: " & _ 
                    "CSR should answer the phone call")
  InfoItem1 = New InfoItem("Phone number", "777-7777")
  InfoItem2 = New InfoItem("Member ID", "150")
  InfoItem3 = New InfoItem("Area Code", "408")
  EventCrd.Add(InfoItem1)
  EventCrd.Add(InfoItem2)
  EventCrd.Add(InfoItem3)
  EventCrd.fireCallEvent
  EventCrd.RemoveAll()

  Console.WriteLine("All call events fired. Simulation ends.")
  End Sub 

End Class 
